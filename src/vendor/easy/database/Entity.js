export default class Entity {
    constructor( database ) {
        this._database = database
    }

    get database() {
        return this._database
    }
}
