const Jasmine = require( 'jasmine' )
const { kernel, application } = require( `../../src/bootstrap` )

const jasmine = new Jasmine()

global.easy = { application }
global.jasmine = jasmine.jasmine

jasmine.loadConfigFile( `${kernel.path.root}/jasmine.json` )
jasmine.execute()
