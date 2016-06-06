import Entity from './../../../vendor/easy/database/Repository'

export default class SkeletonRepository extends Repository {
    constructor( database ) {
        super( database, {} )
    }

    readAll( options = {} ) {
        let skeletons = this.getCollection()
        return skeletons.forge().fetch( options )
    }

    read( id, options = {} ) {
        return this.getModel().forge({ id }).fetch( options )
    }

    save( skeleton, params, options = {} ) {
        return new Promise( ( resolve, reject ) => {
            this.database.transaction( t => {
                options.transacting = t

                skeleton.save( params, options )
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

    patch( skeleton, patch, options = {} ) {
        return new Promise( ( resolve, reject ) => {
            let patchToApply = {}
            patchToApply[ patch.path.substring( 1 ) ] = patch.value

            options.patch = true

            this.save( skeleton, patchToApply, options )
            .then( resolve )
            .catch( reject )
        })
    }

    delete( skeleton, options = {} ) {
        return new Promise( ( resolve, reject ) => {
            this.database.transaction( t => {
                options.transacting = t

                skeleton.destroy( options )
                .then( resolve )
                .catch( reject )
            })
        })
    }
}
