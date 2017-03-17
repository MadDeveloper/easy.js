module.exports = container => {
    /**
	 * List of available easy components injectable:
	 * router
     * entitymanager (and all entitymanager.<databaseName> for all database configured other than the default)
	 * logger
	 * logwriter
     *
     * @example
     * 'auth.facebook': {
     *     path: 'services/auth/facebook.service',
     *     dependencies: [ 'logger' ]
     * }
     */

    const Auth = require( '../services/auth.service' )
    const Test = () => {}

    container.register( 'auth', Auth, [ 'router', 'logger' ])
}
