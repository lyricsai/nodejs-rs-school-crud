import { fileURLToPath } from "url";
import { dirname, resolve } from "path";
const __dirname = dirname(fileURLToPath(import.meta.url));
console.log(resolve(__dirname, "./dist"));

export default {
    mode: process.env.NODE_ENV === "production" ? "production" : "development",
    entry: "./src/index.ts",
    target: "node",
    output: {
        path: resolve(__dirname, "./dist"),
        filename: "bundle.js",
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: "ts-loader",
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: [".js", ".ts"],
    },
};
