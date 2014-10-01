'use strict';
var express = require('express'),
	Paperpress = require('paperpress').Paperpress,
	port = process.argv[2] || 3000;

var server = express();
server.use(express.logger());

var blog = new Paperpress({
	directory : 'static',
	themePath : 'static/layouts',
	basePath  : '/blog',
	articlesPerPage : 15,
	pagesPath : ''
});

blog.attach(server);

server.get('/', function (req, res) {
	res.redirect('/blog');
});

server.listen(port);
console.log('Server running at http://localhost:3000');
