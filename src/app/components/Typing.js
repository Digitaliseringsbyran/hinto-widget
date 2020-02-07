import { h } from 'preact'
import { useEffect } from 'preact/hooks'

const Typing = ({ onEnd }) => {
	useEffect(() => {
		const timeout = setTimeout(() => {
			onEnd()
		}, 2000)

		return () => {
			clearTimeout(timeout)
		}
	}, [])

	return <div>typing...</div>
}

export default Typing
