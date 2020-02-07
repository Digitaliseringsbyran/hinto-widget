import { h } from 'preact'
import Message from '../../src/app/components/Message'

export default { title: 'Message' }

const text =
	'Hörrudu! Visste du att vi skickar ditt paket idag om du beställer inom 2 timmar?'
const title = 'HAYDAY'
const role = 'Assistant'
const brandColor = '#EBE5D7'

const handleOnEnd = () => {
	console.log('Message onEnd')
}

export const withText = () => (
	<Message
		text={text}
		title={title}
		role={role}
		color={brandColor}
		onEnd={handleOnEnd}
	/>
)
