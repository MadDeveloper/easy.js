const { application } = require( './app' )
const { Server } = require( 'easy/core' )
const server = new Server( application )

server.start()
