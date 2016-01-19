function SkeletonController( SkeletonFactory ) {
    return {
        /*
         * Useful (deletable)
         */
        isRequestWellParameterized: function( body ) {
            var Controller = SkeletonFactory.getVendorController();
            return Controller.verifyParams([
                    { property: 'example', typeExpected: 'string' }
                ], body );
        }
    }
}

module.exports = SkeletonController;
