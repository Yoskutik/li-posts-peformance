const HtmlPlugin = require('html-webpack-plugin');
const { DefinePlugin } = require('webpack');
const path = require('path');
const glob = require('glob');

const entries = glob.sync('./js/*.js').reduce((acc, file) => {
  acc[file.match(/js\/(.+)\.js/)[1]] = `./${file}`;
  return acc;
}, {});

module.exports = (_argv) => ({
  target: ['web', 'es2022'],

  mode: 'production',

  entry: entries,

  output: {
    path: path.join(__dirname, 'build'),
    filename: '[name].js',
    clean: true,
  },

  plugins: [
    ...Object.keys(entries).map(key => (
      new HtmlPlugin({
        template: './template.html',
        filename: `${key}.html`,
        inject: false,
        asset: key,
      })
    )),
  ],
});
