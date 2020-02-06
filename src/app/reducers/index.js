import {
	CLEAR_STATE,
	FETCH_MESSAGES_SUCCESS,
	INTERVAL_TICK,
	ALL_MESSAGES_SHOWN,
} from '../actions'

export const initialState = {
	runInterval: false,
	messages: [],
	index: -1,
	closed: false,
}

export default (state = initialState, action) => {
	switch (action.type) {
		case FETCH_MESSAGES_SUCCESS:
			return { ...state, messages: action.payload, runInterval: true }
		case INTERVAL_TICK:
			return {
				...state,
				index: state.index + 1,
				cooldown: Date.now() + 5000,
			}
		case ALL_MESSAGES_SHOWN:
			return { ...state, runInterval: false }
		case CLEAR_STATE:
			return initialState
		default:
			return state
	}
}
