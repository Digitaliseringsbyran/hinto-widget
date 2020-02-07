import { h } from 'preact'
import { addDecorator } from '@storybook/preact'
import GlobalStyles from '../src/app/styles/GlobalStyles'

addDecorator(storyFn => (
	<div style={{ fontFamily: 'hinto-apercu' }}>
		<GlobalStyles />
		{storyFn()}
	</div>
))
