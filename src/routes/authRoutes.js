const express = require('express');
const { MongoClient, ObjectID } = require('mongodb');
const debug = require('debug')('server:authRoutes');

const authRouter = express.Router();

function router() {
    authRouter.route('/signUp')
        .post((req, res) => {
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
            }());
        });

    authRouter.route('/profile')
        .get((req, res) => {
            res.json(req.user);
        });

    return authRouter;
}

module.exports = router;
