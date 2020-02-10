import { h } from 'preact'
import styled, { keyframes } from 'styled-components'

const TypingIndicator = () => {
	return (
		<Container>
			<Circle delay="0s" />
			<Circle delay="0.125s" />
			<Circle delay="0.25s" />
		</Container>
	)
}

const bounce = keyframes`
  from {
    transform: translateY(0px);
    opacity:1;
  }

  to {
    transform: translateY(-6px);
    opacity:0.6;
  }
`

const Container = styled.div`
	display: inline-block;
`

const Circle = styled.div`
	height: 5px;
	width: 5px;
	margin-right: 4px;
	display: inline-block;
	background: black;
	border-radius: 50%;
	animation: ${bounce} 0.5s cubic-bezier(0.645, 0.045, 0.355, 1) infinite
		alternate;
	animation-delay: ${props => props.delay};
`

export default TypingIndicator
