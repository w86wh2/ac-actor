const RAP = "http://127.0.0.1:8100";
const path = require("path");
// const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin')

module.exports = {
    configureWebpack: {
        plugins: [
            // new MonacoWebpackPlugin()
        ]
    },
    pages: {
        index: {
            entry: "./examples/main.js"
        }
    },
    outputDir: "./dist",
    lintOnSave: true,
    productionSourceMap: false,
    chainWebpack: config => {
        const resolve = dir => require("path").join(__dirname, dir);
        config.resolve.alias
            .set("@", resolve("src"))
            .set("assets", resolve("src/assets"))
            .set("components", resolve("src/components"))
            .set("utils", resolve("src/utils"));
        config.module
            .rule("md")
            .test(/\.md/)
            .use("vue-loader")
            .loader("vue-loader")
            .end()
            .use("vue-markdown-loader")
            .loader(path.resolve(__dirname, "./examples/md-loader/index.js"))
            .options({
                compilerOptions: {
                    preserveWhitespace: false
                }
            });
    },
    devServer: {
        host: "0.0.0.0",
        port: 8080,
        https: false,
        disableHostCheck: true,
        open: false,
        proxy: {
            "/api": {
                target: RAP,
                pathRewrite: {
                    "^/api": ""
                }
            }
        }
    }
};
