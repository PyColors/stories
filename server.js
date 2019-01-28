var express = require('express');
var chalk = require('chalk');
var debug = require('debug')('server');
var morgan = require('morgan');
var path = require('path');

var app = express();

app.use(morgan('tiny'));
app.use(express.static(path.join(__dirname, '/public')));
app.use('/css', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/js')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/jquery/dist')));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'views/index.html'));
})

app.listen(3000, function () {
    debug(`listening on port ${chalk.green('3000')}`);
});
