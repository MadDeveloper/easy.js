/*
* This file is part of the easy framework.
*
* (c) Julien Sergent <sergent.julien@icloud.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

const directory = jasmine.createSpyObj( 'directory', [
    'loadPathInfo',
    'exists',
    'existsSync',
	'read',
	'readSync',
    'create',
    'createSync',
    'delete',
    'deleteSync',
    'rename',
    'renameSync',
    'move',
    'moveSync',
    'path',
    'reset'
])

directory.reset = () => {
    for( let property in directory ) {
        if ( directory.hasOwnProperty( property ) && directory[ property ].hasOwnProperty( 'calls' ) ) {
            directory[ property ].calls.reset()
        }
    }
}

module.exports = directory
