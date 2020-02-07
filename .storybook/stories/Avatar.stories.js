import { h } from 'preact'
import { number, color, text, boolean } from '@storybook/addon-knobs'

import Avatar from '../../src/app/components/Avatar'

export default { title: 'Avatar' }

const title = 'HAYDAY'
const role = 'Assistant'
const brandColor = '#EBE5D7'
const typing = true

const handleOnEnd = () => {
	console.log('Avatar onEnd')
}

export const withText = () => (
	<Avatar
		title={text('title', title)}
		role={text('role', role)}
		color={color('color', brandColor)}
		typing={boolean('typing', typing)}
		onEnd={handleOnEnd}
	/>
)
