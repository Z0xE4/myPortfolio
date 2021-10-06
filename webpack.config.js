const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const isDev = process.env.NODE_ENV === 'development'
const isProd = !isDev
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

const filename = (ext) => isDev ? `[name].${ext}` : `[contenthash].bundle.${ext}`

module.exports = {
    context: path.resolve(__dirname, 'src'),
    mode: 'development',
    entry: ["@babel/polyfill", './index.js'],
    output: {
        filename: `./js/${filename('js')}`,
        path: path.resolve(__dirname, 'dist'),
        assetModuleFilename: () => isDev ? 'img/[name][ext]' : 'img/[hash][ext]',

    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src')
        },
        extensions: [".js", ".ts", ".jsx", ".scss"]
    },
    devServer: {
        historyApiFallback: true,
        contentBase: path.resolve(__dirname, 'dist'),
        open: true,
        compress: true,
        hot: false,
        port: 8822,
        disableHostCheck: true,
    },
    plugins: [
        new HTMLWebpackPlugin({
            template: path.resolve(__dirname, 'src/index.html'),
            filename: 'index.html',
            minify: {
                collapseWhitespace: isProd
            }
        }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: `./css/${filename('css')}`,
        }),
        new UglifyJsPlugin({
            cache: true,
            parallel: true
          }),
          new OptimizeCSSAssetsPlugin({})
    ],
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: [isDev ? 'style-loader' : MiniCssExtractPlugin.loader, 'css-loader']
            },
            {
                test: /\.scss$/i,
                use: [isDev ? 'style-loader' : MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
            },
            {
                test: /\.html$/,
                use: ['html-loader']
            },
            {
                test: /\.(?:|gif|png|jpg|jpeg|svg)$/,
                type: 'asset/resource',
                use: [
                    { 
                        loader:'image-webpack-loader',
                        options:{ 
                            mozjpeg:{ 
                                progressive:true,
                                quality:80
                            },
                            optipng:{ enabled: false },
                            pngquant:{ quality: [ 0.80, 0.90 ], speed:4 },
                            gifsicle:{ interlaced: false },
                            webp:{ quality: 80 }
                        }
                    }
                ]
            },
            {
                test: /\.(ttf|woff|woff2|eot)$/,
                loader: 'file-loader',
                options: {
                    outputPath: 'fonts',
                }
            },
            {
                test: /\.(webm|mp4|avi)$/,
                loader: 'file-loader',
                options: {
                    outputPath: 'video',
                }
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader",
                options: {
                    presets: ["@babel/preset-env"]
                }
            },
            {
                test: /\.jsx$/,
                exclude: /node_modules/,
                loader: "babel-loader",
                options: {
                    presets: ["@babel/preset-env", "@babel/preset-react"]
                }
            }
        ]
    }
}