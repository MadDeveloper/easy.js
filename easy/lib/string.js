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
 * Replace string occurences (eq. strtr php), see: http://locutus.io/php/strings/strtr/
 *
 * @param {string} str
 * @param {string|Object} fromObj
 * @param {string|Object} to
 * @returns {string}
 */
function strtr ( str, fromObj, to ) {
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

/**
 * Remove all caracters which are not considered as regex word
 *
 * @param {string} str
 * @returns {string}
 */
function asWord( str ) {
    return str.replace( /[^\w ]/gi, '' )
}

/**
 * Format string as bundle name
 *
 * @param {string} name
 * @returns {string}
 */
function asBundleName( name ) {
    return kebabCase( deburr( trim( name ) ) )
}

/**
 * Format string as file name
 *
 * @param {string} name
 * @returns {string}
 */
function asFileName( name ) {
    return kebabCase( deburr( trim( name ) ) )
}

/**
 * Format string as controller file name
 *
 * @param {string} name
 * @returns {string}
 */
function asControllerFileName( name ) {
    return `${asFileName( name.replace( /controller/ig, '' ) )}.controller.js`
}

/**
 * Format string as repository file name
 *
 * @param {string} name
 * @returns {string}
 */
function asRepositoryFileName( name ) {
    return `${asFileName( name.replace( /repository/ig, '' ) )}.repository.js`
}

/**
 * Format string as entity file name
 *
 * @param {string} name
 * @returns {string}
 */
function asEntityFileName ( name ) {
    return asFileName( name )
}

/**
 * Format string as service file name
 *
 * @param {string} name
 *
 * @returns {string}
 */
function asServiceFileName( name ) {
    return `${asFileName( name.replace( /service/ig, '' ) )}.service.js`
}

/**
 * Format string as class file name
 *
 * @param {string} name
 * @returns {string}
 */
function asClassName( name ) {
    return upperFirst( camelCase( asFileName( name ) ) )
}

/**
 * Format string as controller name
 *
 * @param {string} name
 * @returns {string}
 */
function asControllerName( name ) {
    return asClassName( name ).replace( /controller/gi, '' ).concat( 'Controller' )
}

/**
 * Format string as repository name
 *
 * @param {string} name
 * @returns {string}
 */
function asRepositoryName( name ) {
    return asClassName( name ).replace( /repository/gi, '' ).concat( 'Repository' )
}

/**
 * Format string as entity name
 *
 * @param {string} name
 * @returns {string}
 */
function asEntityName( name ) {
    return asClassName( name ).replace( /(service|repository|controller)/gi, '' )
}

/**
 * Format string as service name
 *
 * @param {string} name
 * @returns {string}
 */
function asServiceName( name ) {
    return asClassName( name ).replace( /service/gi, '' ).concat( 'Service' )
}

/**
 * Format string as service file path
 *
 * @param {string} fileName
 * @returns {string}
 */
function asServiceFilePath( fileName ) {
    return `src/services/${fileName}`
}


module.exports.strtr = strtr
module.exports.transform = {}
module.exports.transform.asWord = asWord
module.exports.transform.asBundleName = asBundleName
module.exports.transform.asClassName = asClassName
module.exports.transform.asControllerName = asControllerName
module.exports.transform.asControllerFileName = asControllerFileName
module.exports.transform.asRepositoryName = asRepositoryName
module.exports.transform.asEntityName = asEntityName
module.exports.transform.asEntityFileName = asEntityFileName
module.exports.transform.asServiceName = asServiceName
module.exports.transform.asServiceFileName = asServiceFileName
module.exports.transform.asServiceFilePath = asServiceFilePath
module.exports.transform.asFileName = asFileName
module.exports.transform.asRepositoryFileName = asRepositoryFileName
module.exports.transform.asRepositoryName = asRepositoryName
