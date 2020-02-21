import { h } from 'preact'
import styled, { keyframes } from 'styled-components'

const AvatarIndicator = ({
	size = 18,
	stroke = 3,
	color,
	running,
	delay,
	logo,
}) => {
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
				logo={logo}
				style={{ height: size * 1, width: size * 1 }}
			/>
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

const AvatarLogo = styled.div`
	position: relative;
	background-image: url('${props => (props.logo ? props.logo : '')}');
	background-size: 90%; 
	background-repeat: no-repeat;
	background-position: center;
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
