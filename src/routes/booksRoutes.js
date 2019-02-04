const express = require('express');
const { MongoClient } = require('mongodb');
const debug = require('debug')('server:bookRoutes');

const bookRouter = express.Router();

function router (nav) {

    const books = [
        {
            userId: 1,
            id: 1,
            title: "quidem molestiae enim"
        },
        {
            userId: 1,
            id: 2,
            title: "sunt qui excepturi placeat culpa"
        },
        {
            userId: 1,
            id: 3,
            title: "omnis laborum odio"
        },
        {
            userId: 1,
            id: 4,
            title: "non esse culpa molestiae omnis sed optio"
        },
        {
            userId: 1,
            id: 5,
            title: "eaque aut omnis a"
        }
    ];

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
            res.render(
                'bookView',
                {
                    nav,
                    title: 'Stories',
                    book: books[id]
                }
            );
        });

    return bookRouter;
}

module.exports = router;
