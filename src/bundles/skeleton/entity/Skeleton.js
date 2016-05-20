/*
 * Skeleton model
 */
import Entity from './../../../vendor/easy/core/Entity'

export default class Skeleton extends Entity {
    constructor( skeletonFactory ) {
        super( skeletonFactory )

        return this.database.Model.extend({
            tableName: 'skeletons'
        })
    }
}
