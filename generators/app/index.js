const yeoman = require('yeoman-generator');
const slug = require('slug');
const path = require('path');

module.exports = yeoman.generators.Base.extend({
  constructor: function constructor() {
    yeoman.generators.Base.apply(this, arguments);

    this.argument('appName', { type: String, required: true });
    this.option('port');
  },

  initializing: {
    props: function props() {
      const appName = slug(this.appName).toLowerCase();
      const port = this.options.port ? this.options.port : 3000;
      this.props = { appName: appName, port: port };
    },
  },

  writing: {
    app: function app() {
      this._copyTpl('_package.json', 'package.json');
      this._copyTpl('npmrc', '.npmrc');
      this._copyTpl('gitignore', '.gitignore');
      this._copy('babelrc', '.babelrc');
      this._copyTpl('README.md', 'README.md');
      this._copyTpl('webpack.config.js', 'webpack.config.js');
      this._copyTpl('server.js', 'server.js');
      this._copyTpl('index.html', 'index.html');
      this._copyTpl('js/index.js', 'js/index.js');

      this._copyR('css', 'css');
      this._copyR('js/actions', 'js/actions');
      this._copyR('js/components', 'js/components');
      this._copyR('js/constants', 'js/constants');
      this._copyR('js/containers', 'js/containers');
      this._copyR('js/store', 'js/store');
      this._copyR('js/data', 'js/data');
      this._copyR('js/reducers', 'js/reducers');
      this._copyR('js/utils', 'js/utils');
    },

    projectfiles: function projectfiles() {
      this._copy('editorconfig', '.editorconfig');
      this._copy('eslintrc', '.eslintrc');
    },

  },

  _copy: function _copy(src, dest) {
    this.fs.copy(
      this.templatePath(src),
      this.destinationPath(path.join(this.props.appName, dest))
    );
  },

  _copyR: function _copyR(src, dest) {
    this.directory(src, path.join(this.props.appName, dest));
  },

  _copyTpl: function _copyTpl(src, dest) {
    this.fs.copyTpl(
      this.templatePath(src),
      this.destinationPath(path.join(this.props.appName, dest)),
      this.props
    );
  },

});
