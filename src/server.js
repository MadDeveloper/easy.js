const { application }   = require( './bootstrap' )
const Server            = require( 'easy/core/Server' )

new Server( application ).start()

/* Silence is golden */
