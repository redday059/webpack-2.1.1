var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HTMLWebpackPlugin = require('html-webpack-plugin');
var autoprefixer = require('autoprefixer')

var DEVELOPMENT = process.env.NODE_ENV === 'development';
var PRODUCTION = process.env.NODE_ENV === 'production';

var entry = PRODUCTION
    ?   ['./src' ]
    :   [
            './src',
            'webpack/hot/dev-server',
            'webpack-dev-server/client?http://localhost:8080'
        ];

var plugins = PRODUCTION
    ?   [
            new webpack.optimize.UglifyJsPlugin(),
            new ExtractTextPlugin('style-[contenthash:10].css'),
            new HTMLWebpackPlugin({
                template: 'index-template.html'
            })
        ]
    :   [
            new ExtractTextPlugin('style.css'),
            new webpack.HotModuleReplacementPlugin()
        ];

plugins.push(
    new webpack.DefinePlugin({
        DEVELOPMENT: JSON.stringify(DEVELOPMENT),
        PRODUCTION: JSON.stringify(PRODUCTION)
    })
);

// const cssIdentifier = PRODUCTION ? '[hash:base64:10]' : '[path][name]---[local]';
const cssIdentifier = PRODUCTION ? '[hash:base64:10]' : '[local]';

// const cssLoader = PRODUCTION
//     ?	ExtractTextPlugin.extract({
//             use: 'css-loader?minimize&localIdentName=' + cssIdentifier
//         })
//     : 	['style-loader', 'css-loader?localIdentName=' + cssIdentifier];

const cssLoader = ExtractTextPlugin.extract({
    loader: 'css-loader?minimize&localIdentName=' + cssIdentifier
});


module.exports = {
    devtool: 'source-map',
    entry: entry,
    plugins: plugins,
    // for SIDE LOADING modules (for third party modules)
    externals: {
        jquery: 'jQuery' //jquery is external and available at the global variable jQuery
    },
    module: {
        rules: [{
            test: /\.js$/,
            use: ['babel-loader'],
            exclude: '/node_modules/'
        }, {
            test: /\.(png|jpg|jpeg|gif)$/,
            use: ['url-loader?limit=10000&name=images/[hash:16].[ext]'],
            exclude: /node_modules/
        }, {
            test: /\.css$/,
            use: cssLoader,
            exclude: /node_modules/
        }]
    },
    output: {
        path: path.join(__dirname, 'dist'),
        publicPath: PRODUCTION ? '/' : '/dist/',
        filename: PRODUCTION ? 'bundle.[hash:12].min.js' : 'bundle.js'
    }
};
