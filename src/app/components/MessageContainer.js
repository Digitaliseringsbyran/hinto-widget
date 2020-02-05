import { h } from 'preact'
import { useEffect, useState } from 'preact/hooks'

const MessageContainer = ({ message }) => {
	const [text, set] = useState(null)

	useEffect(() => {
		set(message)

		setTimeout(() => {
			set(null)
		}, 2000)
	}, [message])

	return text ? <div>{text}</div> : null
}

export default MessageContainer
