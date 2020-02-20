const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: path.resolve(__dirname, 'src/index'),
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js'
    },
    module: {
        rules: [{
            test: /\.(js|jsx)$/,
            include: path.resolve(__dirname, 'src'),
            use: ['babel-loader']
        },
            {
                test: /\.scss$/,
                use: [
                    {loader: "style-loader"},
                    {loader: "css-loader"},
                    {loader: "sass-loader"}
                ]
            },
            {
                test: /\.(woff(2)?|ttf|eot|svg|jpe?g|png|gif)(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]'
                }
            }
        ]
    },
    devServer: {
        contentBase: path.resolve(__dirname, 'build'),
        port: 9000
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "src/index.html" //source html
        })
    ]
};