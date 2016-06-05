export default class Factory {
    constructor( bundle, bundleManager ) {
        this._currentBundle = bundle
        this._bundleManager = bundleManager
    }

    getRepository( repository ) {
        const repositoryClass = require( `${this.getBundlePath()}/entity/${repository.capitalizeFirstLetter()}Repository` ).default /* .default is needed to patch babel exports.default build, require doesn't work, import do */

        return new repositoryClass( this )
    }

    getController( controller ) {
        const controllerClass = require( `${this.getBundlePath()}/controllers/${controller.capitalizeFirstLetter()}Controller` ).default /* .default is needed to patch babel exports.default build, require doesn't work, import do */

        return new controllerClass( this )
    }

    getConfig( config ) {
        const configClass = require( `${this.getBundlePath()}/config/${config}` ).default /* .default is needed to patch babel exports.default build, require doesn't work, import do */

        return configClass( this )
    }

    getBundlePath() {
        return `${this.container.kernel.path.bundles}/${this.currentBundle}`
    }

    /*
     * Getters and setters
     */

    get bundleManager() {
        return this._bundleManager
    }

    get container() {
        return this.bundleManager.container
    }

    get database() {
        return this.container.getComponent( 'Database' ).connection
    }
}
