function RoleController( RoleFactory ) {
    return {
        /*
         * Useful (deletable)
         */
        isRequestWellParameterized: function( body ) {
            var Controller = RoleFactory.getVendorController();
            return Controller.verifyParams([
                    { property: 'name', typeExpected: 'string' },
                    { property: 'slug', typeExpected: 'string' }
                ], body);
        }
    }
}

module.exports = RoleController;
