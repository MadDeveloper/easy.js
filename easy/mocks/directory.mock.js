/*
* This file is part of the easy framework.
*
* (c) Julien Sergent <sergent.julien@icloud.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

const directory = jasmine.createSpyObj( 'directory', [
    'exists',
    'create',
    'delete',
    'rename',
    'move'
])

module.exports = directory