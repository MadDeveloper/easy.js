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
    'getAppParameter',
    'getAppParameter',
    'setAppParameter',
    'getProperty',
    'setProperty',
    'urlContains',
    'store',
    'retrieve',
    'getCookies',
    'scope'
])

module.exports = request
