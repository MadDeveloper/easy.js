const tokenManager = jasmine.createSpyObj( 'tokenManager', [
    'sign',
    'verify',
    'getConfig'
])

module.exports = tokenManager
