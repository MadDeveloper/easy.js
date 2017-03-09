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
    'config',
    'reset'
])

tokenManager.reset = () => {
    for( let property in tokenManager ) {
        if ( tokenManager.hasOwnProperty( property ) && tokenManager[ property ].hasOwnProperty( 'calls' ) ) {
            tokenManager[ property ].calls.reset()
        }
    }
}

module.exports = tokenManager
