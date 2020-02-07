import { h } from 'preact'
import Message from '../../src/app/components/Message'

export default { title: 'Message' }

const text =
	'Hörrudu! Visste du att vi skickar ditt paket idag om du beställer inom 2 timmar?'

const handleOnEnd = () => {
	console.log('Message onEnd')
}

export const withText = () => <Message text={text} onEnd={handleOnEnd} />
