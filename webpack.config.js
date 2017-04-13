var webpack = require('webpack');
var path = require('path');

module.exports = {
  entry: [
    'script-loader!jquery/dist/jquery.min.js', 'script-loader!foundation-sites/dist/js/foundation.min.js', './app/app.jsx'
  ],
  externals: {
    jquery: 'jQuery'
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.ProvidePlugin({'$': 'jquery', 'jQuery': 'jquery'})
  ],
  output: {
    path: path.join(__dirname, "public"),
    filename: 'bundle.js',
    sourceMapFilename: 'bundle.js.map',
    devtoolModuleFilenameTemplate: function (info) {
      return "file:///" + info.absoluteResourcePath;
    }
  },
  resolve: {
    alias: {
      Main: path.resolve(__dirname, 'app/components/Main.jsx'),
      Nav: path.resolve(__dirname, 'app/components/Nav.jsx'),
      Timer: path.resolve(__dirname, 'app/components/Timer.jsx'),
      Countdown: path.resolve(__dirname, 'app/components/Countdown.jsx'),
      CountdownForm: path.resolve(__dirname, 'app/components/CountdownForm.jsx'),
      Controls: path.resolve(__dirname, 'app/components/Controls.jsx'),
      Clock: path.resolve(__dirname, 'app/components/Clock.jsx'),
      applicationStyles: path.resolve(__dirname, 'app/styles/app.scss')
    },
    extensions: [".js", ".jsx"]
  },
  module: {
    loaders: [
      {
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015', 'stage-0']
        },
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/
      }, {
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader'
          }, {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          }, {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
              includePaths: [path.resolve(__dirname, 'node_modules/foundation-sites/scss')]
            }
          }
        ]
      }
    ]
  },
  devServer: {
    publicPath: "/",
    contentBase: path.join(__dirname, "public"),
    port: 3000,
    hot: true,
    inline: true
  },
  devtool: 'cheap-module-eval-source-map'
};
