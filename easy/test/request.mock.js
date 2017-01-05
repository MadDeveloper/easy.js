const request = jasmine.createSpyObj( 'request', [
    'retrieve',
    'getBody',
    'getRouteParameter',
    'store',
    'methodIs',
    'getMethod',
    'getHeader',
    'getBody',
    'getRawbody',
    'getBodyParameter',
    'setBodyParameter',
    'getRouteParameter',
    'getAppParameter'
])
const container = easy.application.container

module.exports = request
