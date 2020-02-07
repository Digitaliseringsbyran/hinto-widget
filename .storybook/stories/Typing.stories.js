import { h } from 'preact'
import { number, color, text, boolean } from '@storybook/addon-knobs'

import Typing from '../../src/app/components/Typing'

export default { title: 'Typing' }

const title = 'HAYDAY'
const role = 'Assistant'
const brandColor = '#EBE5D7'
const running = true
const delay = 5000

const handleOnEnd = () => {
	console.log('It ended')
}

export const withText = () => (
	<Typing
		title={text('title', title)}
		role={text('role', role)}
		color={color('color', brandColor)}
		running={boolean('running', running)}
		delay={number('delay', delay)}
		onEnd={handleOnEnd}
	/>
)
