const Hinto = {
	init: () => {
		if (!window.hintoSettings) {
			console.log('Please define hintoSettings.')
			return false
		}

		console.log(window.hintoSettings)
	},
}

export default Hinto
