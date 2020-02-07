import { h } from 'preact'
import styled from 'styled-components'
import { usePausableTimeout } from '../hooks/usePausableTimeout'

const DELAY = 5000

const Message = ({ onEnd }) => {
	const [pause, run] = usePausableTimeout(
		() => {
			onEnd()
		},
		DELAY,
		true,
	)

	return (
		<Container>
			<div>A very cool Message</div>
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
`

export default Message
