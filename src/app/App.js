import { h } from 'preact'
import { useEffect, useState } from 'preact/hooks'
import to from 'await-to-js'
import { get, set } from 'lscache'
import { useInterval } from './hooks/useInterval'
import { mock } from '../utils/mock'
import { COOLDOWN, CLOSED } from '../constants'
import MessageContainer from './components/MessageContainer'

const INTERVAL = 1000
const USER_COOLDOWN = 5000

const App = () => {
	const [messages, setMessages] = useState([])
	const [index, setIndex] = useState(-1)

	// Mount on page load
	useEffect(() => {
		mount()
	}, [])

	async function mount() {
		// Return if user has closed widget
		const closed = get(CLOSED)
		if (closed && closed === 'true') {
			return console.log('User has closed widget, exiting')
		}

		// Request messages based on path and userId
		const [err, res] = await to(
			mock(true, 1000, {
				messages: ['10 personer', '20 personer'],
			}),
		)

		// TODO: Do something with error
		if (err) {
			return
		}

		if (res.messages && res.messages.length) {
			// Set interval to update index
			useInterval(() => {
				// Return false if messages is on cooldown
				const cooldown = get(COOLDOWN)
				if (cooldown && cooldown > Date.now()) {
					return
				}

				// Set cooldown to Date.now() + user defined cooldown
				set(COOLDOWN, Date.now() + USER_COOLDOWN)

				// Update index
				setIndex(x => x + 1)
			}, INTERVAL)

			// Save messages in state if they exist
			return setMessages(res.messages)
		}

		// Clear message array if there are old messages in the state
		if (messages.length) {
			setMessages([])
		}
	}

	return <MessageContainer message={messages[index]} />
}

export default App
