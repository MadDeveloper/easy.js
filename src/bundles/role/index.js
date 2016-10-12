export * from './config/routes'
export { RoleController as controller } from './controllers/RoleController'

//
// /*
//  * Security
//  */
// router.use( '/roles', ( req, res, next ) => {
//     authorization.authorized({
//         controller: roleController,
//         restrictions: security[ '/roles '],
//         focus: 'role_id',
//         next
//     })
// })
//
// /*
//  * Middlewares
//  */
// router.param( 'role_id', ( req, res, next ) => {
//     roleController.roleExists( next )
// })
