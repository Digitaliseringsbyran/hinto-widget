import { MESSAGE_UNMOUNT } from '../actions'

export const analytics = store => next => async action => {
	// Tell the Hinto API that a message was shown on MESSAGE_UNMOUNT.
	if (action.type === MESSAGE_UNMOUNT) {
		const {
			userSettings: { userId },
		} = store.getState()

		await fetch(`${process.env.API_URL}/analytics/hinto-shown/${userId}`, {
			credentials: 'include',
		})
	}

	return next(action)
}
