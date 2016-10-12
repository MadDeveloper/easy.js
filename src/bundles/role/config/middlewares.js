export default {
    '/roles/:role_id': {
        roleExists: {
            param: 'role_id',
            middleware: 'roleExists'
        }
    }
}
