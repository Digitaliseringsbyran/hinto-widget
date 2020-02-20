import { h } from 'preact'
import { useEffect } from 'preact/hooks'
import styled from 'styled-components'

import AvatarIndicator from './AvatarIndicator'
import TypingIndicator from './TypingIndicator'

const Avatar = ({
	color,
	title,
	role,
	logo,
	typing,
	running,
	delay,
	onEnd,
	size,
	stroke,
}) => {
	useEffect(() => {
		let timeout

		const mount = () => {
			if (!onEnd) {
				return
			}

			timeout = setTimeout(() => {
				onEnd()
			}, 2000)
		}

		mount()

		return () => {
			clearTimeout(timeout)
		}
	}, [])

	return (
		<Container>
			<AvatarIndicator
				size={size}
				stroke={stroke}
				color={color}
				logo={logo}
				running={running}
				delay={delay}
			/>
			<AvatarTitle>{title}</AvatarTitle>
			<AvatarRole>{role}</AvatarRole>
			{typing && <TypingIndicator />}
		</Container>
	)
}

const Container = styled.div`
	display: inline-flex;
	align-items: center;
`

const AvatarTitle = styled.span`
	font-weight: bold;
	max-width: 140px;
	text-overflow: ellipsis;
	white-space: nowrap;
	overflow: hidden;
	font-size: 14px;
	margin-left: 6px;
`

const AvatarRole = styled.span`
	font-weight: normal;
	font-size: 14px;
	max-width: 80px;
	text-overflow: ellipsis;
	white-space: nowrap;
	overflow: hidden;
	margin-left: 4px;
	margin-right: 10px;
`

export default Avatar
