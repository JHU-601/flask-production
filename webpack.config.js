module.exports = {
  entry: './app/components/Main.js',
  output: {
    filename: 'public/bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
    ],
  },
}
