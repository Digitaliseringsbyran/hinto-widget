import { MESSAGE_UNMOUNT, USER_CLOSED_MESSAGE } from '../actions'

export const analytics = store => next => async action => {
	// Tell the Hinto API that a message was shown on MESSAGE_UNMOUNT.
	if (
		action.type === MESSAGE_UNMOUNT ||
		action.type === USER_CLOSED_MESSAGE
	) {
		const {
			userSettings: { userId },
		} = store.getState()

		await fetch(`${process.env.API_URL}/analytics/hinto-shown/${userId}`, {
			credentials: 'include',
		})
	}

	return next(action)
}
