import Service from './../../vendor/easy/core/Service'

export default class StringService extends Service {
    constructor( container ) {
        super( container )
    }

    load() {}

    asSnakeCase( originalName ) {
        let formatedName = originalName

        formatedName = formatedName.trim()
        formatedName = this.cleanAccents( formatedName )
        formatedName = formatedName.replace( /[-!#$€£¤§<>%&~=+'"°%`.,:/@\(\)\\\{\[\]\}]/gi, '' )
        formatedName = formatedName.replace( / /g, '_' )
        formatedName = formatedName.toLowerCase()

        return formatedName
    }

    cleanAccents( string ) {
        return string.replace( /[^\w ]/gi, '' )
    }
}
