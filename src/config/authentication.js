module.exports = {
	enabled: true,
	// custom: true,
	// service: 'auth.service'
	repository: 'user/entity/user.repository',
	model: 'user/entity/user',
	usernameField: 'email',
	passwordField: 'password',
	route: '/login',

    /*
     * Json Web Token (JWT) configurations
     * CHANGE SECRET
     */
    jwt: {
        secret: ':p19E}1%&gX1O*K2u8=36#9Jk7I9{f', // http://randomkeygen.com/ -> Ft. Knox Passwords
        duration: 86400 // in seconds, 24hours
    }
}
