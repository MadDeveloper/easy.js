module.exports.asSnakeCase = function( originalName ) {
    let formatedName = originalName

    formatedName = formatedName.trim()
    formatedName = this.cleanAccents( formatedName )
    formatedName = formatedName.replace( /[-!#$€£¤§<>%&~=+'"°%`.,:/@\(\)\\\{\[\]\}]/gi, '' )
    formatedName = formatedName.replace( / /g, '_' )
    formatedName = formatedName.toLowerCase()

    return formatedName
}

module.exports.cleanAccents = function( str ) {
    return str.replace( /[^\w ]/gi, '' )
}

module.exports.cleanSpaces = function( str ) {
    return str.replace( /\s/i, '' )
}

module.exports.strtr = function( str, fromObj, to ) {
    let fr = ''
    let i = 0
    let j = 0
    let lenStr = 0
    let lenFrom = 0
    let fromTypeStr = ''
    let toTypeStr = ''
    let istr = ''
    let tmpFrom = []
    let tmpTo = []
    let ret = ''
    let match = false

    // Received replace_pairs?
    // Convert to normal from->to chars
    if ( typeof fromObj === 'object' ) {
        for ( fr in fromObj ) {
            if ( fromObj.hasOwnProperty( fr ) ) {
                tmpFrom.push( fr )
                tmpTo.push( fromObj[ fr ] )
            }
        }

        fromObj = tmpFrom
        to = tmpTo
    }

    // Walk through subject and replace chars when needed
    lenStr = str.length
    lenFrom = fromObj.length
    fromTypeStr = typeof fromObj === 'string'
    toTypeStr = typeof to === 'string'

    for ( i = 0; i < lenStr; i++ ) {
        match = false
        if ( fromTypeStr ) {
            istr = str.charAt( i )
            for ( j = 0; j < lenFrom; j++ ) {
                if ( istr == fromObj.charAt( j ) ) {
                    match = true
                    break
                }
            }
        } else {
            for ( j = 0; j < lenFrom; j++ ) {
                if ( str.substr( i, fromObj[ j ].length ) == fromObj[ j ] ) {
                    match = true
                    // Fast forward
                    i = ( i + fromObj[ j ].length ) - 1
                    break
                }
            }
        }
        if ( match ) {
            ret += toTypeStr ? to.charAt( j ) : to[ j ]
        } else {
            ret += str.charAt( i )
        }
    }

    return ret
}