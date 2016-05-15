'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

function Controller(Container) {

    var http = Container.getDependency('Http');

    return {
        verifyParams: function verifyParams(required, params) {
            var verified = true;

            for (var requiredParam in required) {
                var optional = required[requiredParam].optional;

                if (!params.hasOwnProperty(required[requiredParam].property)) {
                    if (!optional) {
                        verified = false;
                        break;
                    }
                } else if (_typeof(params[required[requiredParam].property]) !== required[requiredParam].typeExpected) {
                    if (required[requiredParam].typeExpected === 'number') {
                        if (!params[required[requiredParam].property].isNumber()) {
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

        isNumber: function isNumber(number) {
            return typeof number === "number" || typeof number === 'string' && number.isNumber();
        },

        parsePatchParams: function parsePatchParams(req) {
            try {
                return JSON.parse(req.rawBody);
            } catch (error) {}
        },

        isPatchRequestWellParameterized: function isPatchRequestWellParameterized(req) {
            return req.rawBody.length > 0;
        },

        doesRequiredElementExists: function doesRequiredElementExists(element, options, BundleManager, callback) {
            var requireBy = null;
            var optionsFetch = null;

            if (options instanceof Object && !(options instanceof Array)) {
                requireBy = options.requireBy;
                optionsFetch = options.options;
            } else {
                requireBy = options;
            }

            var ElementRepository = BundleManager.getFactory(element.capitalizeFirstLetter()).getRepository();
            ElementRepository.read(requireBy, optionsFetch).then(function (element) {

                if (element) {

                    callback(element);
                } else {
                    http.notFound();
                }
            }).catch(function (error) {
                http.internalServerError(error);
            });
        },

        isDevEnv: function isDevEnv() {
            return 'development' === process.env.NODE_ENV;
        },

        isProdEnv: function isProdEnv() {
            return !this.isDevEnv();
        }
    };
}

module.exports = Controller;