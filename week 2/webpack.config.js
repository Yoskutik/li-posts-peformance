const HtmlPlugin = require('html-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");
const { DefinePlugin } = require('webpack');
const path = require('path');
const glob = require('glob');

const entries = glob.sync('./js/*.js').reduce((acc, file) => {
  acc[file.match(/js\/(.+)\.js/)[1]] = `./${file}`;
  return acc;
}, {});

module.exports = (_argv, { env: { styles } }) => ({
  target: ['web', 'es2022'],

  mode: 'production',

  entry: entries,

  module: {
    rules: [
      {
        test: /\.scss$/i,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[hash:base64:4]',
                namedExport: false,
              },
            },
          },
          'sass-loader',
        ],
      },
    ],
  },

  output: {
    path: path.join(__dirname, 'build'),
    filename: '[name].js',
    clean: true,
  },

  plugins: [
    new CopyPlugin({
      patterns: [
        "html",
      ],
    }),

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
