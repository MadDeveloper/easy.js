/*
* This file is part of the easy framework.
*
* (c) Julien Sergent <sergent.julien@icloud.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

const file = jasmine.createSpyObj( 'file', [
    'loadPathInfo',
    'exists',
    'existsSync',
    'create',
    'createSync',
    'read',
    'readSync',
    'write',
    'writeSync',
    'delete',
    'deleteSync',
    'rename',
    'renameSync',
    'move',
    'moveSync',
    'path',
    'content',
    'reset'
])

file.reset = () => {
    for( let property in file ) {
        if ( file.hasOwnProperty( property ) && file[ property ].hasOwnProperty( 'calls' ) ) {
            file[ property ].calls.reset()
        }
    }
}

module.exports = file
