const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const glob = require('glob'); //The main function is to find matching files
glob.sync("./src/**/*");
const PurgeCssWebpackPlugin = require('purgecss-webpack-plugin');
const AddAssetHtmlCdnWebpackPlugin = require('add-asset-html-cdn-webpack-plugin');
const WebpackCdnPlugin = require('webpack-cdn-plugin');

const cdnConfig = {
    jquery: 'https://code.jquery.com/jquery-3.4.1.min.js'
}
module.exports = (env) => {
	return {
		mode: env, // The env is the script in package.json.
		entry: './src/index.js',
		output: {
			filename: 'bundle.js',
			path: path.resolve(__dirname, 'dist')
        },
        externals: {
            'jquery': '$' //Don't build jquery in code
        },
		module: {
			rules: [
                {
                    test: /\.js/,
                    use: {
                        loader: 'babel-loader',
                        options: { //.babelrc
                            presets: [
                                "@babel/preset-env",
                                "@babel/preset-react"
                            ]
                        }
                    }
                },
                {
                    test: /\.(jpe?g|png|gif)/,
                    use: [{
                        loader: 'file-loader'
                    },
                    env !== "development" && {
                        loader: 'image-webpack-loader',
                        options: {
                            mozjpeg: {progressive: true,
                            quality: 65
                          },
                          // optipng.enabled: false will disable optipng
                          optipng: {
                            enabled: false,
                          },
                          pngquant: {
                            quality: [0.65, 0.90],
                            speed: 4
                          },
                          gifsicle: {
                            interlaced: false,
                          },
                          // the webp option will enable WEBP
                          webp: {
                            quality: 75
                          }
                        }
                    }
                ].filter(Boolean)
                },
				{
					test: /\.css$/,
					use: [ //link
                        env !== 'development' ? MiniCssExtractPlugin.loader : 'style-loader', 'css-loader' ]
				}
			]
        },
        optimization: {
            usedExports: true //Which module was used
        },
        plugins: [
            env !== 'development' && new MiniCssExtractPlugin(),
            new HtmlWebpackPlugin({
                template: './src/index.html',
                filename: 'index.html'
            }), 
            new PurgeCssWebpackPlugin({
                paths: glob.sync('./src/**/*', { nodir:true })
            }),
            //Add CDN plugin
            new AddAssetHtmlCdnWebpackPlugin(true, cdnConfig),
            // new WebpackCdnPlugin({
            //     modules: {
            //         'jquery': {
            //             name: 'jquery',
            //             var: 'jquery',
            //             path: 'https://code.jquery.com/jquery-3.4.1.min.js'
            //         },
            //         // 'react': [
            //         //   { name: 'react', var: 'React', path: `umd/react.${env}.min.js` },
            //         //   { name: 'react-dom', var: 'ReactDOM', path: `umd/react-dom.${env}.min.js` },
            //         // ]
            //     }
            // })
        ].filter(Boolean)
	};
};
