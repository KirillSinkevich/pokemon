import webpack from 'webpack'
import path from 'path'
import HtmlWebpackPlugin from 'html-webpack-plugin'

export default {
  entry: ['./src/index.js'],
  output: {
    path: path.resolve('dist'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        resolve: {
          extensions: [".js", ".jsx"]
        },
        use: {
          loader: "babel-loader"
        }
      },
      // {
      //   test: /\.jsx?$/,
      //   exclude: /node_modules/,
      //   use: {
      //       loader: 'babel-loader'
      //   }
      // },
      // {
      //   test: /\.css$/,
      //   use: [
      //       require.resolve('style-loader'),
      //       {
      //         loader: require.resolve('css-loader'),
      //         options: {
      //             importLoaders: 1,
      //         },
      //       },
      //       {
      //         loader: require.resolve('postcss-loader'),
      //         options: {
      //           ident: 'postcss',
      //           plugins: () => [
      //               require('postcss-flexbugs-fixes'),
      //               autoprefixer({
      //                   browsers: [
      //                       '>1%',
      //                       'last 4 versions',
      //                       'Firefox ESR',
      //                       'not ie < 9', // React doesn't support IE8 anyway
      //                   ],
      //                   flexbox: 'no-2009',
      //               }),
      //           ],
      //         },
      //       },
      //   ],
      // },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/index.html',
      inject: 'body'
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
  mode: 'development',
  // mode: 'production',
  devtool: 'source-map',
  // devtool: 'eval-source-map'
}

