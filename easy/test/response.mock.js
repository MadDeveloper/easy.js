const response = jasmine.createSpyObj( 'response', [ 'ok', 'internalServerError' ] )
const container = easy.application.container

module.exports = response
