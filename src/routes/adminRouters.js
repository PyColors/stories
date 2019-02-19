const express = require('express');
const { MongoClient } = require('mongodb');
const debug = require('debug')('server:adminRoutes');

const adminRouter = express.Router();
const books = [
  {
    userId: 1,
    id: 1,
    title: 'quidem molestiae enim',
    bookId: 656,
  },
  {
    userId: 1,
    id: 2,
    title: 'sunt qui excepturi placeat culpa',
    bookId: 24280,
  },
  {
    userId: 1,
    id: 3,
    title: 'omnis laborum odio',
  },
  {
    userId: 1,
    id: 4,
    title: 'non esse culpa molestiae omnis sed optio',
  },
  {
    userId: 1,
    id: 5,
    title: 'eaque aut omnis a',
  },
];

/**
 *
 * @returns {*}
 */
function router() {
  adminRouter.route('/').get((req, res) => {
    const url = 'mongodb://localhost:27017';
    const dbName = 'libraryApp';

    (async function mongo() {
      let client;
      try {
        client = await MongoClient.connect(url);
        debug('Connected correctly to server');

        const db = client.db(dbName);

        const response = await db.collection('books').insertMany(books);
        res.json(response);
      } catch (err) {
        debug(err.stack);
      }

      client.close();
    })();
  });

  return adminRouter;
}

module.exports = router;
