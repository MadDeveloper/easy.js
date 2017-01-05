const logger = jasmine.createSpyObj( 'logger', [
    'emergency',
    'alert',
    'critical',
    'error',
    'warning',
    'notice',
    'info',
    'debug',
    'log',
    'logWriter'
])

module.exports = logger
