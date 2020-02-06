import { h, render } from 'preact'
import { TRIGGER } from './constants'
import App from './app/App.js'

const triggerEvent = new CustomEvent(TRIGGER)

const Hinto = {
	init: () => {
		if (!window.hintoSettings) {
			console.log('Please define hintoSettings.')
			return
		}

		render(
			<App settings={{ ...window.hintoSettings }} />,
			document.getElementById('app'),
		)
	},

	trigger: () => {
		window.dispatchEvent(triggerEvent)
	},
}

export default Hinto
