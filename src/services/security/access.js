var access = function() {
    /*
     * You can edit as you want following roles.
     * Becareful: You must start your roles' id at 3
     * Roles' id are mapped with ids into database
     * example:
     *
     * var roleModerator = 3;
     */


    /*
     * BECAREFUL WHEN EDITING OR DELETING THE FOLLOWING VARIABLES
     */
    var _               = require( 'lodash' );
    var roleAny         = 0;
    var roleAdmin       = 1;
    var roleUser        = 2;
    var focus           = roleAny;
    var restrictions    = {};

    return {
        /*
         * You can add properties below to suit your needs about roles access
         * example:
         *
         * moderator: roleModerator,
         *
         * isModerator: function() {
         *     return focus === roleModerator;
         * },
         */


        /*
         * BECAREFUL WHEN EDITING THE PART BELOW
         */
        admin: roleAdmin,
        user: roleUser,
        any: roleAny,

        isAdmin: function() {
            return focus === roleAdmin;
        },

        isUser: function() {
            return focus === roleUser;
        },

        isAny: function() {
            return focus === roleAny;
        },

        focusOn: function( role ) {
            focus = role;
            return this;
        },

        restrict: function( params ) {
            if ( !params.mustBe || params.mustBe.length === 0 ) {
                params.mustBe = [ this.any ];
            }

            if ( !params.canRead || params.canRead.length === 0 ) {
                params.canRead = params.mustBe;
            }

            if ( !params.canCreate || params.canCreate.length === 0 ) {
                params.canCreate = params.mustBe;
            }

            if ( !params.canUpdate || params.canUpdate.length === 0 ) {
                params.canUpdate = params.mustBe;
            }

            if ( !params.canDelete || params.canDelete.length === 0 ) {
                params.canDelete = params.mustBe;
            }

            /*
             * An admin as all privileges
             */
            if ( _.indexOf( params.mustBe, this.admin ) === -1 ) {
                params.mustBe.push( this.admin );
            }

            if ( _.indexOf( params.canRead, this.admin ) === -1 ) {
                params.canRead.push( this.admin );
            }

            if ( _.indexOf( params.canCreate, this.admin ) === -1 ) {
                params.canCreate.push( this.admin );
            }

            if ( _.indexOf( params.canUpdate, this.admin ) === -1 ) {
                params.canUpdate.push( this.admin );
            }

            if ( _.indexOf( params.canDelete, this.admin ) === -1 ) {
                params.canDelete.push( this.admin );
            }

            restrictions = params;
            return this;
        },

        canReach: function( httpMethod ) {
            var isAuthorizedToReach = false;

            var method      = httpMethod.toLowerCase();
            var authorized  = _.indexOf( restrictions.mustBe, focus ) !== -1 || _.indexOf( restrictions.mustBe, this.any ) !== -1;

            if ( authorized ) {

                var methodWhenReading   = [ 'get' ];
                var methodWhenCreating  = [ 'post' ];
                var methodWhenUpdating  = [ 'put', 'patch' ];
                var methodWhenDeleting  = [ 'delete' ];

                if ( _.indexOf( methodWhenReading, method ) !== -1 ) {

                    isAuthorizedToReach = _.indexOf( restrictions.canRead, focus ) !== -1 || _.indexOf( restrictions.canRead, this.any ) !== -1;

                } else if ( _.indexOf( methodWhenCreating, method ) !== -1 ) {

                    isAuthorizedToReach = _.indexOf( restrictions.canCreate, focus ) !== -1 || _.indexOf( restrictions.canCreate, this.any ) !== -1;

                } else if ( _.indexOf( methodWhenUpdating, method ) !== -1 ) {

                    isAuthorizedToReach = _.indexOf( restrictions.canUpdate, focus ) !== -1 || _.indexOf( restrictions.canUpdate, this.any ) !== -1;

                } else if ( _.indexOf( methodWhenDeleting, method ) !== -1 ) {

                    isAuthorizedToReach = _.indexOf( restrictions.canDelete, focus ) !== -1 || _.indexOf( restrictions.canDelete, this.any ) !== -1;

                }

            }

            return isAuthorizedToReach;
        }
    }
};

module.exports = access;
