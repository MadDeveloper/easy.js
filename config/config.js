var fs = require( 'fs' );

function getCredentials() {
    var credentials = { key: null, cert: null };

    try {
        credentials.key = fs.readFileSync( __dirname + '/keys/myapp-privkey.pem' );
        credentials.cert = fs.readFileSync( __dirname + '/keys/myapp-cert.pem' );
    }
    finally {
        return credentials;
    }
}

module.exports = {
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
        connection: {
            host: 'localhost',
            user: 'root',
            password: 'root',
            database: 'mydatabase',
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
         secret: ':p19E}1%&gX1O*K2u8=36#9Jk7I9{f' // http://randomkeygen.com/ -> Ft. Knox Passwords
     }
};
