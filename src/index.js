import { h, render, Fragment } from 'preact'
import App from './app/App.js'
import { TRIGGER } from './constants'
import GlobalStyles from './GlobalStyles'

const triggerEvent = new CustomEvent(TRIGGER)

const Hinto = {
	init: () => {
		if (!window.hintoSettings) {
			console.log('Please define hintoSettings.')
			return
		}

		render(
			<Fragment>
				<GlobalStyles />
				<App settings={{ ...window.hintoSettings }} />
			</Fragment>,
			document.getElementById('app'),
		)
	},

	trigger: () => {
		window.dispatchEvent(triggerEvent)
	},
}

export default Hinto
