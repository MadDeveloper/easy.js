/*
* This file is part of the easy framework.
*
* (c) Julien Sergent <sergent.julien@icloud.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

const chalk = require( 'chalk' )

/**
 * @class Console
 */
class Console {
    /**
     * Display error in stdout
     *
     * @param {string} { title
     * @param {string} [message='']
     * @param {string} [consequence=''] }
     */
    static error({ title, message = '', consequence = '' }) {
        if ( title ) {
            console.log( `\n${chalk.red.bold.underline( title )}` )

            if ( message ) {
                console.log( `\n${chalk.red.bold( message )}` )
            }

            if ( consequence ) {
                console.log( chalk.red.bold( `\n(Consequence) ${consequence}` ) )
            }

            console.log( '\n' )
        } else {
            Console.error({ title: 'Missing required title argument to Console.error() method' })
        }
    }

    /**
     * Display warning in console
     *
     * @param {string} [message='']
     */
    static warn( message = '' ) {
        console.log( `${chalk.black.bgYellow( 'WARN:' )} ${message}` )
    }

    /**
     * Display info message in console
     *
     * @param {string} [message='']
     */
    static info( message = '' ) {
        console.log( chalk.blue.bold( message ) )
    }

    /**
     * Display success message in console
     *
     * @param {string} [message='']
     * @param {number} [exit=false]
     */
    static success( message = '', exit = false ) {
        console.log( chalk.green.bold( message ) )
    }

    /**
     * Display sample message in console
     *
     * @param {string} [message='']
     */
    static log( message = '' ) {
        console.log( message )
    }

    /**
     * Clear terminal by adding as many lines as screen height
     *
     * @static
     *
     * @memberOf Console
     */
    static clear() {
        const lines = process.stdout.getWindowSize()[ 1 ]

        for( let i = 0; i < lines; i++ ) {
            Console.line()
        }
    }

    /**
     * Insert new line in console
     */
    static line() {
        console.log( '' )
    }
}

module.exports = Console
