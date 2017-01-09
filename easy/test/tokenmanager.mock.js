/*
* This file is part of the easy framework.
*
* (c) Julien Sergent <sergent.julien@icloud.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

const tokenManager = jasmine.createSpyObj( 'tokenManager', [
    'sign',
    'verify',
    'getConfig'
])

module.exports = tokenManager
