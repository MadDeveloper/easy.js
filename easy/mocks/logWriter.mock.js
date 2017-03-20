/*
* This file is part of the easy framework.
*
* (c) Julien Sergent <sergent.julien@icloud.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

const logWriter = jasmine.createSpyObj( 'logWriter', [
    'write',
    'reset'
])

logWriter.reset = () => {
    for( let property in logWriter ) {
        if ( logWriter.hasOwnProperty( property ) && logWriter[ property ].hasOwnProperty( 'calls' ) ) {
            logWriter[ property ].calls.reset()
        }
    }
}

const container = easy.application.container

container.set( 'logwriter', logWriter )

module.exports = logWriter
