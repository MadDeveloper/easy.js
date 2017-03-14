/*
* This file is part of the easy framework.
*
* (c) Julien Sergent <sergent.julien@icloud.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

const logger = jasmine.createSpyObj( 'logger', [
    'emergency',
    'alert',
    'critical',
    'error',
    'warning',
    'notice',
    'info',
    'debug',
    'log',
    'logWriter',
    'reset'
])

logger.reset = () => {
    for( let property in logger ) {
        if ( logger.hasOwnProperty( property ) && logger[ property ].hasOwnProperty( 'calls' ) ) {
            logger[ property ].calls.reset()
        }
    }
}

const container = easy.application.container

container.set( 'component.logger', logger )

module.exports = logger
