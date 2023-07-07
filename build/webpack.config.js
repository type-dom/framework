/*
 * @功能描述:
 */
const { merge }  = require('webpack-merge');
const baseConfig = require('./webpack.base.config');
const devConfig = require('./webpack.dev.config');

// const config = process.env.NODE_ENV === 'development' ? devConfig : proConfig

module.exports = (env, argv) => {
  let config = devConfig ;
  return merge(baseConfig, config);
};
