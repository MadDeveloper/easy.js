/*
* This file is part of the easy framework.
*
* (c) Julien Sergent <sergent.julien@icloud.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

const token = jasmine.createSpyObj( 'token', [
    'sign',
    'verify',
    'config',
    'reset'
])

token.reset = () => {
    for( let property in token ) {
        if ( token.hasOwnProperty( property ) && token[ property ].hasOwnProperty( 'calls' ) ) {
            token[ property ].calls.reset()
        }
    }
}

module.exports = token
