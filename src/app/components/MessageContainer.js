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

	return <div>{text || 'Väntar på meddelande..'}</div>
}

export default MessageContainer
