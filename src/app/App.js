import { h } from 'preact'
import { useEffect, useReducer } from 'preact/hooks'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from './store'
import to from 'await-to-js'
import { get, set } from 'lscache'
import { useInterval } from './hooks/useInterval'
import { mock } from '../utils/mock'
import { COOLDOWN, CLOSED, TRIGGER } from '../constants'
import GlobalStyles from './styles/GlobalStyles'
import MessageContainer from './components/MessageContainer'

const INTERVAL = 1000
const USER_COOLDOWN = 5000

const initialState = { runInterval: false, messages: [], index: -1 }

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case 'FETCH_MESSAGES_SUCCESS':
			return { ...state, messages: action.payload, runInterval: true }
		case 'INTERVAL_TICK':
			return { ...state, index: state.index + 1 }
		case 'ALL_MESSAGES_SHOWN':
			return { ...state, runInterval: false }
		case 'CLEAR_STATE':
			return initialState
		default:
			return state
	}
}

const App = ({ settings }) => {
	const [{ index, messages, runInterval }, dispatch] = useReducer(
		reducer,
		initialState,
	)

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
	}, [index])

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

		// Don't do anything if the hinto api isn't working
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

	// TODO: Create a selector to retrieve current message
	// https://gist.github.com/fnky/7d044b94070a35e552f3c139cdf80213
	return (
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<GlobalStyles />
				<MessageContainer message={messages[index]} />
			</PersistGate>
		</Provider>
	)
}

export default App
