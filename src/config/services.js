export default {
    /*
     * component.* can be used in dependencies to inject easy component
	 * List of all components availables:
	 * bundlemanager
	 * console
	 * factory
	 * router
	 * database
	 * entitymanager
	 * logger
	 * logfilemanager
	 * logwriter
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
