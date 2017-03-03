/*
* This file is part of the easy framework.
*
* (c) Julien Sergent <sergent.julien@icloud.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

require( 'use-strict' )

/*
 * Import and configure main Easy class
 */
const { Application } = require( 'easy/core' )
const appRootPath = `${__dirname}/../`
const application = new Application()

application.configure( appRootPath )

module.exports = { application }
