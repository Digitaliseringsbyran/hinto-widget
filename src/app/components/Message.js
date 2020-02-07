import { h } from 'preact'
import styled from 'styled-components'
import { usePausableTimeout } from '../hooks/usePausableTimeout'
import Avatar from './Avatar'

const DELAY = 5000

const Message = ({ onEnd, text }) => {
	const [pause, run, running] = usePausableTimeout(
		() => {
			onEnd()
		},
		DELAY,
		true,
	)

	return (
		<Container>
			<Avatar running={running} delay={DELAY} />
			<div>{text}</div>
			<div>
				<button onClick={run}>run</button>
				<button onClick={pause}>pause</button>
			</div>
		</Container>
	)
}

const Container = styled.div`
	padding: 14px;
	border-radius: 4px;
	background: white;
	border: 1px solid rgba(0, 0, 0, 0.04);
	box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.04), 0px 4px 8px rgba(0, 0, 0, 0.04),
		0px 16px 24px rgba(0, 0, 0, 0.04), 0px 24px 32px rgba(0, 0, 0, 0.04);

	max-width: 320px;
`

export default Message
