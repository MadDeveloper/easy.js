import Entity from './../../../vendor/easy/database/Repository'

export default class SkeletonRepository extends Repository {
    constructor( database ) {
        super( database )
    }

    readAll( options ) {
        let skeletons = this.getCollection()
        return skeletons.forge().fetch( options )
    }

    read( id, options ) {
        return this.getModel().forge({ id }).fetch( options )
    }

    save( skeleton, params, options = {} ) {
        new Promise( ( resolve, reject ) => {
            this.database.transaction( t => {
                options.transacting = t

                skeleton.save({

                }, options )
                .then( skeleton => {
                    t.commit()
                    resolve( skeleton )
                })
                .catch( error => {
                    t.rollback()
                    reject( error )
                })
            })
        })
    }

    patch( skeleton, patch, options ) {
        let patchToApply = {}

        patchToApply[ patch.path.substring( 1 ) ] = patch.value

        return skeleton.save( patchToApply, options )
    }

    delete( skeleton, options ) {
        return skeleton.destroy( options )
    }
}
