import { h } from 'preact'
import { useEffect, useState } from 'preact/hooks'
import { useSelector, useDispatch } from 'react-redux'
import { useTransition, animated } from 'react-spring'
import styled from 'styled-components'
import { MESSAGE_UNMOUNT, USER_CLOSED_MESSAGE } from '../actions'
import Avatar from './Avatar'
import Message from './Message'

const MessageContainer = ({ role, company, logo, color }) => {
	const dispatch = useDispatch()
	const message = useSelector(state => state.messages[state.index])
	const [showTyping, setShowTyping] = useState(false)
	const [showMessage, setShowMessage] = useState(false)

	const avatarTransition = useTransition(showTyping, null, {
		from: { opacity: 0, transform: 'translateY(100px) rotateX(-20deg)' },
		enter: { opacity: 1, transform: 'translateY(0px) rotateX(0deg)' },
		leave: { opacity: 0, transform: 'translateY(-75px) rotateX(20deg)' },
	})

	const messageTransition = useTransition(showMessage, null, {
		from: { opacity: 0, transform: 'translateY(100px) rotateX(-20deg)' },
		enter: { opacity: 1, transform: 'translateY(0px) rotateX(0deg)' },
		leave: { opacity: 0, transform: 'translateY(60px) rotateX(-20deg)' },
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
		dispatch({ type: MESSAGE_UNMOUNT, payload: message.id })
	}

	const onClose = () => {
		setShowMessage(false)
		dispatch({ type: USER_CLOSED_MESSAGE })
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
								title={company}
								role={role}
								color={color}
								logo={logo}
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
								title={company}
								role={role}
								color={color}
								logo={logo}
								text={message.text}
								onEnd={messageEnd}
								onClose={onClose}
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
	right: 0;
	padding: 16px 16px 24px 16px;
	@media screen and (min-width: 400px) {
		padding: 24px;
	}
`

const Container = styled.div`
	position: relative;
`

export default MessageContainer
