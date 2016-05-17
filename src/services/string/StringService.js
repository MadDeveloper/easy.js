import Service from './../../vendor/easy/core/Service'

export default class StringService extends Service {
    constructor( container ) {
        super( container )
    }

    load() {}

    strtr( str, from, to ) {
      var fr = '',
        i = 0,
        j = 0,
        lenStr = 0,
        lenFrom = 0,
        tmpStrictForIn = false,
        fromTypeStr = '',
        toTypeStr = '',
        istr = '';
      var tmpFrom = [];
      var tmpTo = [];
      var ret = '';
      var match = false;

      // Received replace_pairs?
      // Convert to normal from->to chars
      if (typeof from === 'object') {
        for (fr in from) {
          if (from.hasOwnProperty(fr)) {
            tmpFrom.push(fr);
            tmpTo.push(from[fr]);
          }
        }

        from = tmpFrom;
        to = tmpTo;
      }

      // Walk through subject and replace chars when needed
      lenStr = str.length;
      lenFrom = from.length;
      fromTypeStr = typeof from === 'string';
      toTypeStr = typeof to === 'string';

      for (i = 0; i < lenStr; i++) {
        match = false;
        if (fromTypeStr) {
          istr = str.charAt(i);
          for (j = 0; j < lenFrom; j++) {
            if (istr == from.charAt(j)) {
              match = true;
              break;
            }
          }
        } else {
          for (j = 0; j < lenFrom; j++) {
            if (str.substr(i, from[j].length) == from[j]) {
              match = true;
              // Fast forward
              i = (i + from[j].length) - 1;
              break;
            }
          }
        }
        if (match) {
          ret += toTypeStr ? to.charAt(j) : to[j];
        } else {
          ret += str.charAt(i);
        }
      }

      return ret;
    }

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
