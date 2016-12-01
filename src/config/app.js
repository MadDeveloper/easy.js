const fs = require( 'fs' )

module.exports = {
    /*
     * App configurations
     */
    app: {
        name: 'myapp',
		production: false,
        log: true,
        memory: false
    },

    /*
     * Server configurations
     */
    server: {
        protocol: 'http',
        domain: 'localhost',
        port: {
            http: 80,
            https: 443
        }
    },

    /*
     * SSL/TLS security keys
     */
    credentials: getCredentials(),

    /*
     * Json Web Token (JWT) configurations
     * CHANGE SECRET
     */
    jwt: {
        secret: ':p19E}1%&gX1O*K2u8=36#9Jk7I9{f', // http://randomkeygen.com/ -> Ft. Knox Passwords
        duration: 86400 // in seconds, 24hours
    }
}

function getCredentials() {
    let credentials = { key: null, cert: null, found: false }

    try {
        credentials.key     = fs.readFileSync( `${__dirname}/ssl/myapp-privkey.pem` )
        credentials.cert    = fs.readFileSync( `${__dirname}/ssl/myapp-cert.pem` )
        credentials.found   = true
    } finally {
        return credentials
    }
}
