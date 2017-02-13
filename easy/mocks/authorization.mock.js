/*
* This file is part of the easy framework.
*
* (c) Julien Sergent <sergent.julien@icloud.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

const authorization = jasmine.createSpyObj( 'authorization', [
    'checkToken',
    'reset'
])

authorization.reset = () => {
    for( let property in authorization ) {
        if ( authorization.hasOwnProperty( property ) && authorization[ property ].hasOwnProperty( 'calls' ) ) {
            authorization[ property ].calls.reset()
        }
    }
}

module.exports = authorization
