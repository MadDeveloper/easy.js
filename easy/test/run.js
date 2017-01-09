/*
* This file is part of the easy framework.
*
* (c) Julien Sergent <sergent.julien@icloud.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

const Jasmine = require( 'jasmine' )
const { kernel, application } = require( `../../src/bootstrap` )

const jasmine = new Jasmine()

global.easy = { application }
global.jasmine = jasmine.jasmine

jasmine.loadConfigFile( `${kernel.path.root}/jasmine.json` )
jasmine.execute()
