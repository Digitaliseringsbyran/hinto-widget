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
									{ pragma: 'h' },
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
	resolve: {
		extensions: ['*', '.js'],
	},
	devServer: {
		contentBase: path.resolve(__dirname, 'public'),
	},
}
