const Dotenv = require("dotenv-webpack");
const path = require("path");

module.exports = () => {
    return {
        plugins: [new Dotenv()],
        entry: {
            content: ["./src/content/index.ts"],
            background: ["./src/background/index.ts"],
            popup: ["./src/actions/popup.ts"]
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
};
