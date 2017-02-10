/*
* This file is part of the easy framework.
*
* (c) Julien Sergent <sergent.julien@icloud.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

const logFileManager = jasmine.createSpyObj( 'v', [
    'openLogFile',
    'openLogFileSync',
    'logDirectoryPath'
])

module.exports = logFileManager