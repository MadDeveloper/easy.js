module.exports = {
    /*
     * First place your tables with primaries keys
     * then tables with foreign keys
     * because when you will generate database with migrate command
     * if you do inverse, SQL will generate FK_ERROR
     */
    roles: {
        id: {type: 'increments', nullable: false, primary: true},
        name: {type: 'string', maxlength: 255, nullable: false, unique: true},
        slug: {type: 'string', maxlength: 255, nullable: false, unique: true}
    },

    users: {
        id: {type: 'increments', nullable: false, primary: true},
        username: {type: 'string', maxlength: 100, nullable: false},
        email: {type: 'string', maxlength: 255, nullable: false, unique: true},
        password: {type: 'text', fieldtype: 'text', nullable: false},
        role_id: {type: 'integer', nullable: false, unsigned: true, references: 'roles.id', onDelete: 'cascade', onUpdate: 'cascade'}
    }
}
