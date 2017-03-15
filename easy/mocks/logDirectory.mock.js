/*
* This file is part of the easy framework.
*
* (c) Julien Sergent <sergent.julien@icloud.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

const logDirectory = jasmine.createSpyObj( 'logDirectory', [
    'create',
    'directoryPath',
    'reset'
])

logDirectory.reset = () => {
    for( let property in logDirectory ) {
        if ( logDirectory.hasOwnProperty( property ) && logDirectory[ property ].hasOwnProperty( 'calls' ) ) {
            logDirectory[ property ].calls.reset()
        }
    }
}

module.exports = logDirectory
