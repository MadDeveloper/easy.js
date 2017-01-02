const response = jasmine.createSpyObj( 'response', [
    'ok',
    'internalServerError',
    'created',
    'badRequest',
    'notFound'
])
const container = easy.application.container

module.exports = response
