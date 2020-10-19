const path = require("path");
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

module.exports = {
   target: "node",
   module: {
      rules: [
         {
            test: /.tsx?$/,
            use: "ts-loader",
            exclude: /node_modules/
         }
      ]
   },
   resolve: {
      extensions: [".tsx", ".ts", ".js"]
   },
   entry: [path.join(__dirname, "../src/server.ts")],
   output: {
      path: path.join(__dirname, "../dist"),
      filename: "server.js"
   },
   plugins: [
      new CleanWebpackPlugin()
   ]
};
