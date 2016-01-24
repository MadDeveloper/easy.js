function Response() {
    return {
        responseScope: null,

        registerResponseScope: function( response ) {
            this.responseScope = response;
        },

        getScope: function() {
            return this.responseScope;
        }
    }
}

module.exports = Response;
