import { h } from 'preact'
import { useEffect, useState } from 'preact/hooks'
import styled from 'styled-components'

const TIMER = 2000

const MessageContainer = ({ message }) => {
	const [visible, set] = useState(false)

	useEffect(() => {
		set(true)

		setTimeout(() => {
			set(false)
		}, TIMER)
	}, [message])

	if (!visible) {
		return null
	}

	return <Container>hello</Container>
}

const Container = styled.div`
	border: 1px solid red;
`

export default MessageContainer
