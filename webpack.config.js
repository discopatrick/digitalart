var path = require('path');

module.exports = {
  entry: [
    // Set up an ES6-ish environment
    'babel-polyfill',

    // Add your application's scripts below
    './app/index.js',
  ],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/dist/'
  },
  devServer: {
    compress: true,
    port: 9000
  },
  module: {
    rules: [
      {
        loader: "babel-loader",

        // Skip any files outside of your project's `app` directory
        include: [
          path.resolve(__dirname, "app"),
        ],

        // Only run `.js` and `.jsx` files through Babel
        test: /\.jsx?$/,

        // Options to configure babel with
        query: {
          plugins: ['transform-runtime']
        }
      }
    ]
  }
};
