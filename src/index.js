import { h, render } from 'preact'
import App from './app/App.js'
import { TRIGGER } from './constants'

const triggerEvent = new CustomEvent(TRIGGER)

const Hinto = {
	init: () => {
		if (!window.hintoSettings) {
			console.log('Please define hintoSettings.')
			return
		}

		render(<App />, document.body)
	},

	trigger: () => {
		window.dispatchEvent(triggerEvent)
	},
}

export default Hinto
