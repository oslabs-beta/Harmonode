import HtmlWebpackPlugin = require("html-webpack-plugin");
export let entry: string;
export let mode: string | undefined;
export namespace output {
    let path: string;
    let filename: string;
}
export namespace module {
    let rules: ({
        test: RegExp;
        exclude: RegExp;
        use: {
            loader: string;
            options: {
                presets: string[];
            };
        };
    } | {
        test: RegExp;
        exclude: RegExp;
        use: string;
    } | {
        test: RegExp;
        use: string[];
        exclude?: undefined;
    })[];
}
export namespace resolve {
    let extensions: string[];
}
export let plugins: HtmlWebpackPlugin[];
export namespace devServer {
    namespace historyApiFallback {
        let index: string;
    }
}
