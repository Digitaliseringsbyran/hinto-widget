import { h } from 'preact'
import { number, color, text, boolean } from '@storybook/addon-knobs'

import AvatarIndicator from '../../src/app/components/AvatarIndicator'

export default { title: 'AvatarIndicator' }

const brandColor = '#EBE5D7'
const size = 20
const stroke = 3

export const hayday = () => (
	<AvatarIndicator
		size={number('size', size)}
		stroke={number('stroke', stroke)}
		color={color('color', brandColor)}
	/>
)
