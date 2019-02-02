const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('server');
const morgan = require('morgan');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;
const bookRouter = require('./src/routes/booksRoutes');

app.use(morgan('tiny'));
app.use(express.static(path.join(__dirname, '/public')));
app.use('/css', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/js')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/jquery/dist')));
app.set('views', './src/views');
app.set('view engine', 'ejs');

app.use('/books', bookRouter);
app.get('/', (req, res) => {
  res.render(
  'index',
   {
    nav: [{ link: '/books', title: 'Books' },
        {link: "/authors", title: "Authors"}],
    title: 'Stories'
    }
   );
});

app.listen(port, () => {
  debug(`listening on port ${chalk.green(port)}`);
});
