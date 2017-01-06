const { application } = require( './bootstrap' )
const { Server } = require( 'easy/core' )

new Server( application ).start()

/* Silence is golden */
