module.exports = container => {
    /**
	 * List of available easy components injectable:
	 * router
     * entitymanager (and all entitymanager.<databaseName> for all database configured other than the default)
	 * logger
	 * logwriter
     *
     * @example
     * container.register( 'auth', Auth, [ 'router', 'logger' ])
     */
}
