const request = jasmine.createSpyObj( 'request', [
    'retrieve',
    'getBody',
    'getRouteParameter',
    'store'
])
const container = easy.application.container

module.exports = request
