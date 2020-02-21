const Dotenv = require('dotenv-webpack')
const path = require('path')

module.exports = {
	entry: './src/index.js',
	mode: process.env.NODE_ENV ? process.env.NODE_ENV : 'development',
	output: {
		library: 'Hinto',
		libraryTarget: 'umd',
		libraryExport: 'default',
		path: path.resolve(__dirname, 'dist'),
		filename: 'index.js',
	},
	module: {
		rules: [
			{
				test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
				use: {
					loader: 'url-loader',
				},
			},
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: [
					{
						loader: 'babel-loader',
						options: {
							presets: ['@babel/preset-env'],
							plugins: [
								[
									'@babel/plugin-transform-react-jsx',
									{ pragma: 'h', pragmaFrag: 'Fragment' },
								],
								'@babel/plugin-transform-runtime',
							],
						},
					},
					{
						loader: 'eslint-loader',
						options: {
							failOnWarning: true,
						},
					},
				],
			},
		],
	},
	plugins: [new Dotenv()],
	resolve: {
		extensions: ['*', '.js'],
		alias: {
			react: 'preact/compat',
			'react-dom': 'preact/compat',
		},
	},
	devServer: {
		contentBase: path.resolve(__dirname, 'public'),
		host: 'hinto.test',
		port: 8080,
		https: true,
		disableHostCheck: true,
	},
}
