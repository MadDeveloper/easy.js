const RoleController = require( '../' ).controller
// const { entityManager, response, request } = require( 'easy/test/mocks' )

function fakeAsync(cb) {
    return function(done) {
        cb()
        setTimeout(done, 0)
    }
}

describe('RoleController', () => {

    let container = easy.application.container
    let response, mockEntityManager
    let roleController

    beforeEach(() => {
        response = jasmine.createSpyObj('response', ['ok', 'internalServerError'])
    })

    beforeEach(() => {
        mockEntityManager = jasmine.createSpyObj( 'em', [ 'getRepository' ] )
        container.register( 'component.entitymanager', mockEntityManager )
        roleController = new RoleController( container )
    })

    describe('getRoles', () => {

        describe('when the repository respond successfully', () => {

            let roles = [ { k: 'bar' }, { k: 'foo' } ]

            beforeEach( () => mockEntityManager.getRepository.and.returnValue({ findAll: () => Promise.resolve( roles ) }) )

            beforeEach(fakeAsync(() => roleController.getRoles( {}, response ) ))

            it( 'should respond with the provided roles', () => {
                expect( response.ok ).toHaveBeenCalledWith( roles )
            })

        })

        describe('when the repository respond with an error', () => {

            beforeEach(() => mockEntityManager.getRepository.and.returnValue( { findAll: () => Promise.reject( 'Something terrible happened!' ) } ) )

            beforeEach(fakeAsync(() => roleController.getRoles( {}, response ) ))

            it( 'should respond with an error', () => {
                expect( response.internalServerError ).toHaveBeenCalledWith( 'Something terrible happened!' )
            })

        })

    })

})
