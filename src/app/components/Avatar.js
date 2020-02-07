import { h } from 'preact'
import styled from 'styled-components'

import AvatarIndicator from './AvatarIndicator'

const Avatar = ({ color, title, role, running, delay }) => {
	return (
		<Container>
			<AvatarIndicator color={color} running={running} delay={delay} />
			<AvatarTitle>{title}</AvatarTitle>
			<AvatarRole>{role}</AvatarRole>
		</Container>
	)
}

const Container = styled.div`
	display: inline-flex;
	align-items: center;
`

const AvatarTitle = styled.span`
	font-weight: bold;
	font-size: 15px;
	margin-left: 6px;
`

const AvatarRole = styled.span`
	font-weight: normal;
	font-size: 15px;
	margin-left: 4px;
	margin-right: 10px;
`

export default Avatar
