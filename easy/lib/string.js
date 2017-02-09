/*
* This file is part of the easy framework.
*
* (c) Julien Sergent <sergent.julien@icloud.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

const { deburr, snakeCase, kebabCase, camelCase, upperFirst, upperCase, trim } = require( 'lodash' )

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
module.exports.transform.asSnakeCase = originalName => snakeCase( formatedName )

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
    return kebabCase( deburr( trim( name ) ) )
}

/**
 * asFileName - format string as file name
 *
 * @param {string} name
 *
 * @returns {string}
 */
module.exports.transform.asFileName = name => kebabCase( deburr( trim( name ) ) )

/**
 * asControllerFileName - format string as controller file name
 *
 * @param {string} name
 *
 * @returns {string}
 */
module.exports.transform.asControllerFileName = name => {
    return `${module.exports.transform.asFileName( name ).replace( /controller/ig, '' )}.controller.js`
}

/**
 * asRepositoryFileName - format string as repository file name
 *
 * @param {string} name
 *
 * @returns {string}
 */
module.exports.transform.asRepositoryFileName = name => {
    return `${module.exports.transform.asFileName( name ).replace( /repository/ig, '' )}.repository.js`
}

/**
 * asEntityFileName - format string as entity file name
 *
 * @param {string} name
 *
 * @returns {string}
 */
module.exports.transform.asEntityFileName = name => {
    return module.exports.transform.asFileName( name )
}

/**
 * asServiceFileName - format string as service file name
 *
 * @param {string} name
 *
 * @returns {string}
 */
module.exports.transform.asServiceFileName = name => {
    return `${module.exports.transform.asFileName( name ).replace( /service/ig, '' )}.service.js`
}

/**
 * asClassName - format string as class file name
 *
 * @param {string} name
 *
 * @returns {string}
 */
module.exports.transform.asClassName = name => {
    return camelCase( module.exports.transform.asFileName( name ) )
}

/**
 * asControllerName - format string as controller name
 *
 * @param {string} name
 *
 * @returns {string}
 */
module.exports.transform.asControllerName = name => {
    return module.exports.transform.asClassName( name ).concat( 'Controller' )
}

/**
 * asRepositoryName - format string as repository name
 *
 * @param {string} name
 *
 * @returns {string}
 */
module.exports.transform.asRepositoryName = name => {
    return module.exports.transform.asClassName( name ).concat( 'Repository' )
}

/**
 * asEntityName - format string as entity name
 *
 * @param {string} name
 *
 * @returns {string}
 */
module.exports.transform.asEntityName = name => {
    return module.exports.transform.asClassName( name ).replace( /(service|repository|controller)/gi, '' )
}

/**
 * asEntityName - format string as entity name
 *
 * @param {string} name
 *
 * @returns {string}
 */
module.exports.transform.asEntityName = name => {
    return module.exports.transform.asClassName( name ).replace( /(service|repository|controller)/gi, '' )
}

/**
 * asServiceName - format string as service name
 *
 * @param {string} name
 *
 * @returns {string}
 */
module.exports.transform.asServiceName = name => {
    return module.exports.transform.asClassName( name ).concat( 'Service' )
}
