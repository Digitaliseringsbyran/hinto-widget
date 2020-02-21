import 'whatwg-fetch'
import { h, render } from 'preact'
import { TRIGGER } from './constants'
import AppContainer from './app/AppContainer'

const triggerEvent = new CustomEvent(TRIGGER)

const Hinto = {
	init: async () => {
		if (!window.hintoSettings) {
			console.log('Please define hintoSettings.')
			return
		}

		// Request settings based on userId
		const response = await fetch(
			`${process.env.API_URL}/init/${window.hintoSettings.userId}`,
			{ credentials: 'include' },
		)

		// Don't do anything if the hinto api isn't working
		if (!response.ok) {
			return
		}

		const res = await response.json()

		// Create element for App to mount on
		const root = document.createElement('div')
		root.setAttribute('id', 'hinto-widget')

		// Append root before closing body tag
		// TODO: How to handle non-existing body tags?
		if (document.body) {
			document.body.appendChild(root)
			render(
				<AppContainer
					options={{ ...window.hintoSettings, ...res.settings }}
				/>,
				root,
			)
		}
	},

	trigger: () => {
		window.dispatchEvent(triggerEvent)
	},
}

export default Hinto
