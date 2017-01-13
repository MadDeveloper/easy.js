/*
* This file is part of the easy framework.
*
* (c) Julien Sergent <sergent.julien@icloud.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

/**
 * cleanSpaces - clean spaces into string
 *
 * @param {string} str
 *
 * @returns {string}
 */
module.exports.cleanSpaces = str => {
    return str.replace( /\s/i, '' )
}

/**
 * strtr - replace string occurences (eq. strtr php), see: http://locutus.io/php/strings/strtr/
 *
 * @param {string} str
 * @param {string|object} fromObj
 * @param {string|object} to
 *
 * @returns {string}
 */
module.exports.strtr = ( str, fromObj, to ) => {
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
    if ( 'object' === typeof fromObj ) {
        for ( fr in fromObj ) {
            if ( fromObj.hasOwnProperty( fr ) ) {
                tmpFrom.push( fr )
                tmpTo.push( fromObj[ fr ])
            }
        }

        fromObj = tmpFrom
        to = tmpTo
    }

    // Walk through subject and replace chars when needed
    lenStr = str.length
    lenFrom = fromObj.length
    fromTypeStr = 'string' === typeof fromObj
    toTypeStr = 'string' === typeof to

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
                if ( str.substr( i, fromObj[ j ].length ) == fromObj[ j ]) {
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

module.exports.transform = {}

/**
 * asSnakeCase - transform string as snake case
 *
 * @param {string} originalName
 *
 * @returns {string}
 */
module.exports.transform.asSnakeCase = originalName => {
    let formatedName = originalName

    formatedName = formatedName.trim()
    formatedName = module.exports.transform.asWord( formatedName )
    formatedName = formatedName.replace( /[-!#$€£¤§<>%&~=+'"°%`.,:/@()\\{[]}]/gi, '' )
    formatedName = formatedName.replace( / /g, '_' )
    formatedName = formatedName.toLowerCase()

    return formatedName
}

/**
 * transformAsWord - remove all caracters which are not considered as regex word
 *
 * @param {string} str
 *
 * @returns {string}
 */
module.exports.transform.asWord = str => {
    return str.replace( /[^\w ]/gi, '' )
}

/**
 * asBundleName - format string as bundle name
 *
 * @param {string} name
 *
 * @returns {string}
 */
module.exports.transform.asBundleName = name => {
    return module.exports.cleanSpaces( module.exports.transform.asWord( name.toLowerCase() ) )
}

/**
 * asBundleName - format string as bundle name
 *
 * @param {string} name
 *
 * @returns {string}
 */
module.exports.transform.asFileName = name => {

}

/**
 * asBundleName - format string as bundle name
 *
 * @param {string} name
 *
 * @returns {string}
 */
module.exports.transform.asClassName = name => {
    return name
}
