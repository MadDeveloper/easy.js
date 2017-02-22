/*
* This file is part of the easy framework.
*
* (c) Julien Sergent <sergent.julien@icloud.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

const logDirectoryManager = jasmine.createSpyObj( 'v', [
    'createLogDirectory',
    'logDirectoryPath',
    'reset'
])

logDirectoryManager.reset = () => {
    for( let property in logDirectoryManager ) {
        if ( logDirectoryManager.hasOwnProperty( property ) && logDirectoryManager[ property ].hasOwnProperty( 'calls' ) ) {
            logDirectoryManager[ property ].calls.reset()
        }
    }
}

module.exports = logDirectoryManager
