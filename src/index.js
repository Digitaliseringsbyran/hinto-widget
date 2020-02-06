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

		// TODO: Dynamically create div to mount on

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
