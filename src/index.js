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
