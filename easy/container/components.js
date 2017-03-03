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
        path: 'easy/core/Router'
    },
    'component.logwriter': {
        path: 'easy/log/LogWriter'
    },
    'component.logger': {
        path: 'easy/log/Logger',
        dependencies: [ 'component.logwriter' ]
    }
}
