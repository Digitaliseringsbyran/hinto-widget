module.exports = async ({ config, mode }) => {
	config.resolve = {
		extensions: ['*', '.js'],
		alias: {
			react: 'preact/compat',
			'react-dom': 'preact/compat',
		},
	}

	return config
}
