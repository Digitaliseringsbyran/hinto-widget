import { h } from 'preact'
import { useEffect, useState } from 'preact/hooks'
import { useSelector, useDispatch } from 'react-redux'
import { useTransition, animated } from 'react-spring'
import styled from 'styled-components'
import { MESSAGE_UNMOUNT } from '../actions'
import Avatar from './Avatar'
import Message from './Message'

const MessageContainer = () => {
	const dispatch = useDispatch()
	const message = useSelector(state => state.messages[state.index])
	const [showTyping, setShowTyping] = useState(false)
	const [showMessage, setShowMessage] = useState(false)

	const avatarTransition = useTransition(showTyping, null, {
		from: { position: 'absolute', opacity: 0 },
		enter: { opacity: 1 },
		leave: { opacity: 0 },
	})

	const messageTransition = useTransition(showMessage, null, {
		from: { position: 'absolute', opacity: 0 },
		enter: { opacity: 1 },
		leave: { opacity: 0 },
	})

	useEffect(() => {
		// Do nothing if there is no message
		if (!message) return
		// Mount Typing
		setShowTyping(true)
	}, [message])

	const typingEnd = () => {
		setShowTyping(false)
		setShowMessage(true)
	}

	const messageEnd = () => {
		setShowMessage(false)
		dispatch({ type: MESSAGE_UNMOUNT })
	}

	if (!message) {
		return null
	}

	return (
		<Container>
			{avatarTransition.map(
				({ item, key, props }) =>
					item && (
						<animated.div key={key} style={props}>
							<Avatar onEnd={typingEnd} typing />
						</animated.div>
					),
			)}
			{messageTransition.map(
				({ item, key, props }) =>
					item && (
						<animated.div key={key} style={props}>
							<Message onEnd={messageEnd} />
						</animated.div>
					),
			)}
		</Container>
	)
}

const Container = styled.div`
	border: 1px solid;
	margin-bottom: 2rem;
	margin-left: 2rem;
`

export default MessageContainer
