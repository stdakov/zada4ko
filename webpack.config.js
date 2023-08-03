const path = require('path');
const glob = require('glob');
const config = require('./package.json')._paths;

const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

const webpack = require("webpack");

const entries = glob.sync(path.join(config.ts.src, '/**/*.ts'), {dot: true})
  .reduce((acc, file) => {
    const accFile = file.replace('\.ts', '')
      .replace(path.resolve(__dirname) + '/', '')
      .replace(config.ts.src.replace('./', ''), '');

    acc[accFile] = file;

    return acc;
  }, {});

module.exports = {
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(s[ac]ss|css)$/i,
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: 'css-loader?-url'
          },
          {
            loader: 'sass-loader',
            options: {
              sassOptions: {
                outputStyle: 'compressed',
                implementation: require.resolve("sass"),
              },
            },
          }
        ]
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg|otf)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'fonts/'
            }
          }
        ]
      }
    ],
  },
  watchOptions: {
    poll: true
  },
  plugins: [
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin(),
    new CleanWebpackPlugin(),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery"
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "src/images"),
          to: path.resolve(__dirname, "public/assets/images")
        },
      ],
      options: {
        concurrency: 100,
      },
    })
  ],
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    plugins: [
      new TsconfigPathsPlugin({configFile: './tsconfig.json'}),
    ]
  },
  externals: [],
  devtool: false,
  entry: entries,
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, config.ts.dest),
    clean: true
  },
  optimization: {
    minimizer: [
      /*new CssMinimizerPlugin({
        parallel: true,
        minimizerOptions: {
          preset: [
            "default",
            {
              discardComments: {removeAll: true},
            },
          ],
        },
      }),*/
    ],
    minimize: true,
    splitChunks: {
      chunks: 'async',
    },
  },
};
