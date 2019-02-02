const express = require('express');
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

    bookRouter.route('/').get((req, res) => {
        res.render(
            'bookListView',
            {
                nav,
                title: 'Stories',
                books
            }
        );
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