/*
* This file is part of the easy framework.
*
* (c) Julien Sergent <sergent.julien@icloud.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

const response = jasmine.createSpyObj( 'response', [
	'headersAlreadySent',
    'continue',
    'switchingProtocols',
    'processing',
    'ok',
    'created',
    'accepted',
    'nonAuthoritativeInformation',
    'noContent',
    'resetContent',
    'partialContent',
    'multiStatus',
    'alreadyReported',
    'IMUsed',
    'multipleChoices',
    'movedPermanently',
    'found',
    'seeOther',
    'notModified',
    'useProxy',
    'temporaryRedirect',
    'permanentRedirect',
    'badRequest',
    'unauthorized',
    'paymentRequired',
    'forbidden',
    'notFound',
    'methodNotAllowed',
    'notAcceptable',
    'proxyAuthenticationRequired',
    'requestTimeout',
    'conflict',
    'gone',
    'lengthRequired',
    'preconditionFailed',
    'payloadTooLarge',
    'requestURITooLong',
    'unsupportedMediaType',
    'requestedRangeNotSatisfiable',
    'expectationFailed',
    'misdirectedRequest',
    'unprocessableEntity',
    'locked',
    'failedDependency',
    'upgradeRequired',
    'preconditionRequired',
    'tooManyRequests',
    'requestHeaderFieldsTooLarge',
    'connectionClosedWithoutResponse',
    'unavailableForLegalReasons',
    'clientClosedRequest',
    'internalServerError',
    'notImplemented',
    'badGateway',
    'serviceUnavailable',
    'gatewayTimeout',
    'httpVersionNotSupported',
    'variantAlsoNegotiates',
    'insufficientStorage',
    'loopDetected',
    'notExtended',
    'networkAuthenticationRequired',
    'networkConnectTimeoutError',
    'attachment',
    'scope',
    'request',
    'reset'
])

response.reset = () => {
    for( let property in response ) {
        if ( response.hasOwnProperty( property ) && response[ property ].hasOwnProperty( 'calls' ) ) {
            response[ property ].calls.reset()
        }
    }
}

module.exports = response
