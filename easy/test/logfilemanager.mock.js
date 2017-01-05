const logFileManager = jasmine.createSpyObj( 'v', [
    'openLogFile',
    'openLogFileSync',
    'logDirectoryPath'
])

module.exports = logFileManager
