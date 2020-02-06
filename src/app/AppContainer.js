import { h } from 'preact'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from './store'
import GlobalStyles from './styles/GlobalStyles'
import App from './App'

const AppContainer = ({ opts }) => (
	<Provider store={store}>
		<PersistGate loading={null} persistor={persistor}>
			<GlobalStyles />
			<App opts={{ ...opts }} />
		</PersistGate>
	</Provider>
)

export default AppContainer
