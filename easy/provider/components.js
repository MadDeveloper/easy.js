/*
* This file is part of the easy framework.
*
* (c) Julien Sergent <sergent.julien@icloud.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

module.exports = {
    'component.router': {
        path: 'core/Router',
        dependencies: []
    },
    'component.logfilemanager': {
        path: 'log/LogFileManager',
        dependencies: [ 'easy.application' ]
    },
    'component.logwriter': {
        path: 'log/LogWriter',
        dependencies: [ 'component.logfilemanager' ]
    },
    'component.logger': {
        path: 'log/Logger',
        dependencies: [ 'component.logwriter' ]
    }
}
