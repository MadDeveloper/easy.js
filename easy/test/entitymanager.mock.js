const entityManager = jasmine.createSpyObj( 'em', [
    'getRepository',
    'getModel',
    'getCollection',
    'database'
])
const container = easy.application.container

container.register( 'component.entitymanager', entityManager )

module.exports = entityManager
