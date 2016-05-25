import colors from 'colors'

export default class Console {
    constructor() {
        this._leftSpaces = '  '
    }

    error( params ) {
        if ( undefined !== params.title && undefined !== params.message ) {

            const consequence = ( params.consequence ) ? params.consequence : ""

            console.log( '\n' )
            console.log( this.leftSpaces + colors.bgRed( colors.white( "Error: " + params.title ) ) )
            console.log( this.leftSpaces + colors.bgRed( colors.white( "    -> " + params.message ) ) )
            console.log( this.leftSpaces + colors.bgRed( colors.white( consequence ) ) )
            console.log( '\n' )

            if ( typeof params.exit !== "undefined" || !isNaN( params.exit ) ) {
                process.exit( params.exit )
            }

        } else {
            this.error({
                title: "Invalid arguments",
                message: "Missing arguments to error from Console class"
            })
        }
    }

    warn( message ) {
        console.log( this.leftSpaces + colors.bgYellow( colors.black( 'WARN: ' + message ) ) )
    }

    info( message ) {
        console.log( this.leftSpaces + colors.cyan( message ) )
    }

    success( message, exit ) {
        console.log( this.leftSpaces + colors.green( message ) )

        if ( exit ) {
            process.exit()
        }
    }

    log( ...args ) {
        console.log( args )
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
