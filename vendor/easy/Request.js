function Request( appName ) {
    return {
        requestScope: null,

        registerRequestScope: function( request ) {
            this.requestScope = request;
        },

        getScope: function() {
            return this.requestScope;
        },

        getBody: function() {
            return this.getScope().body;
        },

        getParams: function() {
            return this.getScope().params;
        },

        getBodyParameter: function( key ) {
            return this.getBody()[ key ];
        },

        setBodyParameter: function( key, value ) {
            this.getBody()[ key ] = value;
        },

        getRouteParameter: function( param ) {
            return this.getParams()[ param ];
        },

        define: function( property, value ) {
            /*
             * Defining global app scope in request
             */
            if ( !this.getScope().hasOwnProperty( this.getAppName() ) ) {
                this.getScope()[ this.getAppName() ] = {};
            }

            /*
             * Defining or redefine property in app scope in request
             */
            this.getScope()[ this.getAppName() ][ property ] = value;

            return this;
        },

        find: function( property ) {
            if ( this.getScope()[ this.getAppName() ].hasOwnProperty( property ) ) {
                return this.getScope()[ this.getAppName() ][ property ];
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
