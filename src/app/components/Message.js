import { h } from 'preact'
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
		<div>
			<div>A very cool Message</div>
			<div>
				<button onClick={run}>run</button>
				<button onClick={pause}>pause</button>
			</div>
		</div>
	)
}

export default Message
