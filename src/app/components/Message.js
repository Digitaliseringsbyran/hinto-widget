import { h } from 'preact'
import styled from 'styled-components'
import { usePausableTimeout } from '../hooks/usePausableTimeout'
import Avatar from './Avatar'

const DELAY = 5000

const Message = ({ onEnd, onClose, text, role, title, color, logo }) => {
	const [pause, run, running] = usePausableTimeout(
		() => {
			onEnd()
		},
		DELAY,
		true,
	)

	return (
		<Container onMouseEnter={pause} onMouseLeave={run}>
			<MessageHeader>
				<Avatar
					size={16}
					stroke={2}
					running={running}
					delay={DELAY}
					logo={logo}
					role={role}
					title={title}
					color={color}
				/>
				<CloseButton onClick={onClose}>
					<svg
						width="24"
						height="24"
						viewBox="0 0 16 16"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M3 13L13 3"
							stroke="#9C9CA5"
							stroke-width="0.875"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
						<path
							d="M3 3L13 13"
							stroke="#9C9CA5"
							stroke-width="0.875"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
					</svg>
				</CloseButton>
			</MessageHeader>
			<TextContainer>{text}</TextContainer>
		</Container>
	)
}

const Container = styled.div`
	padding: 16px;
	border-radius: 4px;
	background: white;
	border: 1px solid rgba(0, 0, 0, 0.04);
	box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.04), 0px 4px 8px rgba(0, 0, 0, 0.04),
		0px 16px 24px rgba(0, 0, 0, 0.04), 0px 24px 32px rgba(0, 0, 0, 0.04);
`

const CloseButton = styled.button`
	height: 26px;
	width: 26px;
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: 3px;
	outline: none;
	border: none;
	background: none;
	text-decoration: none;
	font-family: 'hinto-apercu';
	appearance: none;
	cursor: pointer;
	transition: background 0.2s;
	&:hover {
		background: #f5f5f9;
	}
`

const MessageHeader = styled.div`
	justify-content: space-between;
	align-items: center;
	display: flex;
`

const TextContainer = styled.div`
	padding-top: 8px;
`

export default Message
