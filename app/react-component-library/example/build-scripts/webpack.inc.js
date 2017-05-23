const webpack = require("webpack")
const process = require('process')
const path = require('path')


const base = path.resolve(__dirname, "../")




function dll_config_production() {
  return {
    entry: {
      'react': [
        'zepto',  
        'autoprefixer',
        'react', 
        'react-dom', 'qs', 
        'url-parse', 'redux', 'react-redux', 
        'redbox-react', 'react-tap-event-plugin',
        'react-router-dom', 'redux-persist',
        'redux-thunk', 'md5', 'underscore'
        ]
    },
    output: {
      path: path.join(base, "dist/prod/js"),
      filename: "[name].js",
      library: "[name]_[hash]"
    },
    plugins: [
      new webpack.DllPlugin({
        path: path.resolve(base, 'dist/prod/js/[name]-manifest.json'),
        name: '[name]_[hash]',
      }),
      new webpack.optimize.UglifyJsPlugin()
    ]
  }
}




function dll_config() {
  return {
    entry: {
      'react': [
        'zepto',  
        'autoprefixer',
        'react', 
        'react-dom', 'qs', 
        'url-parse', 'redux', 'react-redux', 
        'redbox-react', 'react-tap-event-plugin',
        'react-router-dom', 'redux-persist',
        'redux-thunk', 'md5', 'underscore'
        ]
    },
    output: {
      path: path.join(base, "dist/dev/js"),
      filename: "[name].js",
      library: "[name]_[hash]"
    },
    plugins: [
      new webpack.DllPlugin({
        path: path.resolve(base, 'dist/dev/js/[name]-manifest.json'),
        name: '[name]_[hash]',
      }),
    ]
  }
}


function dev_config(entry, options) {
  const defaultOptions = {
  }
  const conf = {
    devtool: "#source-map",
    entry: ['babel-polyfill', path.resolve(base, 'src/entry/' , entry)],
    output: {
      path: path.resolve(base , "dist/dev"),
      filename: "js/" + entry + ".js"
    },
    plugins: [
      new webpack.DllReferencePlugin({
        context: process.cwd(),
        manifest: require( path.resolve(base , 'dist/dev/js/react-manifest.json') )
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
          test : /\.(sass|scss)$/,
          loader : 'style-loader!css-loader!sass-loader'
        },
        {
          test: /\.(png|gif|jpg|jpeg|ico)$/,
          exclude: /(node_modules|bower_components)/,
          loader: 'file-loader?name=[name]-[hash].[ext]&outputPath=image/&publicPath=/',
        },
        {
          test : /\.less$/, loader : 'style-loader!css-loader!less-loader'
        },
        { test: /\.css$/, loader: "style-loader!css-loader" },
      ]
    },
    resolve: {
      modules : ['node_modules', path.resolve(base, 'src'), path.resolve(base, "../src")],
    }
  }

  return conf
}

function release_config(entry, options) {
  const defaultOptions = {
  }
  const conf = {
    entry: ['babel-polyfill', path.resolve(base, 'src/entry/' , entry)],
    output: {
      path: path.resolve(base , "dist/prod"),
      filename: "js/" + entry + ".js",
    },
    plugins: [
      new webpack.DllReferencePlugin({
        context: process.cwd(),
        manifest: require( path.resolve(base , 'dist/prod/js/react-manifest.json') )
      }),
      new webpack.optimize.UglifyJsPlugin()
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
          test : /\.(sass|scss)$/,
          loader : 'style-loader!css-loader!sass-loader'
        },
        {
          test: /\.(png|gif|jpg|jpeg|ico)$/,
          exclude: /(node_modules|bower_components)/,
          loader: 'file-loader?name=[name]-[hash].[ext]&outputPath=image/&publicPath=/',
        },
        {
          test : /\.less$/, loader : 'style-loader!css-loader!less-loader'
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
  dev_config,
  release_config,
  dll_config_production
}