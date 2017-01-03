/*
 * Prototype next routes approach
 * will replace bundles.js
 * and permit to declare global custom routes
 */
const role = require( 'src/bundles/role' )
const user = require( 'src/bundles/user' )
const mailer = require( 'src/services/mailer.service' )

module.exports = {
    bundles: [
        role,
        user
    ],

    '/custom': function( request, response ) {},
    '/mail': mailer.send
}
