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
    this.mkdir('static/articles');
    this.mkdir('static/layouts');
    this.mkdir('static/pages');
    this.mkdir('static/public');
    this.mkdir('static/public/style');

    this.copy('_package.json', 'package.json');
    this.copy('_gitignore',    '.gitignore');
    this.copy('_server.js',    'server.js');

    this.copy('_feed-description.json', 'static/feed-description.json');

    this.copy('layouts/layout.html',   'static/layouts/layout.html');
    this.copy('layouts/single.html',   'static/layouts/single.html');
    this.copy('layouts/multiple.html', 'static/layouts/multiple.html');

    this.copy('style/main.css',          'static/public/style/main.css');
    this.copy('style/bootstrap.min.css', 'static/public/style/bootstrap.min.css');

    this.mkdir('static/pages/about');
    this.copy('about/info.json',  'static/pages/about/info.json');
    this.copy('about/content.md', 'static/pages/about/content.md');
};