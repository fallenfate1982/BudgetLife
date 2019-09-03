//webpack.config.js

module.exports = {
    entry: './app/main.js',
    output: {
        filename: './bundle.js'
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
                use: ['css-loader'],
              }
        ]
    },
    devServer: {
        port: 3000
    }
};