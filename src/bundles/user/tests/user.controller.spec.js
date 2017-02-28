const UserController = require( '../controllers/user.controller' )
const roles = require( '../../../config/roles' )
const container = easy.application.container
const { TokenManager } = require( 'easy/authentication' )
const path = require( 'path' )
const { entityManager, response, request, tokenManager, fakeAsync } = require( 'easy/mocks' )

describe( 'UserController', () => {

    afterEach( () => {
        response.reset()
        request.reset()
        entityManager.reset()
        tokenManager.reset()
    })

    let userController
    const users = [ {
        id: 1,
        username: 'John',
        email: 'john.doe@example.com',
        password: 'secret',
        role_id: roles.admin
    } ]
    const user = users[ 0 ]
    const User = class {}
    const userReturned = {
        id: 1,
        username: 'John',
        email: 'john.doe@example.com',
        role_id: roles.admin,
        toJSON: () => userReturned,
        unset: field => {}
    }
    const token = TokenManager.sign( userReturned )

    beforeEach( () => userController = new UserController( container ) )

    describe( 'getUsers', () => {

        describe( 'when the repository respond successfully', () => {

            beforeEach( () => {
                request.retrieve.and.returnValue( user )
                entityManager.getRepository.and.returnValue({ findAll: role => Promise.resolve( users ) })
            })

            beforeEach( fakeAsync( () => {
                userController.getUsers( request, response )
            }) )

            it( 'should respond with the provided users', () => {
                expect( response.ok ).toHaveBeenCalledWith( users )
            })

        })

        describe( 'when the findAll repository method fails', () => {

            beforeEach( () => {
                entityManager.getRepository.and.returnValue({ findAll: () => Promise.reject() })
            })

            beforeEach( fakeAsync( () => {
                userController.getUsers( request, response )
            }) )

            it( 'should respond with internal server error', () => {
                expect( response.internalServerError ).toHaveBeenCalledWith()
            })

        })

    })

    describe( 'getUser', () => {

        describe( 'when respond successfully', () => {

            beforeEach( () => {
                request.retrieve.and.returnValue( user )
            })

            beforeEach( fakeAsync( () => {
                userController.getUser( request, response )
            }) )

            it( 'should respond with the provided user', () => {
                expect( response.ok ).toHaveBeenCalledWith( user )
            })

        })

    })

    describe( 'createUser', () => {

        describe( 'when the repository respond successfully', () => {

            beforeEach( () => {
                request.getBody.and.returnValue( user )
                entityManager.getRepository.and.returnValue({ save: () => Promise.resolve( userReturned ) })
                entityManager.getModel.and.returnValue( User )
                tokenManager.sign.and.returnValue( token )
            })

            beforeEach( fakeAsync( () => {
                userController.createUser( request, response )
            }) )

            it( 'should respond with the newly created user', () => {
                expect( response.created ).toHaveBeenCalledWith({ user: userReturned, token })
            })

        })

        describe( 'when the repository respond with en error', () => {

            beforeEach( () => {
                request.getBody.and.returnValue( user )
                entityManager.getRepository.and.returnValue({ save: () => Promise.reject() })
                entityManager.getModel.and.returnValue( User )
            })

            beforeEach( fakeAsync( () => {
                userController.createUser( request, response )
            }) )

            it( 'should respond with internal server error', () => {
                expect( response.internalServerError ).toHaveBeenCalledWith()
            })

        })

        describe( 'when the request body is empty', () => {

            beforeEach( () => {
                request.getBody.and.returnValue({})
            })

            beforeEach( fakeAsync( () => {
                userController.createUser( request, response )
            }) )

            it( 'should respond with bad request', () => {
                expect( response.badRequest ).toHaveBeenCalledWith()
            })

        })

    })

    describe( 'userExists', () => {

        beforeEach( () => {
            entityManager.getModel.and.returnValue( User )
        })

        describe( 'when the repository respond successfully', () => {

            beforeEach( () => {
                entityManager.getRepository.and.returnValue({ find: () => Promise.resolve( user ) })
            })

            beforeEach( fakeAsync( () => {
                userController.userExists( request, response )
            }) )

            it( 'should store found user in request dedicated scope', () => {
                expect( request.retrieve( 'user' ) ).toEqual( user )
            })

        })

        describe( 'when the repository respond successfully but with no user found', () => {

            beforeEach( () => {
                entityManager.getRepository.and.returnValue({ find: () => Promise.resolve( null ) })
            })

            beforeEach( fakeAsync( () => {
                userController.userExists( request, response )
            }) )

            it( 'should respond with not found', () => {
                expect( response.notFound ).toHaveBeenCalledWith()
            })

        })

        describe( 'when the find repository methods fails', () => {

            beforeEach( () => {
                entityManager.getRepository.and.returnValue({ find: () => Promise.reject() })
            })

            beforeEach( fakeAsync( () => {
                userController.userExists( request, response )
            }) )

            it( 'should respond with bad request', () => {
                expect( response.internalServerError ).toHaveBeenCalledWith()
            })

        })

    })

    describe( 'updateUser', () => {

        beforeEach( () => {
            request.retrieve.and.returnValue( user )
            request.getBody.and.returnValue( user )
        })

        describe( 'when the repository respond successfully', () => {

            beforeEach( () => {
                entityManager.getRepository.and.returnValue({ save: () => Promise.resolve( user ) })
            })

            beforeEach( fakeAsync( () => {
                userController.updateUser( request, response )
            }) )

            it( 'should respond with ok and return updated user', () => {
                expect( response.ok ).toHaveBeenCalledWith( user )
            })

        })

        describe( 'when the save repository method fails', () => {

            beforeEach( () => {
                entityManager.getRepository.and.returnValue({ save: () => Promise.reject() })
            })

            beforeEach( fakeAsync( () => {
                userController.updateUser( request, response )
            }) )

            it( 'should respond with internal server error', () => {
                expect( response.internalServerError ).toHaveBeenCalledWith()
            })

        })

        describe( 'when the body response is empty', () => {

            beforeEach( () => {
                request.getBody.and.returnValue({})
            })

            beforeEach( fakeAsync( () => {
                userController.updateUser( request, response )
            }) )

            it( 'should respond with bad request', () => {
                expect( response.badRequest ).toHaveBeenCalledWith()
            })

        })

    })

    describe( 'patchUser', () => {

        describe( 'when the repository respond successfully', () => {

            beforeEach( () => {
                request.retrieve.and.returnValue( user )
                entityManager.getRepository.and.returnValue({ patch: () => Promise.resolve( user ) })
                request.getRawBody.and.returnValue( '[{ "op": "replace", "path": "/email", "value": "patched@example.com" }]' )
            })

            beforeEach( fakeAsync( () => {
                userController.patchUser( request, response )
            }) )

            it( 'should respond with the patched user', () => {
                expect( response.ok ).toHaveBeenCalledWith( user )
            })

        })

        describe( 'when the patch repository method fails', () => {

            beforeEach( () => {
                request.retrieve.and.returnValue( user )
                entityManager.getRepository.and.returnValue({ patch: () => Promise.reject({ type: 'server' }) })
                request.getRawBody.and.returnValue( '[{ "op": "replace", "path": "/email", "value": "patched@example.com" }]' )
            })

            beforeEach( fakeAsync( () => {
                userController.patchUser( request, response )
            }) )

            it( 'should respond with internal server error', () => {
                expect( response.internalServerError ).toHaveBeenCalledWith()
            })

        })

        describe( 'when the raw body is not in valid json format', () => {

            beforeEach( () => {
                request.getRawBody.and.returnValue( 'foo' )
            })

            beforeEach( fakeAsync( () => {
                userController.patchUser( request, response )
            }) )

            it( 'should respond with bad request', () => {
                expect( response.badRequest ).toHaveBeenCalledWith()
            })

        })

        describe( 'when the raw body is empty', () => {

            beforeEach( () => request.getRawBody.and.returnValue( '' ) )

            beforeEach( fakeAsync( () => userController.patchUser( request, response ) ) )

            it( 'should respond with bad request', () => {
                expect( response.badRequest ).toHaveBeenCalledWith()
            })

        })

    })

    describe( 'deleteUser', () => {

        describe( 'when the repository respond successfully', () => {

            beforeEach( () => {
                request.retrieve.and.returnValue( user )
                entityManager.getRepository.and.returnValue({ delete: () => Promise.resolve() })
            })

            beforeEach( fakeAsync( () => {
                userController.deleteUser( request, response )
            }) )

            it( 'should respond with no content', () => {
                expect( response.noContent ).toHaveBeenCalledWith()
            })

        })

        describe( 'when the delete repository method fails', () => {

            beforeEach( () => {
                request.retrieve.and.returnValue( null )
                entityManager.getRepository.and.returnValue({ delete: () => Promise.reject() })
            })

            beforeEach( fakeAsync( () => {
                userController.deleteUser( request, response )
            }) )

            it( 'should respond with internal server error', () => {
                expect( response.internalServerError ).toHaveBeenCalledWith()
            })

        })

    })

})
