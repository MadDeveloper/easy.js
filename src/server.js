const { application }   = require( './bootstrap' )
const Server            = require( 'vendor/easy/core/Server' )

new Server( application ).start()

/* Silence is golden */
