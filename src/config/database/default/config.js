module.exports = {
    client: 'mysql',
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'prepapp',
    charset: 'utf8',
    enableDaemon: false,
    intervalToTryingReconnect: 5000,
    intervalToCheckConnection: 15000,
    maxAttempsReconnect: Infinity
}
