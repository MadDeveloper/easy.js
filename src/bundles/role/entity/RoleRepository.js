function RoleRepository( RoleFactory ) {
    return {
        readAll: function() {
            var Roles = RoleFactory.getCollection();
            return Roles.forge().fetch();
        },

        read: function( id, options ) {
            return RoleFactory.getModel().forge({ id: id }).fetch( options );
        },

        save: function( role, params, options ) {
            return role.save({
                name: params.name,
                slug: params.slug
            }, options );
        },

        patch: function( params, options ) {

        },

        delete: function( role, options ) {
            return role.destroy( options );
        }
    }
}

module.exports = RoleRepository;
