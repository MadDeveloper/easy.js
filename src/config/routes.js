export default {
    /*
     * Expose publics routes, reachable if user isn't authenticated
     * Each protected routes will be used as RegExp matching with request url
     * So, for example, you can write:
     *   '/roles'
     */
	public: [
		'/login',
		'/signup',
	]
}
