function Request( appName ) {
    return {
        requestScope: null,

        registerRequestScope: function( request ) {
            this.requestScope = request;
        },

        getRequestScope: function() {
            return this.requestScope;
        },

        define: function( property, value ) {
            /*
             * Defining global app scope in request
             */
            if ( !this.getRequestScope().hasOwnProperty( this.getAppName() ) ) {
                this.getRequestScope()[ this.getAppName() ] = {};
            }

            /*
             * Defining or redefine property in app scope in request
             */
            this.getRequestScope()[ this.getAppName() ][ property ] = value;

            return this;
        },

        find: function( property ) {
            if ( this.getRequestScope()[ this.getAppName() ].hasOwnProperty( property ) ) {
                return this.getRequestScope()[ this.getAppName() ][ property ];
            } else {
                return undefined;
            }
        },

        /*
         * Aliases
         */
        getAppName: function() {
            return appName;
        }
    }
}

module.exports = Request;
