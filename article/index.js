'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');
var _ = require('underscore.string');

var ArticleGenerator = module.exports = function ArticleGenerator(args, options, config) {
	// By calling `NamedBase` here, we get the argument to the subgenerator call
	// as `this.name`.
	yeoman.generators.NamedBase.apply(this, arguments);

	console.log('You called the article subgenerator with the argument ' + this.name + '.');
};

util.inherits(ArticleGenerator, yeoman.generators.NamedBase);

ArticleGenerator.prototype.askFor = function askFor() {
	var cb = this.async();

	// have Yeoman greet the user.
	console.log(this.yeoman);

	var prompts = [{
		name: 'slug',
		message: 'What slug do you want for you article?',
		default: _.slugify(this.name)
	}];

	this.prompt(prompts, function (props) {
		this.slug = _.slugify(props.slug);

		cb();
	}.bind(this));
};

ArticleGenerator.prototype.files = function files() {
	this.date = new Date();

	this.mkdir('static/articles/' + this.slug);
	this.copy('_info.json',  'static/articles/' + this.slug + '/info.json');
	this.copy('_content.md', 'static/articles/' + this.slug + '/content.md');

	console.log('Creating', this.name, this.slug);
};
