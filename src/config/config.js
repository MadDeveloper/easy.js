import fs from 'fs'

export default {
    /*
     * App configurations
     */
    app: {
        name: 'myapp'
    },

    /*
     * Server configurations
     */
    server: {
        protocol: {
            http: 'http',
            https: 'https'
        },
        domain: 'localhost',
        port: {
            http: 80,
            https: 443
        }
    },

    /*
     * Database credentials
     */
    database: {
        client: 'mysql',
        connector: 'bookshelf',
        connection: {
            host: 'localhost',
            user: 'root',
            password: 'root',
            database: 'prepapp',
            charset: 'utf8'
        }
    },

    /*
     * SSL/TLS security keys
     */
    credentials: getCredentials(),

    /*
     * Json Web Token (JWT) configurations
     * CHANGE IT
     */
    jwt: {
        secret: ':p19E}1%&gX1O*K2u8=36#9Jk7I9{f', // http://randomkeygen.com/ -> Ft. Knox Passwords
        duration: 86400 // 24hours
    }
}

function getCredentials() {
    let credentials = { key: null, cert: null, found: false }

    try {
        credentials.key     = fs.readFileSync( `${__dirname}/keys/myapp-privkey.pem` )
        credentials.cert    = fs.readFileSync( `${__dirname}/keys/myapp-cert.pem` )
        credentials.found   = true
    } finally {
        return credentials
    }
}
