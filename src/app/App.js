import 'whatwg-fetch'
import { h } from 'preact'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'preact/hooks'
import { useInterval } from './hooks/useInterval'
import MessageContainer from './components/MessageContainer'
import { TRIGGER } from '../constants'
import {
	CLEAR_STATE,
	FETCH_MESSAGES_SUCCESS,
	INTERVAL_TICK,
	RECEIVE_USER_COOLDOWN,
} from './actions'

const App = ({
	userId,
	role,
	color,
	logo,
	company,
	cooldown: userCooldown,
	...props
}) => {
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

		// Save userCooldown in store
		dispatch({
			type: RECEIVE_USER_COOLDOWN,
			payload: parseInt(userCooldown),
		})

		// Clean up
		return () => {
			window.removeEventListener(TRIGGER)
		}
	}, [])

	async function mount() {
		// Clear state
		dispatch({ type: CLEAR_STATE })
		// Return if user has closed widget
		if (closed || !userId) return

		const path =
			process.env.NODE_ENV === 'development'
				? 'test'
				: `${userId}?path=${window.location.pathname}`

		// Request messages based on path and userId
		const response = await fetch(`${process.env.API_URL}/messages/${path}`)

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

	return (
		<MessageContainer
			role={role}
			color={color}
			logo={logo}
			company={company}
		/>
	)
}

export default App
