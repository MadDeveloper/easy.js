const { application } = require( './bootstrap' )
const { Server } = require( 'easy/core' )
const server = new Server( application )

server.start()
