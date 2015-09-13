const yeoman = require('yeoman-generator');
const slug = require('slug');
const path = require('path');

module.exports = yeoman.generators.Base.extend({
  constructor: function constructor() {
    yeoman.generators.Base.apply(this, arguments);

    this.argument('appName', { type: String, required: true });
  },

  initializing: {
    props: function props() {
      const appName = slug(this.appName).toLowerCase();
      this.props = { appName: appName };
    },
  },

  writing: {
    app: function app() {
      this._copyR('actions', 'actions');
      this._copyR('bin', 'bin');
      this._copyR('components', 'components');
      this._copyR('containers', 'containers');
      this._copyR('reducers', 'reducers');
      this._copyR('store', 'store');
      this._copyR('test', 'test');

      this._copyTpl('.babelrc', '.babelrc');
      this._copyTpl('.editorconfig', '.editorconfig');
      this._copyTpl('.eslintrc', '.eslintrc');
      this._copyTpl('.gitignore', '.gitignore');
      this._copyTpl('README.md', 'README.md');

      this._copyTpl('index.html', 'index.html');
      this._copyTpl('index.js', 'index.js');

      this._copyTpl('server.js', 'server.js');
      this._copyTpl('webpack.config.js', 'webpack.config.js');
      this._copyTpl('webpack.config.prod.js', 'webpack.config.prod.js');

      this._writePackageJSON();
    }
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

  _writePackageJSON: function() {
    const pkgFile = 'package.json';
    const appName = this.props.appName;
    const src = this.templatePath(pkgFile);
    const dest = this.destinationPath(path.join(appName, pkgFile));
    const pkgConfig = this.fs.readJSON(src);

    pkgConfig.name = appName;

    this.fs.writeJSON(dest, pkgConfig);
  },

});
