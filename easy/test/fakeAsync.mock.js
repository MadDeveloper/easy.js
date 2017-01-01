module.exports = cb => {
    return done => {
        cb()
        setTimeout( done, 0 )
    }
}
