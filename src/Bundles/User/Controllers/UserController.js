function UserController( UserFactory ) {
    return {
        UserRepository: UserFactory.getRepository(),
        
        /*
         * Useful (deletable)
         */
        isRequestWellParameterized: function( body ) {
            var Controller = UserFactory.getVendorController();
            return Controller.verifyParams([
                    { property: 'first_name', typeExpected: 'string' },
                    { property: 'last_name', typeExpected: 'string' },
                    { property: 'email', typeExpected: 'string' },
                    { property: 'password', typeExpected: 'string' },
                    { property: 'role_id', typeExpected: 'number', optional: true }
                ], body);
        },

        promiseRoleExists: function( id, http, callback ) {
            var Controller      = UserFactory.getVendorController();
            var RoleRepository  = UserFactory.getBundleManager().getFactory( 'Role' ).getRepository();
            if ( Controller.isNumber( id ) ) {

                RoleRepository.read( id )
                .then( function( role ) {

                    if ( role ) {

                        callback( null, role );

                    } else {
                        callback( { type: 'notFound' } );
                    }

                })
                .catch( function( error ) {
                    callback( { type: 'internalServerError', exactly: error} );
                })

            } else {
                callback( { type: 'badRequest' } );
            }
        }
    }
}

module.exports = UserController;
