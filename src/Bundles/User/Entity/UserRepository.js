function UserRepository( UserFactory ) {
    return {
        readAll: function( role ) {
            var User = UserFactory.getModel();
            return User.where({ role_id: role.get( 'id' ) }).fetchAll();
        },

        read: function( byParam, options ) {
            var User = UserFactory.getModel();
            var forgeParam = ( UserFactory.getVendorController().isNumber( byParam ) ) ? { id: byParam } : ( ( undefined !== byParam.id ) ? { id: byParam.id } : { email: byParam.email } );
            return User.forge( forgeParam ).fetch( options );
        },

        save: function( user, params, options ) {
            return user.save({
                first_name: params.first_name,
                last_name: params.last_name,
                email: params.email,
                password: params.password,
                role_id: params.role_id
            }, options );
        },

        delete: function( user, options ) {
            return user.destroy( options );
        }
    }
}

module.exports = UserRepository;
