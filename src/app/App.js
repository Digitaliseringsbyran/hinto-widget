import { h } from 'preact'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from './store'

import GlobalStyles from './styles/GlobalStyles'
import MessageContainer from './components/MessageContainer'

const App = ({ settings }) => (
	<Provider store={store}>
		<PersistGate loading={null} persistor={persistor}>
			<GlobalStyles />
			<MessageContainer />
		</PersistGate>
	</Provider>
)

export default App
