const UserController = require( '../controllers/user.controller' )
const container = easy.application.container
const { entityManager,
        response,
        request,
        fakeAsync } = require( 'easy/mocks' )

describe( 'UserController', () => {

    let userController

    beforeEach( () => userController = new UserController( container ) )

    describe( 'getUsers', () => {

        describe( 'when the repository respond successfully', () => {

            let users = [ { k: 'bar' }, { k: 'foo' } ]
            let user = users[ 0 ]

            beforeEach( () => {
                request.retrieve.and.returnValue( user )
                entityManager.getRepository.and.returnValue({ findAll: role => Promise.resolve( users ) })
            })

            beforeEach( fakeAsync( () => userController.getUsers( request, response ) ) )

            it( 'should respond with the provided roles', () => {
                expect( response.ok ).toHaveBeenCalledWith( users )
            })

        })

        describe( 'when the repository respond with an error', () => {

            beforeEach( () => entityManager.getRepository.and.returnValue({ findAll: role => Promise.reject( 'Something terrible happened!' ) }) )

            beforeEach( fakeAsync( () => userController.getUsers( request, response ) ) )

            it( 'should respond with an error', () => {
                expect( response.internalServerError ).toHaveBeenCalledWith( 'Something terrible happened!' )
            })

        })

    })

})
