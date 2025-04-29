// webpack.config.js
module.exports = {
  //...
  module: {
    rules: [
      {
        test: /\.js$/,
        use: "source-map-loader",
        enforce: "pre",
        // Add `exclude` to ignore the specific module
        exclude: /node_modules\/react-datepicker/,
      },
    ],
  },
  // You might also want to set devtool to false or a different source map setting
  devtool: false, // Options: 'source-map', 'inline-source-map', or false
};
