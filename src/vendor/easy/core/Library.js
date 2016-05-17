export default class String {
    strtr( str, fromObj, to ) {
      var fr = '',
        i = 0,
        j = 0,
        lenStr = 0,
        lenFrom = 0,
        tmpStrictForIn = false,
        fromTypeStr = '',
        toTypeStr = '',
        istr = ''
      var tmpFrom = []
      var tmpTo = []
      var ret = ''
      var match = false

      // Received replace_pairs?
      // Convert to normal from->to chars
      if (typeof fromObj === 'object') {
        for (fr in fromObj) {
          if (fromObj.hasOwnProperty(fr)) {
            tmpFrom.push(fr)
            tmpTo.push(fromObj[fr])
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

      for (i = 0; i < lenStr; i++) {
        match = false
        if (fromTypeStr) {
          istr = str.charAt(i)
          for (j = 0; j < lenFrom; j++) {
            if (istr == fromObj.charAt(j)) {
              match = true
              break
            }
          }
        } else {
          for (j = 0; j < lenFrom; j++) {
            if (str.substr(i, fromObj[j].length) == fromObj[j]) {
              match = true
              // Fast forward
              i = (i + fromObj[j].length) - 1
              break
            }
          }
        }
        if (match) {
          ret += toTypeStr ? to.charAt(j) : to[j]
        } else {
          ret += str.charAt(i)
        }
      }

      return ret
    }
}
