function Http( DependencyInjector ) {

    var fs          = require( 'fs' );
    var Logger      = DependencyInjector.getDependency( 'Logger' );
    var Request     = DependencyInjector.getDependency( 'Request' );
    var Response    = DependencyInjector.getDependency( 'Response' );

    function formatParams( params, setDefault ) {
        if ( typeof params === "undefined" ) {
            if ( typeof setDefault !== "undefined" ) {
                params = setDefault;
            } else {
                params = undefined;
            }
        }

        return params;
    }

    return {
        status: {
            // Response to a successful GET, PUT, PATCH or DELETE. Can also be used for a POST that doesn't result in a creation
            ok: 200,
            // Response to a POST that results in a creation. Should be combined with a Location header pointing to the location of the new resource
            created: 201,
            // Response to a successful request that won't be returning a body (like a DELETE request)
            noContent: 204,
            // Used when HTTP caching headers are in play
            notModified: 304,
            // The request is malformed, such as if the body does not parse
            badRequest: 400,
            // When no or invalid authentication details are provided. Also useful to trigger an auth popup if the API is used from a browser
            unauthorized: 401,
            // When authentication succeeded but authenticated user doesn't have access to the resource
            forbidden: 403,
            //  When a non-existent resource is requested
            notFound: 404,
            // When an HTTP method is being requested that isn't allowed for the authenticated user
            methodNotAllowed: 405,
            // Indicates that the resource at this end point is no longer available. Useful as a blanket response for old API versions
            gone: 410,
            // If incorrect content type was provided as part of the request
            unsupportedMediaType: 415,
            // Used for validation errors
            unprocessableEntity: 422,
            // When a request is rejected due to rate limiting
            tooManyRequests: 429,
            // server error
            internalServerError: 500
        },

        ok: function( params ) {
            var res = Response.getScope();
            res.status( this.status.ok ).json( formatParams( params ) );
        },

        created: function( params ) {
            var res = Response.getScope();
            res.status( this.status.created ).json( formatParams( params ) );
        },

        notFound: function( params ) {
            var res = Response.getScope();
            res.status( this.status.notFound ).json( formatParams( params ) );
        },

        notModified: function( params ) {
            var res = Response.getScope();
            res.status( this.status.notModified ).json( formatParams( params ) );
        },

        gone: function( params ) {
            var res = Response.getScope();
            res.status( this.status.gone ).json( formatParams( params ) );
        },

        unauthorized: function( params ) {
            var res = Response.getScope();
            res.status( this.status.unauthorized ).json( formatParams( params ) );
        },

        methodNotAllowed: function( params ) {
            var res = Response.getScope();
            res.status( this.status.methodNotAllowed ).json( formatParams( params ) );
        },

        unsupportedMediaType: function( params ) {
            var res = Response.getScope();
            res.status( this.status.unsupportedMediaType ).json( formatParams( params ) );
        },

        tooManyRequests: function( params ) {
            var res = Response.getScope();
            res.status( this.status.tooManyRequests ).json( formatParams( params ) );
        },

        noContent: function( params ) {
            var res = Response.getScope();
            res.status( this.status.noContent ).json( formatParams( params ) );
        },

        internalServerError: function( params ) {
            var req = Request.getScope();
            var res = Response.getScope();
            var alertLog = '[{currentDate}] -- {remoteHostIp} -- {method} {originalUrl} {statusCode} -- ' + params + '\n';

            Logger.alert( alertLog, {
                '{currentDate}': new Date().toUTCString(),
                    '{remoteHostIp}': req.ip || req.connection.remoteAddress || req.headers['x-forwarded-for'],
                '{method}': req.method,
                '{originalUrl}': req.originalUrl,
                '{statusCode}': this.status.internalServerError
            });

            res.status( this.status.internalServerError ).json( formatParams( params ) );
        },

        badRequest: function( params ) {
            var res = Response.getScope();
            res.status( this.status.badRequest ).json( formatParams( params ) );
        },

        unauthorized: function( params ) {
            var res = Response.getScope();
            res.status( this.status.unauthorized ).json( formatParams( params ) );
        },

        forbidden: function( params ) {
            var res = Response.getScope();
            res.status( this.status.forbidden ).json( formatParams( params ) );
        },

        attachment: function( filePath, options ) {
            var res = Response.getScope();
            // res.attachment( filePath );
            res.sendFile( filePath, options, function ( error ) {
                if ( error ) {
                    res.status( error.status ).end();
                }
            });
        }
    }
}

module.exports = Http;
