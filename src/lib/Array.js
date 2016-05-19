export default class ArrayLibrary {
    treeView( element, depth ) {
        function applyTabWithDepth( depth ) {
            let tabs = ''

            for ( let i = 0; i <= depth; i++ ) {
                tabs += '    '
            }

            return tabs
        }

        depth = depth || 0

        let nextDepth   = depth + 1
        let tree        = ''

        if ( depth > 0 ) {
            tree += applyTabWithDepth( depth - 1 )
        }

        tree += ( Array.isArray( element ) ) ? '[\n' : '{\n'

        for ( const prop in element ) {
            if ( element.hasOwnProperty( prop ) ) {
                const item = element[ prop ]

                if ( Array.isArray( item ) || ( item instanceof Object && typeof item !== 'function' ) ) {
                    tree += this.treeView( item, nextDepth )
                } else {
                    tree += applyTabWithDepth( depth )
                    
                    if ( !Array.isArray( element ) && element instanceof Object ) {
                        tree += `${prop}: `
                    }

                    tree += ( typeof item === 'function' ) ? '[Function]' : `${item}`
                    tree += ',\n'
                }
            }
        }

        if ( depth > 0 ) {
            tree += applyTabWithDepth( depth - 1 )
        }

        tree += ( Array.isArray( element ) ) ? ']' : '}'

        if ( depth > 0 ) {
            tree += ',\n'
        }

        return tree
    }
}
