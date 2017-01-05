const logWriter = jasmine.createSpyObj( 'logWriter', [
    'write',
    'logFileManager'
])

module.exports = logWriter
