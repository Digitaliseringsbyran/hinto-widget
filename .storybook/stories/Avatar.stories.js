import { h } from 'preact'
import { number, color, text, boolean } from '@storybook/addon-knobs'

import Avatar from '../../src/app/components/Avatar'

export default { title: 'Avatar' }

const title = 'HAYDAY'
const role = 'Assistant'
const brandColor = '#EBE5D7'
const running = true

export const withText = () => (
	<Avatar
		title={text('title', title)}
		role={text('role', role)}
		color={color('color', brandColor)}
		running={boolean('running', running)}
	/>
)
