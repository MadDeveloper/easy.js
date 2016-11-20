require( 'app-module-path' ).addPath( __dirname )

const { application }   = require( './bootstrap' )
const Server            = require( 'vendor/easy/core/Server' )
const server            = new Server( application )

server.start()
