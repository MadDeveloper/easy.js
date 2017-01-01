const entityManager = jasmine.createSpyObj( 'em', [ 'getRepository', 'getModel' ] )
const container = easy.application.container

container.register( 'component.entitymanager', entityManager )

module.exports = entityManager
