const path = require('path')
const TerserWebpack = require('terser-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCSSExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')

module.exports = {
  entry: './src/js/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, './dist'),
    clean: true,
  },
  devtool: 'source-map',
  mode: 'development',
  plugins: [
    new HtmlWebpackPlugin({
      title: 'keyboard',
      // webpack 파일 기준 상대경로에 위치한 index.html을 사용한다.
      template: './index.html',
      // js파일을 build했을때 bundle.js파일을 body에 넣어줄거냐 head에 넣어줄거냐 설정 가능 (기본적으로 head에 inject된다.)
      inject: 'body',
    }),
    new MiniCSSExtractPlugin({ filename: 'style.css' }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCSSExtractPlugin.loader, 'css-loader'],
      },
    ],
  },
  devServer: {
    host: 'localhost',
    port: '8080',
    open: true,
    watchFiles: 'index.html',
  },
  optimization: {
    minimizer: [new TerserWebpack(), new CssMinimizerPlugin()],
  },
}
