/*
* This file is part of the easy framework.
*
* (c) Julien Sergent <sergent.julien@icloud.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

const request = jasmine.createSpyObj( 'request', [
    'retrieve',
    'getBody',
    'getRouteParameter',
    'store',
    'methodIs',
    'getMethod',
    'getHeader',
    'getBody',
    'getRawbody',
    'getBodyParameter',
    'setBodyParameter',
    'getRouteParameter',
    'getAppParameter',
    'getAppParameter',
    'setAppParameter',
    'getProperty',
    'setProperty',
    'urlContains',
    'store',
    'retrieve',
    'getCookies',
    'scope'
])

module.exports = request
