const express = require('express');
const { MongoClient, ObjectID } = require('mongodb');
const debug = require('debug')('server:authRoutes');

const authRouter = express.Router();

function router() {
    authRouter.route('/signUp')
        .post((req, res) => {
            debug(req.body);

            // Create a user
            // login comes from to passport.initialize()
            req.login(req.body, () => {
                res.redirect('/auth/profile');
            });
       //     res.json(req.body);
        });

    authRouter.route('/profile')
        .get((req, res) => {
            res.json(req.user);
        });

    return authRouter;
}

module.exports = router;
