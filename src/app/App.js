import 'whatwg-fetch'
import { h } from 'preact'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'preact/hooks'
import { useInterval } from './hooks/useInterval'
import MessageContainer from './components/MessageContainer'
import { TRIGGER } from '../constants'
import { CLEAR_STATE, FETCH_MESSAGES_SUCCESS, INTERVAL_TICK } from './actions'

const App = ({ userId }) => {
	const dispatch = useDispatch()
	const { closed, cooldown, runInterval, messages } = useSelector(
		state => state,
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

	console.log(userId)

	async function mount() {
		// Clear state
		dispatch({ type: CLEAR_STATE })
		// Return if user has closed widget
		if (closed || !userId) return
		// Request messages based on path and userId
		const response = await fetch(
			`${process.env.API_URL}/messages/${userId}?path=${window.location.pathname}`,
		)

		// Don't do anything if the hinto api isn't working
		if (!response.ok) {
			return
		}

		const res = await response.json()

		// Save messages in state if they exist and run interval
		if (res.messages && res.messages.length) {
			return dispatch({
				type: FETCH_MESSAGES_SUCCESS,
				payload: res.messages,
			})
		}
	}

	useInterval(
		() => {
			// Messages are on cooldown, do nothing and keep ticking
			if (cooldown && cooldown > Date.now()) {
				return
			}

			// Dispatch interval tick
			dispatch({ type: INTERVAL_TICK })
		},
		runInterval ? 1000 : null,
	)

	// Return null if there are no messages
	if (!messages.length) {
		return null
	}

	return <MessageContainer />
}

export default App
