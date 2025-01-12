const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");
const path = require("path");

module.exports = merge(common, {
    mode: "development",
    // Live server
    devtool: "eval-source-map",
    devServer: {
        watchFiles: ["./src/template.html"],
        static: {
            directory: path.join(__dirname, "./dist"),
        },
        hot: true,
        compress: true,
        port: 5500,
        host: "0.0.0.0",
        open: {
            app: {
                name: "google-chrome",
            },
        },
    },
});
