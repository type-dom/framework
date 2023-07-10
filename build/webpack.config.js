// 引入路径管理模块
const path = require('path');
// 引入html打包插件
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  // 入口 (单个入口 或多个入口),现在是单入口
  entry:  './public/example.ts',
  // 出口
  output: {
    // 文件名称（指定名称+目录）
    filename: '[name].js', // '[name].[fullhash:8].js',
    // 输出文件目录（将来所有资源输出的公共目录）
    path: path.resolve(__dirname, '../dist'),
    clean: true,
    // 所有资源引入公共路径前缀 --> 'imgs/a.jpg' --> '/imgs/a.jpg'
    publicPath: '/',
    // library 一般是结合dll使用
    library: {
      // 整个库向外暴露的变量名
      name: 'TypeDom',
      type: 'umd',
    }
  },
  target: 'web',
  resolve: {
    // 配置省略文件路径的后缀名，引用文件时，后缀名就可以省略了
    extensions: ['.js', '.ts', '.tsx'] // '.json', '.css'],
  },
  // 加载器
  module: {
    rules: [
      {
        test: /\.tsx?$/i,
        use: [{
          loader: 'ts-loader'
        }],
        exclude: /node_modules/
      },
      {
        // eslint只检查ts语法
        test: /\.ts$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: path.resolve(__dirname, 'src'), // 指定检查的目录
        // 只检查自己写的js代码不检查第三方库的代码
        exclude: /node_modules/,
        options: { // 这里的配置项参数将会被传递到 eslint 的 CLIEngine
          // formatter: require('eslint-friendly-formatter'), // 指定错误报告的格式规范
          // 自动修复可以修复的错误
          fix: true
        }
      },
      // html图像
      {
        test: /\.html$/,
        loader: 'html-loader'
      },
    ]
  },
  plugins: [
    // 多个html页面
    new HtmlWebpackPlugin({
      template: './public/example.html', // 把哪个html文件打包到dist目录中
      title: 'type dom example .',
      filename: 'index.html', // 输出什么名字
      minify: {
        collapseWhitespace: true,
        removeComments: true,
      },
      hash: true
    }),
  ],
  optimization: {
    moduleIds: 'deterministic', // 未变化的 hash 都应该保持一致
    runtimeChunk: 'single', // 拆包 runtime
    splitChunks: {
      // include all types of chunks
      chunks: 'all',
      minSize: 20000,
      minRemainingSize: 0,
      minChunks: 1,
      maxAsyncRequests: 30,
      maxInitialRequests: 30,
      enforceSizeThreshold: 50000,
      cacheGroups: {
        vendor: { // 拆包 vendors
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
  },
  // 模式   development  production
  mode: process.env.NODE_ENV === 'dev' ? 'development' : 'production',
  // 通过 webpack-dev-server 的这些配置，能够以多种方式改变其行为。
  devServer: {
    client: {
      // 'log' | 'info' | 'warn' | 'error' | 'none' | 'verbose'
      // 允许在浏览器中设置日志级别，例如在重载之前，在一个错误之前或者 热模块替换 启用时。
      logging: 'info',
      // boolean = true object: { errors boolean = true, warnings boolean = true }
      // 当出现编译错误或警告时，在浏览器中显示全屏覆盖。
      overlay: true,
      // 如果你只想显示错误信息：
      // overlay: {
      //   errors: true,
      //   warnings: false,
      // },
      // 在浏览器中以百分比显示编译进度。
      progress: true
    },
    // 启用 webpack 的 热模块替换 特性：
    hot: true,
    // 端口号
    port: 1111,
  },
  devtool: 'eval-cheap-module-source-map' // 忽略列信息的ts源码
};
