export default {
    /*
     * component.* can be used in dependencies to inject easy component
     */

    /* database */
    'database.schemaBuilder': {
        path: 'database/SchemaDatabaseService',
        dependencies: [ 'component.database' ]
    },

    /* security */
    'security.access': {
        path: 'security/AccessSecurityService'
    },

    'security.default': {
        path: 'security/DefaultSecurityService',
        dependencies: [ 'component.router' ]
    }
}
