const webpack = require("webpack")
const process = require('process')
const path = require('path')


const base = path.resolve(__dirname, "../")




function dll_config() {
  return {
    entry: {
      'react': ['zepto',  'react', 'react-dom', 'qs', 'url-parse', 'redux', 'react-redux', 'redux-thunk', 'babel-polyfill', 'md5', 'underscore']
    },
    output: {
      path: path.join(base, "dist/js"),
      filename: "[name].js",
      library: "[name]_[hash]"
    },
    plugins: [
      new webpack.DllPlugin({
        path: path.resolve(base, 'dist/js/[name]-manifest.json'),
        name: '[name]_[hash]',
      })
    ]
  }
}


function dev_config(entry, options) {
  const defaultOptions = {
  }
  const conf = {
    devtool: "#source-map",
    entry: [path.resolve(base, 'src/entry/' , entry)],
    output: {
      path: path.resolve(base , "dist"),
      filename: "js/" + entry + ".js"
    },
    plugins: [
      new webpack.DllReferencePlugin({
        context: process.cwd(),
        manifest: require( path.resolve(base , 'dist/js/react-manifest.json') )
      })
    ],
    module: {
      loaders: [
        {
          test: /\.js$/,
          exclude: /(node_modules|bower_components)/,
          loaders: ['babel-loader'], // 'babel-loader' is also a legal name to reference
        }, {
          test: /\.styl$/,
          loader: 'style-loader!css-loader!stylus-loader'
        },
        {
          test : /\.sass$/,
          loader : 'style-loader!css_loader!sass-loader'
        },
        {
          test: /\.(png|gif|jpg|ico)$/,
          exclude: /(node_modules|bower_components)/,
          loader: 'url?limit=100000'
        },
        { test: /\.css$/, loader: "style-loader!css-loader" },
      ]
    },
    resolve: {
      modules : ['node_modules', path.resolve(base, 'src')]
    }
  }

  return conf
}


module.exports = {
  dll_config,
  dev_config
}