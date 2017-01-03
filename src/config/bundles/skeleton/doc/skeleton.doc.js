/**
 * getSkeletons - get all skeletons
 *
 * @api {get} /skeletons Get all skeletons
 * @apiName GetSkeletons
 * @apiGroup Skeleton
 *
 *
 * @apiSuccess {Array[Skeleton]} skeletons Return table of skeletons
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     [
 *       {
 *         "id": 1
 *       }
 *     ]
 *
 * @apiUse InternalServerError
 */

/**
 * createSkeleton - create new skeleton
 *
 * @api {post} /skeletons Create a skeleton
 * @apiName CreateSkeleton
 * @apiGroup Skeleton
 *
 * @apiParam {String} property property of new skeleton
 *
 * @apiSuccess (Created 201) {Number} id Id of new skeleton
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 201 Created
 *     {
 *       "id": 2
 *     }
 *
 * @apiUse BadRequest
 * @apiUse InternalServerError
 */

/**
 * getSkeleton - get skeleton by id
 *
 * @api {get} /skeletons/:id Get skeleton by id
 * @apiName GetSkeleton
 * @apiGroup Skeleton
 *
 * @apiSuccess {Number} id Id of skeleton
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "id": 1
 *     }
 *
 * @apiUse NotFound
 * @apiUse InternalServerError
 */

/**
 * updateSkeleton - update skeleton by id
 *
 * @api {put} /skeletons/:id Update skeleton from id
 * @apiName UpdateSkeleton
 * @apiGroup Skeleton
 *
 *
 * @apiParam {String} property New skeleton property
 *
 * @apiSuccess {Number} id Id of skeleton
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "id": 1
 *     }
 *
 * @apiUse NotFound
 * @apiUse BadRequest
 * @apiUse InternalServerError
 */

/**
 * patchSkeleton - patch skeleton by id (following RFC)
 *
 * @api {patch} /skeletons/:id Patch skeleton from id
 * @apiName PatchSkeleton
 * @apiGroup Skeleton
 *
 *
 * @apiParam {String} raw Ops to execute
 *
 * @apiSuccess {Number} id Id of skeleton
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "id": 1
 *     }
 *
 * @apiUse BadRequest
 * @apiUse InternalServerError
 */

/**
 * deleteSkeleton - delete skeleton by id
 *
 * @api {delete} /skeletons/:id Delete skeleton from id
 * @apiName DeleteSkeleton
 * @apiGroup Skeleton
 *
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 204 No Content
 *
 * @apiUse NotFound
 * @apiUse BadRequest
 * @apiUse InternalServerError
 */
