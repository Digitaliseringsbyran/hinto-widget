import { h } from 'preact'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from './store'
import GlobalStyles from './styles/GlobalStyles'
import App from './App'

const AppContainer = ({ options }) => (
	<Provider store={store}>
		<PersistGate loading={null} persistor={persistor}>
			<GlobalStyles />
			<App {...options} />
		</PersistGate>
	</Provider>
)

export default AppContainer
