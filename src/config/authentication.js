export default {
	enabled: true,
	repository: 'user',
	model: 'user',
	register: true,
	strategies: {
		local: {
			usernameField: 'email',
			passwordField: 'password',
			route: '/login'
		}
		facebook: {
			route: '/login/facebook',
			clientID: '',
			clientSecret: '',
			callbackURL: ''
		}
		google: {
			route: '/login/google',
			consumerKey: '',
			consumerSecret: '',
			callbackURL: ''
		},
		twitter: {
			route: '/login/twitter',
			consumerKey: '',
			consumerSecret: '',
			callbackURL: ''
		},
		github: {
			route: '/login/github',
			clientID: '',
			clientSecret: '',
			callbackURL: ''
		}
		// oauth2: {
		// 	authorizationURL: '',
		//     tokenURL: '',
		//     clientID: '',
		//     clientSecret: ''
		//     callbackURL: ''
		// }
	}
}
