const express = require('express');
const { MongoClient } = require('mongodb');
const debug = require('debug')('server:authRoutes');
// manage user obj in session
const passport = require('passport');

const authRouter = express.Router();

function router(nav) {
  authRouter.route('/signUp').post((req, res) => {
    const { username, password } = req.body;
    const url = 'mongodb://localhost:27017';
    const dbName = 'libraryApp';
    (async function addUser() {
      let client;
      try {
        client = await MongoClient.connect(url);
        debug('Connected correctly to the server');

        // connect to database
        const db = client.db(dbName);

        // connect to user collection
        const col = db.collection('users');
        const user = { username, password };
        const results = await col.insertOne(user);
        debug(results);

        /* Create a user */
        // login comes from to passport.initialize()
        // ops[] is the user from debug console
        req.login(results.ops[0], () => {
          res.redirect('/auth/profile');
        });
      } catch (err) {
        debug(err);
      }
    })();
  });

  authRouter
    .route('/signin')
    .get((req, res) => {
      res.render('signin', {
        nav,
        title: 'signIn',
      });
    })
    // passport uses authenticate by the local one, no fb, twiter, et.
    .post(
      passport.authenticate('local', {
        /* Options */
        // if he does work
        successRedirect: '/auth/profile',

        // if he does not work
        failureRedirect: '/',
      })
    );

  authRouter
    .route('/profile')
    .all((req, res, next) => {
      if (req.user) {
        next();
      } else {
        res.redirect('/');
      }
    })
    .get((req, res) => {
      res.json(req.user);
    });

  return authRouter;
}

module.exports = router;
