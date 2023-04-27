const path = require("path");

module.exports = {
    // entry: "./src/index.ts",
    entry: {
        content: ["./src/content/index.ts"],
        background: ["./src/background/index.ts"]
    },
    devtool: "inline-source-map",
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: "ts-loader",
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"]
    },
    output: {
        filename: "[name].js",
        path: path.resolve(__dirname, "dist")
    }
};