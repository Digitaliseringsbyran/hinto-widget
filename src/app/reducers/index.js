import uniq from 'lodash.uniq'

import {
	CLEAR_STATE,
	FETCH_MESSAGES_SUCCESS,
	INTERVAL_TICK,
	MESSAGE_UNMOUNT,
	RECEIVE_USER_SETTINGS,
} from '../actions'

export const initialState = {
	runInterval: false,
	messages: [],
	viewedMessages: [],
	index: null,
	closed: false,
	cooldown: null,
	userSettings: {
		userId: null,
		cooldown: 5000,
	},
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
				cooldown: Date.now() + state.userSettings.cooldown,
				viewedMessages: uniq([action.payload, ...state.viewedMessages]),
			}
		}
		case RECEIVE_USER_SETTINGS: {
			return {
				...state,
				userSettings: { ...state.userSettings, ...action.payload },
			}
		}
		case CLEAR_STATE:
			// Don't clear persisted state
			return {
				...initialState,
				viewedMessages: state.viewedMessages,
				cooldown: state.cooldown,
				closed: state.closed,
			}
		default:
			return state
	}
}
