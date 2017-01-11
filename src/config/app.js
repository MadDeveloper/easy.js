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
        port: 'random'
    },

    /*
     * SSL/TLS security keys
     */
    credentials: getCredentials()
}

function getCredentials() {
    let credentials = { key: null, cert: null, found: false }

    try {
        credentials.key = fs.readFileSync( `${__dirname}/ssl/myapp-privkey.pem` )
        credentials.cert = fs.readFileSync( `${__dirname}/ssl/myapp-cert.pem` )
        credentials.found = true
    } finally {
        return credentials
    }
}
