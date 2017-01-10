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
            console.log( `${Console.leftSpaces}${colors.bgRed( colors.white( `Error: ${title}` ) )}` )

            if ( undefined !== typeof message && message.length > 0 ) {
                console.log( `${Console.leftSpaces}${colors.bgRed( colors.white( `    ->  ${message}` ) )}` )
            }

            if ( undefined !== typeof consequence && consequence.length > 0 ) {
                console.log( `${Console.leftSpaces}${colors.bgRed( colors.white( consequence ) )}` )
            }

            Console.line()

            if ( Number.isInteger( exit ) ) {
                process.exit( exit )
            }

        } else {
            Console.error({
                title: "Invalid arguments",
                message: "Missing arguments to error from Console class"
            })
        }
    }

    /**
     * warn - display warning in console
     *
     * @param  {string} message = ""
     */
    static warn( message = "" ) {
        console.log( `${Console.leftSpaces}${colors.bgYellow( colors.black( `WARN: ${message}` ) )}` )
    }

    /**
     * info - display info message in console
     *
     * @param  {string} message = ""
     */
    static info( message = "" ) {
        console.log( `${Console.leftSpaces}${colors.cyan( message )}` )
    }

    /**
     * success - display success message in console
     *
     * @param  {string} message = ""
     * @param  {number} exit
     */
    static success( message = "", exit = null ) {
        console.log( `${Console.leftSpaces}${colors.green( message )}` )

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
        console.log( `${Console.leftSpaces}${message}` )
    }

    /**
     * line - insert new line in console
     */
    static line() {
        console.log( '\n' )
    }

    /**
     * get - left spaces (e.g. tab)
     *
     * @returns {string}
     */
    static get leftSpaces() {
        return '  '
    }
}

module.exports = Console
