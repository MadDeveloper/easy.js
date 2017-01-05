const directory = jasmine.createSpyObj( 'directory', [
    'exists',
    'create',
    'delete',
    'rename',
    'move'
])

module.exports = directory
