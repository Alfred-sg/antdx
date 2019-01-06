module.exports = {
  template: '../examples',
  entry: {
    index: 'examples/index',
    SearchableTable: 'examples/SearchableTable'
  },
  alias: {
    antdx: 'src/antdx.js',
    components: 'src/components'
  },
  module: {
    babel: {
      plugins: [
        [
          require.resolve('babel-plugin-import'),
          {
            "libraryName": "antd",
            "style": 'css'
          }
        ]
      ]
    }
  },
  splitChunks: {}
};