'use strict';
var express = require('express'),
    Paperpress = require('paperpress').Paperpress,
    logger = require('morgan'),
    port = process.argv[2] || 3000;

var server = express();
server.use(logger(':status :req[x-real-ip] :method :response-time ms :url'));

var paperpress = new Paperpress({
    directory : 'static',
    themePath : '/static/themes/base',
    basePath  : '/blog',
    pagesPath : '',
    articlesPerPage : 2
});

paperpress.attach(server);

server.get('/', function (req, res) {
    res.redirect('/blog');
});

server.listen(port);
console.log('Server running at http://localhost:3000');
