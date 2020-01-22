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
	devServer: {
		contentBase: path.resolve(__dirname, 'public'),
	},
}
