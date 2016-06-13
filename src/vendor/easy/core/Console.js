import colors       from 'colors'
import Component    from './Component'

/**
 * @class Console
 * @extends Component
 */
export default class Console extends Component {
    /**
     * @constructor
     */
    constructor() {
        super()

        this._leftSpaces = '  '
    }

    /**
     * error - display error in console
     *
     * @param  {string} { title
     * @param  {string} message = ''
     * @param  {string} consequence = ''
     * @param  {number} exit = null }
     */
    error({ title, message = '', consequence = '', exit = null }) {
        if ( undefined !== title ) {

            this.line()
            console.log( this.leftSpaces + colors.bgRed( colors.white( `Error: ${title}` ) ) )

            if ( undefined !== typeof message && message.length > 0 ) {
                console.log( this.leftSpaces + colors.bgRed( colors.white( `    ->  ${message}` ) ) )
            }

            if ( undefined !== typeof consequence && consequence.length > 0 ) {
                console.log( this.leftSpaces + colors.bgRed( colors.white( consequence ) ) )
            }

            this.line()

            if ( "undefined" !== typeof exit || !isNaN( exit ) ) {
                process.exit( exit )
            }

        } else {
            this.error({
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
    warn( message = "" ) {
        console.log( this.leftSpaces + colors.bgYellow( colors.black( `WARN: ${message}` ) ) )
    }

    /**
     * info - display info message in console
     *
     * @param  {string} message = ""
     */
    info( message = "" ) {
        console.log( this.leftSpaces + colors.cyan( message ) )
    }

    /**
     * success - display success message in console
     *
     * @param  {string} message = ""
     * @param  {number} exit
     */
    success( message = "", exit = null ) {
        console.log( this.leftSpaces + colors.green( message ) )

        if ( exit ) {
            process.exit()
        }
    }

    /**
     * log - display sample message in console
     *
     * @param  {string} message = ""
     */
    log( message = "" ) {
        console.log( message )
    }

    /**
     * line - insert new line in console
     */
    line() {
        console.log( '\n' )
    }

    /**
     * get - left spaces (e.g. tab)
     *
     * @returns {string}
     */
    get leftSpaces() {
        return this._leftSpaces
    }
}
