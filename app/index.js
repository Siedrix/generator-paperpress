'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');


var PaperpressGenerator = module.exports = function PaperpressGenerator(args, options, config) {
    yeoman.generators.Base.apply(this, arguments);

    this.on('end', function () {
        this.installDependencies({ skipInstall: options['skip-install'] });

        console.log('Paperpress blog ready');
    });

    // this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(PaperpressGenerator, yeoman.generators.Base);

PaperpressGenerator.prototype.askFor = function askFor() {
    var cb = this.async();

    // have Yeoman greet the user.
    console.log(this.yeoman);

    var prompts = [{
        name: 'blogName',
        message: 'What do you want to call your blog?'
    }];

    this.prompt(prompts, function (props) {
        this.blogName = props.blogName;

        cb();
    }.bind(this));
};

PaperpressGenerator.prototype.app = function app() {
    this.mkdir('static');
    this.mkdir('static/snippets');

    this.copy('_package.json', 'package.json');
    this.copy('_gitignore',    '.gitignore');
    this.copy('_server.js',    'server.js');
    this.copy('README.md',     'README.md');

    this.copy('_feed-description.json', 'static/feed-description.json');

    this.directory('themes',   'static/themes');
    this.directory('public',   'static/public');
    this.directory('pages',    'static/pages');
    this.directory('articles', 'static/articles');
};
