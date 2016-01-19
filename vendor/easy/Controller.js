function Controller() {
    return {
        verifyParams: function( required, params ) {
            var verified = true;

            for ( var requiredParam in required ) {
                var optional = required[ requiredParam ].optional;

                if ( !params.hasOwnProperty( required[ requiredParam ].property ) ) {
                    if ( !optional ) {
                        verified = false;
                        break;
                    }
                } else if ( typeof params[ required[ requiredParam ].property ] !== required[ requiredParam ].typeExpected ) {
                    if ( required[ requiredParam ].typeExpected === 'number' ) {
                        if ( !params[ required[ requiredParam ].property ].isNumber() ) {
                            verified = false;
                            break;
                        }
                    } else {
                        verified = false;
                        break;
                    }
                }
            }

            return verified;
        },

        isNumber: function( number ) {
            return typeof number === "number" || ( typeof number === 'string' && number.isNumber() );
        },

        parsePatchParams: function( req ) {
            try {
                return JSON.parse( req.rawBody );
            } catch ( error ) {}
        },

        isPatchRequestWellParameterized: function( req ) {
            return req.rawBody.length > 0;
        },

        doesRequiredElementExists: function( element, options, BundleManager, callback ) {
            var requireBy = null;
            var optionsFetch = null;

            if ( options instanceof Object && !( options instanceof Array ) ) {
                requireBy = options.requireBy;
                optionsFetch = options.options;
            } else {
                requireBy = options;
            }

            var ElementRepository   = BundleManager.getFactory( element.capitalizeFirstLetter() ).getRepository();
            if ( this.isNumber( requireBy ) ) {

                ElementRepository.read( requireBy, optionsFetch )
                .then( function( element ) {

                    if ( element ) {

                        callback( null, element );

                    } else {
                        callback({ type: 'notFound' });
                    }

                })
                .catch( function( error ) {
                    callback({ type: 'internalServerError', exactly: error});
                })

            } else {
                callback({ type: 'badRequest' });
            }
        },

        isDevEnv: function() {
            return 'development' === process.env.NODE_ENV;
        },

        isProdEnv: function() {
            return !this.isDevEnv();
        }
    }
}

module.exports = Controller;
