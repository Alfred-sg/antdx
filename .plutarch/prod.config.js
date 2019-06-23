module.exports = {
  output: {
    library: 'antdx',
    libraryTarget: 'umd'
  },
  externals: {
    'react': 'React',
    'antd': 'antd'
  },
  compress: false,
  devtool: false
};