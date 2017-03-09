const { File } = require( 'easy/fs' )

module.exports = {
    /*
     * App configurations
     */
    app: {
        name: 'myapp',
		production: false,
        log: true
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
    const keyFile = new File( `${__dirname}/ssl/myapp-privkey.pem` )
    const certFile = new File( `${__dirname}/ssl/myapp-cert.pem` )
    let key = null
    let cert = null

    try {
        const keyFileExists = keyFile.existsSync()
        const certFileExists = certFile.existsSync()

        if ( keyFileExists && certFileExists ) {
            key = keyFile.readSync()
            cert = certFile.readSync()
        }
    } catch ( error ) {

    } finally {
        return {
            key,
            cert
        }
    }
}
