import { h } from 'preact'
import styled, { keyframes } from 'styled-components'

const AvatarIndicator = ({ size = 20, stroke = 3, color, running, delay }) => {
	const normalizedsize = size - stroke * 2
	const circumference = normalizedsize * 2 * Math.PI
	return (
		<Container style={{ height: size * 2, width: size * 2 }}>
			<Background height={size * 2} width={size * 2} color={color}>
				<circle
					strokeWidth={stroke}
					r={normalizedsize}
					cx={size}
					cy={size}
				/>
			</Background>
			{delay && (
				<ProgressContainer height={size * 2} width={size * 2}>
					<ProgressIndicator
						running={running}
						delay={delay}
						fill="transparent"
						strokeWidth={stroke}
						offset={circumference}
						strokeDasharray={circumference + ' ' + circumference}
						r={normalizedsize}
						cx={size}
						cy={size}
					/>
				</ProgressContainer>
			)}
			<AvatarLogo
				viewBox="0 0 14 14"
				fill="none"
				style={{ height: size * 1, width: size * 1 }}
			>
				<path
					d="M0 4.08331H1.02535V6.24444H3.31268V4.08331H4.33803V9.44669H3.31268V7.16726H1.02535V9.44669H0V4.08331Z"
					fill="black"
				/>
				<path
					d="M6.87776 4.08331H7.95044L9.91438 9.44669H8.83382L8.46311 8.37402H6.33354L5.96283 9.44669H4.91382L6.87776 4.08331ZM6.63325 7.49852H8.15551L7.53241 5.68444C7.4772 5.53458 7.39832 5.20331 7.39044 5.15599C7.38255 5.19543 7.30368 5.52669 7.25635 5.68444L6.63325 7.49852Z"
					fill="black"
				/>
				<path
					d="M11.1684 7.3881L9.37012 4.08331H10.5138L11.689 6.40219L12.8879 4.08331H14L12.2017 7.3881V9.44669H11.1684V7.3881Z"
					fill="black"
				/>
			</AvatarLogo>
		</Container>
	)
}

const timer = offset => keyframes`
  from {
    stroke-dashoffset: ${offset} ;
  }

  to {
    stroke-dashoffset: 0;
  }
`

const Container = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	position: relative;
`

const AvatarLogo = styled.svg`
	position: relative;
`

const ProgressContainer = styled.svg`
	stroke: rgba(0, 0, 0, 0.2);
	position: absolute;
	top: 0;
	left: 0;
	transform: scale(1.2);
`

const ProgressIndicator = styled.circle`
	animation: ${props => timer(props.offset)} linear
		${props => props.delay / 1000}s
		${props => (props.running ? 'running' : 'paused')};
	transition: stroke-dashoffset 0.35s;
	transform: rotate(-90deg);
	transform-origin: 50% 50%;
`

const Background = styled.svg`
	position: absolute;
	top: 0;
	left: 0;
	transform: scale(1.2);
	stroke: ${props => (props.color ? props.color : '#eaeaea')};
	fill: ${props => (props.color ? props.color : '#eaeaea')};
`

export default AvatarIndicator
