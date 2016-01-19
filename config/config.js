var fs = require( 'fs' );

module.exports = {
    /*
     * App configurations
     */
    app: {
        name: 'mydatabase'
    },

    /*
     * Server configurations
     */
    server: {
        protocol: 'https',
        domain: 'localhost',
        port: 443
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
    credentials: {
        key: fs.readFileSync( __dirname + '/keys/myapp-privkey.pem' ),
        cert: fs.readFileSync( __dirname + '/keys/myapp-cert.pem' )
    },

    /*
     * Json Web Token (JWT) configurations
     */
     jwt: {
         secret: ':p19E}1%&gX1O*K2u8=36#9Jk7I9{f' // http://randomkeygen.com/ -> Ft. Knox Passwords
     }
};
