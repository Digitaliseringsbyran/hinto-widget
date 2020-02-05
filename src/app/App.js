import { h } from 'preact'
import { useEffect, useReducer } from 'preact/hooks'
import { initialState, reducer } from './reducer'
import to from 'await-to-js'
import { get, set } from 'lscache'
import { useInterval } from './hooks/useInterval'
import { mock } from '../utils/mock'
import { COOLDOWN, CLOSED, TRIGGER } from '../constants'
import MessageContainer from './components/MessageContainer'

const INTERVAL = 1000
const USER_COOLDOWN = 5000

const App = () => {
	const [state, dispatch] = useReducer(reducer, initialState)
	const { index, messages, runInterval } = state

	useEffect(() => {
		// Mount on page load
		mount()

		// Listen for trigger events and run mount() again
		window.addEventListener(TRIGGER, () => {
			mount()
		})

		// Clean up
		return () => {
			window.removeEventListener(TRIGGER)
		}
	}, [])

	// Tell reducer we have gone through all messages
	useEffect(() => {
		if (index === messages.length) {
			dispatch({ type: 'ALL_MESSAGES_SHOWN' })
		}
	}, [index, messages])

	async function mount() {
		// Clear state
		dispatch({ type: 'CLEAR_STATE' })

		// Return if user has closed widget
		const closed = get(CLOSED)
		if (closed && closed === 'true') return

		// Request messages based on path and userId
		const [err, res] = await to(
			mock(true, 1000, {
				messages: ['10 personer', '20 personer'],
			}),
		)

		// TODO: Do something with error
		if (err) return

		// Save messages in state if they exist and run interval
		if (res.messages && res.messages.length) {
			return dispatch({
				type: 'FETCH_MESSAGES_SUCCESS',
				payload: res.messages,
			})
		}
	}

	useInterval(
		() => {
			// Return if messages is on cooldown
			const cooldown = get(COOLDOWN)
			if (cooldown && cooldown > Date.now()) return
			// Set cooldown to Date.now() + user defined cooldown
			set(COOLDOWN, Date.now() + USER_COOLDOWN)
			// Set index
			dispatch({ type: 'INTERVAL_TICK' })
		},
		runInterval ? INTERVAL : null,
	)

	return <MessageContainer message={messages[index]} />
}

export default App
