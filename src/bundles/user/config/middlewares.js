const { Middleware } = require( 'easy/middleware' )

Middleware.register( 'user-exists', 'UserController.exists' )
