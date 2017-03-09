/*
* This file is part of the easy framework.
*
* (c) Julien Sergent <sergent.julien@icloud.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

const request = jasmine.createSpyObj( 'request', [
    'getBody',
    'getRouteParameter',
    'methodIs',
    'getMethod',
    'getHeader',
    'getBody',
    'getRawBody',
    'getBodyParameter',
    'setBodyParameter',
    'getRouteParameter',
    'getProperty',
    'setProperty',
    'urlContains',
    'set',
    'get',
    'getCookies',
    'scope',
    'reset'
])

request.reset = () => {
    for( let property in request ) {
        if ( request.hasOwnProperty( property ) && request[ property ].hasOwnProperty( 'calls' ) ) {
            request[ property ].calls.reset()
        }
    }
}

module.exports = request
