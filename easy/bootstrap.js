/*
* This file is part of the easy framework.
*
* (c) Julien Sergent <sergent.julien@icloud.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

require( 'use-strict' )

const path = require( 'path' )
const { Application, Console } = require( 'easy/core' )
const appRootPath = path.resolve( `${process.argv[ 1 ]}/../../../` )
const application = new Application()

try {
	application.configure( appRootPath )
} catch ( error ) {
	Console.error({ title: 'The configuration of the application has failed', message: error, consequence: 'Application stopped' })
	process.exit()
}

module.exports = { application }
