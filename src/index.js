import { h, render } from 'preact'
import App from './app/App.js'

const Hinto = {
	init: () => {
		if (!window.hintoSettings) {
			console.log('Please define hintoSettings.')
			return false
		}

		render(<App />, document.body)
	},
}

export default Hinto
