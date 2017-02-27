/* eslint-disable import/no-extraneous-dependencies */

const merge = require('deepmerge');
const webpack = require('webpack');
const pkg = require('./package.json');

const ENV = process.env.NODE_ENV || 'development';

// process.traceDeprecation = true;
process.noDeprecation = true;

const globals = {
  __DEV__: ENV === 'development',
  __PROD__: ENV === 'production',
  __TEST__: ENV === 'test'
};

module.exports = ({ config }) => {
  // Provide __DEV__ and __PROD__ globals as a shorthand for
  // `NODE_ENV === 'development/production'` checks.
  config
    .plugin('globals')
    .use(webpack.DefinePlugin, globals);

  config.module
    .rule('lint')
    .loader('eslint', props => merge(props, {
      options: {
        plugins: ['import'],
        globals: Object.keys(globals),
        settings: {
          'import/resolver': 'webpack',
          'import/extensions': ['.js', '.jsx'],
          'import/ignore': ['.jsx', '.(scss|css)$']
        },
        rules: {
          'arrow-body-style': 0,
          'arrow-parens': 0,
          'comma-dangle': ['error', 'never'],
          'linebreak-style': 0,
          'import/no-unresolved': 0,
          'import/extensions': 0,
          'import/no-named-as-default': 0
        }
      }
    }));

  config.module
    .rule('compile')
    .loader('babel', props => {
      // Implement support for Webpack 2's `import()` syntax. Note: VSCode does
      // not like this syntax at the moment as it's not yet supported by the
      // typescript language. Try to avoid for now.
      const merged = merge(props, {
        options: {
          plugins: ['syntax-dynamic-import']
        }
      });

      // Provide a custom browser configuration array to babel-preset-env if
      // `browserslist` is provided in `package.json`.
      if (pkg.browserslist) {
        merged.options.presets[0][1].targets.browsers = pkg.browserslist;
      }

      return merged;
    });
};
