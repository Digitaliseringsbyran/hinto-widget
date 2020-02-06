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

		// Create element for App to mount on
		const root = document.createElement('div')
		root.setAttribute('id', 'hinto-widget')

		// Append root before closing body tag
		// TODO: How to handle non-existing body tags?
		if (document.body) {
			document.body.appendChild(root)
			render(<App settings={{ ...window.hintoSettings }} />, root)
		}
	},

	trigger: () => {
		window.dispatchEvent(triggerEvent)
	},
}

export default Hinto
