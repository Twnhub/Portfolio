const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');

let module_rules = [];

const options = {
	entry: path.join(__dirname, 'src/index.js'),
	output: {
		path: path.join(__dirname, 'dist'),
		filename: 'bundle.js'
	},
	module: {
		rules: module_rules
	},
	plugins: [
		new HtmlWebpackPlugin({
			title: 'Mitch\'s Portfolio',
			template: path.join(__dirname, 'src/assets/index.html'),
			filename: 'index.html'
		}),
		new MiniCssExtractPlugin({
			filename: '[name].css',
			chunkFilename: '[id].css'
		}),
		new CopyWebpackPlugin([
			{ from: 'src/assets/project_previews/project.json', to: 'dist/project_previews/project.json' }
		])
	],
	externals: [
		'fs'
	]
}

const babelLoader = {
	test: /\.js$/,
	exclude: /(bower_components|node_modules)/,
	use: {
		loader: 'babel-loader'
	}
}

const styleLoader = {
	test: /\.(c|sa|sc)ss$/,
	exclude: /(node_modules)/,
	use: [
		'style-loader',
		{
			loader: MiniCssExtractPlugin.loader,
			options: {
				publicPath: (resourcePath, context) => {
					return path.relative(path.dirname(resourcePath), context) + '/';
				}
			}
		},
		'css-loader',
		'sass-loader'
	]
};

const fileLoader = {
	test: /\.(jpg|png|gif)$/,
	exclude: /(node_modules)/,
	use: {
		loader: 'file-loader',
		options: {
			name: '[path][name].[ext]',
			context: path.resolve(__dirname, 'src/assets/'),
			outputPath: '/',
			publicPath: './',
			useRelativePaths: false
		}
	}
}

module_rules.push(babelLoader, styleLoader, fileLoader);

module.exports = [
	options
]