export * from './config/routes'
export { RoleController as controller } from './controllers/RoleController'


// import RoleController   from './controllers/RoleController'
// import security			from './config/security'
// import Authorization    from '~/vendor/easy/authentication/Authorization'
//
// const authorization = new Authorization()
//
// /**
//  * routing - define routes for role bundle
//  *
//  * @param  {express.Router} router
//  */
// export default function routing( router ) {
//     /*
//      * Dependencies
//      */
//     let roleController
//
//     /*
//      * Register request and response into Controller
//      */
//     router.use( ( req, res, next ) => {
//         roleController = new RoleController( req, res )
//         next()
//     })
//
//     /*
//      * Security
//      */
//     router.use( '/roles', ( req, res, next ) => {
//         authorization.authorized({
//             controller: roleController,
//             restrictions: security[ '/roles '],
//             focus: 'role_id',
//             next
//         })
//     })
//
//     /*
//      * Middlewares
//      */
//     router.param( 'role_id', ( req, res, next ) => {
//         roleController.roleExists( next )
//     })
//
//     /*
//      * Routes definitions
//      */
//     router
// 		.route( '/roles' )
//         	.get( () => roleController.getRoles() )
//     		.post( () => roleController.createRole() )
//     		.all( () => roleController.response.methodNotAllowed() )
//
//     router
// 		.route( '/roles/:role_id' )
//         	.get( () => roleController.getRole() )
//         	.put( () => roleController.updateRole() )
//         	.delete( () => roleController.deleteRole() )
//         	.all( () => roleController.response.methodNotAllowed() )
// }
