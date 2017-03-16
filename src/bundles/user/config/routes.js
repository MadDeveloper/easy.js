const roles = require( '../../../config/roles' )
const { Route } = require( 'easy/routing' )

Route.group( 'user', () => {
    Route
        .get( 'users', 'UserController.all' )
        .security({
            strategy: 'default',
            roles: [ roles.any ]
        })

    Route
        .post( 'users', 'UserController.create' )
        .security({
            strategy: 'default',
            roles: [ roles.user ]
        })

    Route
        .get( 'users/:user_id', 'UserController.one' )
        .security({
            strategy: 'default',
            roles: [ roles.any ]
        })
        .middleware( 'user-exists' )

    Route
        .put( 'users/:user_id', 'UserController.update' )
        .security({
            strategy: 'default',
            roles: [ roles.user ]
        })
        .middleware( 'user-exists' )

    Route
        .patch( 'users/:user_id', 'UserController.patch' )
        .security({
            strategy: 'default',
            roles: [ roles.user ]
        })
        .middleware( 'user-exists' )

    Route
        .delete( 'users/:user_id', 'UserController.delete' )
        .security({
            strategy: 'default',
            roles: [ roles.user ]
        })
        .middleware( 'role-exists' )
}).prefix( '/roles/:role_id/' )
