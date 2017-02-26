const RoleController = require( '../controllers/role.controller' )
const container = easy.application.container
const { entityManager, response, request, fakeAsync } = require( 'easy/mocks' )

describe( 'RoleController', () => {

    afterEach( () => {
        response.reset()
        request.reset()
        entityManager.reset()
    })

    let roleController
    const roles = [ { k: 'bar' }, { k: 'foo' } ]
    const role = {
        id: 1,
        name: 'test',
        slug: 'test'
    }
    const Role = class {}

    beforeEach( () => roleController = new RoleController( container ) )

    describe( 'getRoles', () => {

        describe( 'when the repository respond successfully', () => {

            beforeEach( () => {
                entityManager.getRepository.and.returnValue({ findAll: () => Promise.resolve( roles ) })
            })

            beforeEach( fakeAsync( () => {
                roleController.getRoles({}, response )
            }) )

            it( 'should respond with the provided roles', () => {
                expect( response.ok ).toHaveBeenCalledWith( roles )
            })

        })

        describe( 'when the findAll repository method fails', () => {

            beforeEach( () => {
                entityManager.getRepository.and.returnValue({ findAll: () => Promise.reject() })
            })

            beforeEach( fakeAsync( () => {
                roleController.getRoles({}, response )
            }) )

            it( 'should respond with internal server error', () => {
                expect( response.internalServerError ).toHaveBeenCalledWith()
            })

        })

    })

    describe( 'getRole', () => {

        describe( 'when the repository respond successfully', () => {

            beforeEach( () => {
                request.retrieve.and.returnValue( role )
            })

            beforeEach( fakeAsync( () => {
                roleController.getRole( request, response )
            }) )

            it( 'should respond with the provided role', () => {
                expect( response.ok ).toHaveBeenCalledWith( role )
            })

        })

    })

    describe( 'createRole', () => {

        describe( 'when the repository respond successfully', () => {

            beforeEach( () => {
                request.getBody.and.returnValue( role )
                entityManager.getRepository.and.returnValue({ save: () => Promise.resolve( role ) })
                entityManager.getModel.and.returnValue( Role )
            })

            beforeEach( fakeAsync( () => {
                roleController.createRole( request, response )
            }) )

            it( 'should respond with the newly created role', () => {
                expect( response.created ).toHaveBeenCalledWith( role )
            })

        })

        describe( 'when the save repository method fails', () => {

            beforeEach( () => {
                request.getBody.and.returnValue( role )
                entityManager.getRepository.and.returnValue({ save: () => Promise.reject() })
                entityManager.getModel.and.returnValue( Role )
            })

            beforeEach( fakeAsync( () => {
                roleController.createRole( request, response )
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
                roleController.createRole( request, response )
            }) )

            it( 'should respond with bad request', () => {
                expect( response.badRequest ).toHaveBeenCalledWith()
            })

        })

    })

    describe( 'roleExists', () => {

        beforeEach( () => {
            entityManager.getModel.and.returnValue( Role )
        })

        describe( 'when the repository respond successfully', () => {

            beforeEach( () => {
                entityManager.getRepository.and.returnValue({ find: () => Promise.resolve( role ) })
            })

            beforeEach( fakeAsync( () => {
                roleController.roleExists( request, response )
            }) )

            it( 'should store found role in request dedicated scope', () => {
                expect( request.retrieve( 'role' ) ).toEqual( role )
            })

        })

        describe( 'when the repository respond successfully but with no role found', () => {

            beforeEach( () => {
                entityManager.getRepository.and.returnValue({ find: () => Promise.resolve( null ) })
            })

            beforeEach( fakeAsync( () => {
                roleController.roleExists( request, response )
            }) )

            it( 'should respond with not found', () => {
                expect( response.notFound ).toHaveBeenCalledWith()
            })

        })

        describe( 'when the find repository method fails', () => {

            beforeEach( () => {
                entityManager.getRepository.and.returnValue({ find: () => Promise.reject() })
            })

            beforeEach( fakeAsync( () => {
                roleController.roleExists( request, response )
            }) )

            it( 'should respond with bad request', () => {
                expect( response.internalServerError ).toHaveBeenCalledWith()
            })

        })

    })

    describe( 'updateRole', () => {

        beforeEach( () => {
            request.retrieve.and.returnValue( role )
            request.getBody.and.returnValue( role )
        })

        describe( 'when the repository respond successfully', () => {

            beforeEach( () => {
                entityManager.getRepository.and.returnValue({ save: () => Promise.resolve( role ) })
            })

            beforeEach( fakeAsync( () => {
                roleController.updateRole( request, response )
            }) )

            it( 'should respond with ok and return updated role', () => {
                expect( response.ok ).toHaveBeenCalledWith( role )
            })

        })

        describe( 'when the save repository method fails', () => {

            beforeEach( () => {
                entityManager.getRepository.and.returnValue({ save: () => Promise.reject() })
            })

            beforeEach( fakeAsync( () => {
                roleController.updateRole( request, response )
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
                roleController.updateRole( request, response )
            }) )

            it( 'should respond with bad request', () => {
                expect( response.badRequest ).toHaveBeenCalledWith()
            })

        })

    })

    describe( 'deleteRole', () => {

        describe( 'when the repository respond successfully', () => {

            beforeEach( () => {
                request.retrieve.and.returnValue( role )
                entityManager.getRepository.and.returnValue({ delete: () => Promise.resolve() })
            })

            beforeEach( fakeAsync( () => {
                roleController.deleteRole( request, response )
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
                roleController.deleteRole( request, response )
            }) )

            it( 'should respond with an internal server error', () => {
                expect( response.internalServerError ).toHaveBeenCalledWith()
            })

        })

    })

})
