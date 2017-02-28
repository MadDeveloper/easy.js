/*
* This file is part of the easy framework.
*
* (c) Julien Sergent <sergent.julien@icloud.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

const colors = require( 'colors' )

/**
 * @class Console
 */
class Console {
    /**
     * error - display error in console
     *
     * @param  {string} { title
     * @param  {string} message = ''
     * @param  {string} consequence = ''
     * @param  {number} exit = null }
     */
    static error({ title, message = '', consequence = '', exit = null }) {
        if ( undefined !== title ) {

            Console.line()
            console.log( `${colors.red( `[${title}]` )}` )

            if ( message ) {
                console.log( `${colors.red( message )}` )
            }

            if ( consequence ) {
                console.log( colors.white( consequence ) )
            }

            Console.line()

            if ( Number.isInteger( exit ) ) {
                process.exit( exit )
            }

        } else {
            Console.error({ title: 'Missing required title argument to Console.error() method' })
        }
    }

    /**
     * warn - display warning in console
     *
     * @param  {string} message = ""
     */
    static warn( message = "" ) {
        console.log( `${colors.bgYellow( colors.black( `WARN: ${message.toString()}` ) )}` )
    }

    /**
     * info - display info message in console
     *
     * @param  {string} message = ""
     */
    static info( message = "" ) {
        console.log( `${colors.blue( message.toString() )}` )
    }

    /**
     * success - display success message in console
     *
     * @param  {string} message = ""
     * @param  {number} exit
     */
    static success( message = "", exit = null ) {
        console.log( `${colors.green( message.toString() )}` )

        if ( exit ) {
            process.exit()
        }
    }

    /**
     * log - display sample message in console
     *
     * @param  {string} message = ""
     */
    static log( message = "" ) {
        console.log( `${message.toString()}` )
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
            console.log( '\r\n' )
        }
    }

    /**
     * line - insert new line in console
     */
    static line() {
        console.log( '' )
    }
}

module.exports = Console
