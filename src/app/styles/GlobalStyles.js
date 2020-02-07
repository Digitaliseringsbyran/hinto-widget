import { createGlobalStyle } from 'styled-components'
import ApercuRegularWoffTwo from '../../assets/fonts/apercu-regular.woff2'
import ApercuRegularWoff from '../../assets/fonts/apercu-regular.woff'
import ApercuMediumWoffTwo from '../../assets/fonts/apercu-medium.woff2'
import ApercuMediumWoff from '../../assets/fonts/apercu-medium.woff'
import ApercuBoldWoffTwo from '../../assets/fonts/apercu-bold.woff2'
import ApercuBoldWoff from '../../assets/fonts/apercu-bold.woff'

const GlobalStyles = createGlobalStyle`
	// Normal
	@font-face { 
		font-family: 'hinto-apercu';
		font-style: normal;
		font-weight: 400;
		src: 
			url('${ApercuRegularWoffTwo}') format('woff2'), 
			url('${ApercuRegularWoff}') format('woff');
	}

	// Medium
	@font-face { 
		font-family: 'hinto-apercu';
		font-style: normal;
		font-weight: 500;
		src: 
			url('${ApercuMediumWoffTwo}') format('woff2'), 
			url('${ApercuMediumWoff}') format('woff');
	}
	
	// Bold
	@font-face { 
		font-family: 'hinto-apercu';
		font-style: normal;
		font-weight: 700;
		src: 
			url('${ApercuBoldWoffTwo}') format('woff2'), 
			url('${ApercuBoldWoff}') format('woff');
	}

	#hinto-widget {
		position: fixed;
		font-family: 'hinto-apercu' !important;
		left: 0;
		bottom: 0;
	}
`

export default GlobalStyles
