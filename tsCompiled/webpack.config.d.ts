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
    export let historyApiFallback: boolean;
    export namespace _static {
        let directory: string;
    }
    export { _static as static };
    export let port: number;
    export let open: boolean;
    export let hot: boolean;
    export let compress: boolean;
    export let proxy: {
        '/': string;
    };
}
export namespace stats {
    let children: boolean;
}
