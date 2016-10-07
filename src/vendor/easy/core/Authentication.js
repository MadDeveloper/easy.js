import passport 		from 'passport'
import passportLocal	from 'passport-local'
import passportOpenId	from 'passport-openid'
import passportOAuth	from 'passport-oauth'
import passportFacebook	from 'passport-facebook'
import passportTwitter	from 'passport-twitter'
import passportGoogle	from 'passport-google-oauth'
import ConfigLoader		from './ConfigLoader'

const LocalStrategy = passportLocal.Strategy
const openIdStrategy = passportOpenId.Strategy
const OAuthStrategy = passportOAuth.OAuthStrategy
const FaceboookStrategy = passportFacebook.Strategy
const TwitterStrategy = passportTwitter.Strategy
const GoogleStrategy = passportLocal.OAuthStrategy

export default class Authentication {
	/**
	 * constructor
	 *
	 * @param  {express.Router} router
	 */
	constructor( router ) {
		const configLoader 			= new ConfigLoader()
		const authenticationConfig 	= configLoader.loadFromGlobal( 'authentication' )

		
	}

	signIn() {

	}

	isLogged() {

	}
}
