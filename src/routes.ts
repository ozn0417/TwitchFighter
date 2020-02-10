module.exports = function (app) {
    app.use('/user', require('./controllers/stream'));
    app.use('/bets', require('./controllers/bets'));
    app.use('/user', require('./controllers/user'));    
}
