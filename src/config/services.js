export default {
    /*
     * component.* can be used in dependencies to inject easy component
     */

    /* database */
    'database.schema': {
        path: 'database/SchemaDatabaseService',
        dependencies: [ 'component.database' ]
    },

    /* security */
    'security.access': {
        path: 'security/AccessSecurityService'
    }
}
