const express = require('express');
const { MongoClient, ObjectID } = require('mongodb');
const debug = require('debug')('server:bookRoutes');

const bookRouter = express.Router();

function router (nav) {
    bookRouter.use((req, res, next) => {
        // more like: req.user.admin, req.user.roles
        if (req.user) {
            next();
        } else {
            res.redirect('/');
        }
    });

    bookRouter.route('/')
        .get((req, res) => {
            const url = 'mongodb://localhost:27017';
            const dbName = 'libraryApp';

            (async function mongo() {
                let client;
                try {
                    client = await MongoClient.connect(url);
                    debug('Connected correctly to server');

                    const db = client.db(dbName);

                    const col = await db.collection('books');

                    const books = await col.find().toArray();

                    res.render(
                        'bookListView',
                        {
                            nav,
                            title: 'Stories',
                            books
                        }
                    );
                } catch (err) {
                    debug(err.stack);
                }
                client.close();
            }());
    });

    bookRouter.route('/:id')
        .get((req, res) => {
            const {id} = req.params;
            const url = 'mongodb://localhost:27017';
            const dbName = 'libraryApp';

            (async function mongo (){
                let client;
                try {
                    client = await MongoClient.connect(url);
                    debug('Connected correctly to server');

                    const db = client.db(dbName);

                    const col = await db.collection('books');

                    const book = await col.findOne({_id: new ObjectID(id)});
                    debug(book);

                    res.render(
                        'bookView',
                        {
                            nav,
                            title: 'Stories',
                            book
                        }
                    );
                } catch (err) {
                    debug(err.stack);
                }
            }());
        });

    return bookRouter;
}

module.exports = router;
