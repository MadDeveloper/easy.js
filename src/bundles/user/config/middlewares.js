export default {
    '/roles/:role_id/users/:user_id': {
        userExists: {
            param: 'user_id',
            middleware: 'userExists'
        }
    }
}
