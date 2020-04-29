import { createGlobalStyle } from 'styled-components'
import ApercuRegularWoff from '../../assets/fonts/Apercu.woff'
import ApercuMediumWoff from '../../assets/fonts/Apercu-Medium.woff'
import ApercuBoldWoff from '../../assets/fonts/Apercu-Bold.woff'

const GlobalStyles = createGlobalStyle`
	// Normal
	@font-face { 
		font-family: 'hinto-apercu';
		font-style: normal;
		font-weight: 400;
		src: 
			url('${ApercuRegularWoff}') format('woff');
	}

	// Medium
	@font-face { 
		font-family: 'hinto-apercu';
		font-style: normal;
		font-weight: 500;
		src: 
			url('${ApercuMediumWoff}') format('woff');
	}
	
	// Bold
	@font-face { 
		font-family: 'hinto-apercu';
		font-style: normal;
		font-weight: 700;
		src: 
			url('${ApercuBoldWoff}') format('woff');
	}

	#hinto-widget {
		position: fixed;
		z-index: 2147483647;
		font-family: 'hinto-apercu' !important;
		right: 0;
		bottom: 0;
		perspective: 999px; 
		width: 100vw;
		@media screen and (min-width: 400px) {
			width:375px;
		}
	}
`

export default GlobalStyles
