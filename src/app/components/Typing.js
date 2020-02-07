import { h } from 'preact'
import { useEffect } from 'preact/hooks'
import styled from 'styled-components'

import TypingIndicator from './TypingIndicator'
import Avatar from './Avatar'

const Typing = ({ onEnd, role, title, color, running }) => {
	useEffect(() => {
		const timeout = setTimeout(() => {
			onEnd()
		}, 2000)

		return () => {
			clearTimeout(timeout)
		}
	}, [])

	return (
		<TypingContainer>
			<Avatar role={role} title={title} color={color} running={running} />
			<TypingIndicator />
		</TypingContainer>
	)
}

const TypingContainer = styled.div`
	display: inline-flex;
	align-items: center;
`

export default Typing
