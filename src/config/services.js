export default {
    /*
     * component.* can be used in dependencies to inject easy component
	 * List of all components availables:
	 * bundlemanager
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
    }
}
