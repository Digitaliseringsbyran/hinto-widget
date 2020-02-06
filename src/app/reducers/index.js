export const initialState = { runInterval: false, messages: [], index: -1 }

export default (state = initialState, action) => {
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
