import Factory from './../../vendor/easy/core/Factory'

export default class UserFactory extends Factory {
    constructor( bundleManager ) {
        super( 'user', bundleManager )
    }
}
