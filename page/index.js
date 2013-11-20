'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');
var _ = require('underscore.string');

var PageGenerator = module.exports = function PageGenerator(args, options, config) {
	// By calling `NamedBase` here, we get the argument to the subgenerator call
	// as `this.name`.
	yeoman.generators.NamedBase.apply(this, arguments);

	console.log('You called the page subgenerator with the argument ' + this.name + '.');
};

util.inherits(PageGenerator, yeoman.generators.NamedBase);

PageGenerator.prototype.askFor = function askFor() {
    var cb = this.async();

    // have Yeoman greet the user.
    console.log(this.yeoman);

    var prompts = [{
        name: 'slug',
        message: 'What slug do you want for you page?',
        default: _.slugify(this.name)
    }];

    this.prompt(prompts, function (props) {
        this.slug = _.slugify(props.slug);

        cb();
    }.bind(this));
};

PageGenerator.prototype.files = function files() {
    this.mkdir('static/pages/' + this.slug);
    this.copy('_info.json',  'static/pages/' + this.slug + '/info.json');
    this.copy('_content.md', 'static/pages/' + this.slug + '/content.md');

	console.log('Creating', this.name, this.slug);
};
