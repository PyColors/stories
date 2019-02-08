const express = require('express');
const { MongoClient, ObjectID } = require('mongodb');
const debug = require('debug')('server:authRoutes');

const authRouter = express.Router();

function router() {
    authRouter.route('/signUp')
        .post((req, res) => {
            res.json(req.body);
        });

    return authRouter;
}

module.exports = router;
