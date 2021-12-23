const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

const isDevelopment = process.env.NODE_ENV !== 'production';

module.exports = {
    mode: isDevelopment ? 'development' : 'production',
    devtool: isDevelopment ? 'eval-source-map' : 'source-map',
    entry: path.resolve(__dirname, 'src', 'index.tsx'),
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
    },
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
    },
    devServer: {
        // contentBase: path.resolve(__dirname, 'public'),
        //Ou o código abaixo abaixo, no princípio, o código acima não funcionou com o yarn webpack serve
        static: {
            directory: path.join(__dirname, "public/"),
        },
        hot: true,
    },
    plugins: [
        isDevelopment && new ReactRefreshWebpackPlugin(),
        new htmlWebpackPlugin({
            template: path.resolve(__dirname, 'public', 'index.html'),
        })
    ].filter(Boolean),
    module: {
        rules: [
            {
                test: /\.(j|t)sx$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        plugins: [
                            isDevelopment && require.resolve('react-refresh/babel')
                        ].filter(Boolean),
                    }
                },
            },
            {
                test: /\.scss$/, // trocar css para scss e style files de .css para .scss 
                exclude: /node_modules/,
                use: ['style-loader', 'css-loader', 'sass-loader'],
                //install yarn add style-loader css-loader para trabalhar somente com css puro
                // install yarn add sass-loader para trabalhar sass antes deve também install yarn add node-sass
            }
        ],
    }
}

