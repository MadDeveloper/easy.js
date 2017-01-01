const RoleController = require( '../' ).controller
const container = easy.application.container
const { entityManager,
        response,
        request,
        fakeAsync } = require( 'easy/test/mocks' )

describe( 'RoleController', () => {

    let roleController

    beforeEach( () => roleController = new RoleController( container ) )

    describe( 'getRoles', () => {

        describe( 'when the repository respond successfully', () => {

            let roles = [ { k: 'bar' }, { k: 'foo' } ]

            beforeEach( () => entityManager.getRepository.and.returnValue({ findAll: () => Promise.resolve( roles ) }) )

            beforeEach( fakeAsync( () => roleController.getRoles( {}, response ) ) )

            it( 'should respond with the provided roles', () => {
                expect( response.ok ).toHaveBeenCalledWith( roles )
            })

        })

        describe( 'when the repository respond with an error', () => {

            beforeEach( () => entityManager.getRepository.and.returnValue({ findAll: () => Promise.reject( 'Something terrible happened!' ) }) )

            beforeEach( fakeAsync( () => roleController.getRoles( {}, response ) ) )

            it( 'should respond with an error', () => {
                expect( response.internalServerError ).toHaveBeenCalledWith( 'Something terrible happened!' )
            })

        })

    })

})
