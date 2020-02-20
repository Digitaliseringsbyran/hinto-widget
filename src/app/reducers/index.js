import {
	CLEAR_STATE,
	FETCH_MESSAGES_SUCCESS,
	INTERVAL_TICK,
	MESSAGE_UNMOUNT,
	RECEIVE_USER_COOLDOWN,
} from '../actions'

export const initialState = {
	runInterval: false,
	messages: [],
	index: null,
	closed: false,
	cooldown: null,
	userCooldown: 5000,
}

export default (state = initialState, action) => {
	switch (action.type) {
		case FETCH_MESSAGES_SUCCESS:
			return { ...state, messages: action.payload, index: 0 }
		case INTERVAL_TICK:
			return { ...state, index: state.index + 1, runInterval: false }
		case MESSAGE_UNMOUNT: {
			return {
				...state,
				runInterval: true,
				cooldown: Date.now() + state.userCooldown,
			}
		}
		case RECEIVE_USER_COOLDOWN: {
			return { ...state, userCooldown: action.payload }
		}
		case CLEAR_STATE:
			return initialState
		default:
			return state
	}
}
