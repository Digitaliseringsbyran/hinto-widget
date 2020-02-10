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
		from: { opacity: 0, transform: 'translateY(50px)' },
		enter: { opacity: 1, transform: 'translateY(0px)' },
		leave: { opacity: 0, transform: 'translateY(-50px)' },
	})

	const messageTransition = useTransition(showMessage, null, {
		from: { opacity: 0, transform: 'translateY(50px)' },
		enter: { opacity: 1, transform: 'translateY(0px)' },
		leave: { opacity: 0, transform: 'translateY(50px)' },
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
						<AnimatedContainer key={key} style={props}>
							<Avatar
								title="HAYDAY"
								role="Assistant"
								color="#EBE5D7"
								onEnd={typingEnd}
								typing
							/>
						</AnimatedContainer>
					),
			)}
			{messageTransition.map(
				({ item, key, props }) =>
					item && (
						<AnimatedContainer key={key} style={props}>
							<Message
								title="HAYDAY"
								role="Assistant"
								color="#EBE5D7"
								text={message}
								onEnd={messageEnd}
							/>
						</AnimatedContainer>
					),
			)}
		</Container>
	)
}

const AnimatedContainer = styled(animated.div)`
	position: absolute;
	bottom: 0;
	left: 0;
	padding: 16px;
	width: 100%;
	@media screen and (min-width: 400px) {
		padding: 24px;
	}
`

const Container = styled.div`
	position: relative;
`

export default MessageContainer
