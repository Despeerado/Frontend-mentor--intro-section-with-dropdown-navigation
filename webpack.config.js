'use strict'

const path = require('path')
const autoprefixer = require('autoprefixer')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
	mode: 'development',
	entry: './src/js/main.js',
	output: {
		filename: '[name][contenthash].js',
		clean: true,
		assetModuleFilename: '[name][ext]',
		path: path.resolve(__dirname, 'dist')
	},
	// devtool: 'source-map',
	devServer: {
		static: path.resolve(__dirname, 'dist'),
		port: 8080,
		open: true,
		hot: true,
		compress: true,
		historyApiFallback: true
	},
	plugins: [
		new HtmlWebpackPlugin({ template: './src/index.html' }),
		new MiniCssExtractPlugin({
			filename: '[name][contenthash].css'
		})
	],
	module: {
		rules: [
			{
				test: /\.(scss)$/i,
				use: [
					MiniCssExtractPlugin.loader,
					// {
					// 	// Adds CSS to the DOM by injecting a `<style>` tag
					// 	loader: 'style-loader'
					// },
					{
						// Interprets `@import` and `url()` like `import/require()` and will resolve them
						loader: 'css-loader'
					},
					{
						// Loader for webpack to process CSS with PostCSS
						loader: 'postcss-loader',
						options: {
							postcssOptions: {
								plugins: [
									autoprefixer
								]
							}
						}
					},
					{
						// Loads a SASS/SCSS file and compiles it to CSS
						loader: 'sass-loader'
					},


				]
			},
			{
				test: /\.html$/i,
				use: ['html-loader']
			},
			{
				test: /\.(png|svg|jpg|jpeg|gif|svg)$/i,
				type: 'asset/resource'
			},
			{
				test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: '[name].[ext]',
							outputPath: 'fonts/'
						}
					}
				]
			}
		]
	}
}