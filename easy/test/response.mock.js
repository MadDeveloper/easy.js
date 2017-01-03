const response = jasmine.createSpyObj( 'response', [
    'ok',
    'internalServerError',
    'created',
    'badRequest',
    'notFound',
    'noContent'
])
const container = easy.application.container

module.exports = response
