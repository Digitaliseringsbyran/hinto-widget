export const mock = (success, timeout, payload) => {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			if (success) {
				resolve(payload)
			} else {
				reject(payload)
			}
		}, timeout)
	})
}
