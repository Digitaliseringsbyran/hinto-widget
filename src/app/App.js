import { h } from 'preact'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'preact/hooks'
import to from 'await-to-js'
import { useInterval } from './hooks/useInterval'
import { mock } from '../utils/mock'
import MessageContainer from './components/MessageContainer'
import { TRIGGER } from '../constants'
import {
	CLEAR_STATE,
	FETCH_MESSAGES_SUCCESS,
	INTERVAL_TICK,
	ALL_MESSAGES_SHOWN,
} from './actions'

const App = ({ opts }) => {
	const dispatch = useDispatch()
	const { index, messages, closed, cooldown, runInterval } = useSelector(
		state => state,
	)
	const currentMessage = useSelector(state => state.messages[state.index])

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
			dispatch({ type: ALL_MESSAGES_SHOWN })
		}
	}, [index])

	async function mount() {
		// Clear state
		dispatch({ type: CLEAR_STATE })
		// Return if user has closed widget
		if (closed) return
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
				type: FETCH_MESSAGES_SUCCESS,
				payload: res.messages,
			})
		}
	}

	useInterval(
		() => {
			// Return if messages is on cooldown
			if (cooldown && cooldown > Date.now()) return
			// Dispatch interval tick
			dispatch({ type: INTERVAL_TICK })
		},
		runInterval ? 1000 : null,
	)

	return <MessageContainer message={currentMessage} />
}

export default App
