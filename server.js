var express = require('express');
var chalk = require('chalk');

var app = express();

app.get('/', function (req, res) {
    res.send('coco');
})

app.listen(3000, function () {
    console.log('listening on port ' + chalk.green('3000'));
});
