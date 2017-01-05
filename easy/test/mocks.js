module.exports = {
    entityManager: require( 'easy/test/entitymanager.mock' ),
    request: require( 'easy/test/request.mock' ),
    response: require( 'easy/test/response.mock' ),
    fakeAsync: require( 'easy/test/fakeAsync.mock' ),
    directory: require( 'easy/test/directory.mock' ),
    logger: require( 'easy/test/logger.mock' ),
    logWriter: require( 'easy/test/logwriter.mock' ),
    logFileManager: require( 'easy/test/logfilemanager.mock' ),
    tokenManager: require( 'easy/test/tokenmanager.mock' ),
    authorization: require( 'easy/test/authorization.mock' )
}
