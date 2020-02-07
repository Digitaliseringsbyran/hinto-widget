import {
	CLEAR_STATE,
	FETCH_MESSAGES_SUCCESS,
	INTERVAL_TICK,
	MESSAGE_UNMOUNT,
} from '../actions'

export const initialState = {
	runInterval: false,
	messages: [],
	index: null,
	closed: false,
}

export default (state = initialState, action) => {
	switch (action.type) {
		case FETCH_MESSAGES_SUCCESS:
			return { ...state, messages: action.payload, index: 0 }
		case INTERVAL_TICK:
			return { ...state, index: state.index + 1, runInterval: false }
		case MESSAGE_UNMOUNT: {
			return { ...state, runInterval: true, cooldown: Date.now() + 5000 }
		}
		case CLEAR_STATE:
			return initialState
		default:
			return state
	}
}
