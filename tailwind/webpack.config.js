const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlPlugin = require('html-webpack-plugin');
const { DefinePlugin } = require('webpack');
const path = require('path');
const glob = require('glob');
const fs = require('fs');

// fs.rmSync('./build', { recursive: true, force: true });

const entries = {
  'tailwind-many-classes': './tailwind-many-classes/index.js',
  'modules-many-classes': './modules-many-classes/index.js',
  'tailwind-lazy-loading': './tailwind-lazy-loading/index.js',
  'modules-lazy-loading': './modules-lazy-loading/index.js',
  'tailwind-ds': './tailwind-ds/index.js',
  'modules-ds': './modules-ds/index.js',
  'combined-ds': './combined-ds/index.js',
};

module.exports = Object.entries(entries).map(([key, value]) => ({
  target: ['web', 'es2022'],

  mode: 'production',

  entry: value,

  output: {
    path: path.join(__dirname, 'build', key),
    filename: '[name].js',
  },

  module: {
    rules: [
      {
        test: /\.scss$/i,
        exclude: /\.module\.scss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  require('tailwindcss')({
                    content: [`./${key}/**/*.js`],
                    theme: {},
                    corePlugins: {
                      preflight: false,
                    },
                  }),
                ],
              },
            },
          },
          'sass-loader',
        ],
      },
      {
        test: /\.module\.scss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: {
                namedExport: false,
              },
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  require('tailwindcss')({
                    content: [`./${key}/**/*.js`],
                    theme: {},
                    corePlugins: {
                      preflight: false,
                    },
                  }),
                ],
              },
            },
          },
          'sass-loader',
        ],
      },
    ],
  },

  plugins: [
    new MiniCssExtractPlugin(),
    new HtmlPlugin({
      allAssets: JSON.stringify(Object.keys(entries).map(it => [`/${it}/index.html`, `/${it}/ssg.html`]).flat()),
      template: './template.html',
      asset: key,
    }),
  ],
}));
