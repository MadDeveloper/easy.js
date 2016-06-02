import colors from 'colors'

export default class Console {
    constructor() {
        this._leftSpaces = '  '
    }

    error({ title, message = '', consequence = '', exit = undefined }) {
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

    warn( message = "" ) {
        console.log( this.leftSpaces + colors.bgYellow( colors.black( `WARN: ${message}` ) ) )
    }

    info( message = "" ) {
        console.log( this.leftSpaces + colors.cyan( message ) )
    }

    success( message = "", exit ) {
        console.log( this.leftSpaces + colors.green( message ) )

        if ( exit ) {
            process.exit()
        }
    }

    log( message = "" ) {
        console.log( message )
    }

    line() {
        console.log( '\n' )
    }

    /*
     * Getters and setters
     */
    get leftSpaces() {
        return this._leftSpaces
    }

    set leftSpaces( leftSpaces ) {
        this._leftSpaces = leftSpaces
        return this
    }
}
