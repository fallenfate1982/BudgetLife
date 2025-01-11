//webpack.config.js

module.exports = {
    mode: 'development',
    entry: './app/main.js',
    output: {
        filename: './bundle.js',
        publicPath: '/'
    },
    module: {
        rules: [
            {
                loader: 'babel-loader',
                test: /\.js$/,
                exclude: /node_modules/
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            }
        ]
    },
    devServer: {
        port: 3000,
        static: {
            directory: __dirname
        },
        hot: true
    }
};
