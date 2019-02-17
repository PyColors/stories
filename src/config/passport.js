const passport = require('passport')
require('./strategies/local.stategy')()

module.exports = function passportConfig(app) {
 app.use(passport.initialize())
 app.use(passport.session())

 // Store the user in the session
 passport.serializeUser((user, done) => {
  done(null, user)
 })

 // Retrieves user from the session
 passport.deserializeUser((user, done) => {
  done(null, user)
 })
}
