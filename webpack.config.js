const path = require('path')

const baseConf = {
  mode: process.env.NODE_ENV ? process.env.NODE_ENV : 'development',
  entry: {
    'doot-utils': path.resolve(__dirname, 'src', 'index.js'),
    'doot-utils.core': path.resolve(__dirname, 'src', 'core.js')
  }
}

const confUmd = Object.assign({}, baseConf, {
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    library: 'DootUtils',
    libraryTarget: 'umd',
    umdNamedDefine: true
  }
})

const confCommon = Object.assign({}, baseConf, {
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].common.js',
    library: 'DootUtils',
    libraryTarget: 'commonjs2'
  }
})

module.exports = [confUmd, confCommon]
