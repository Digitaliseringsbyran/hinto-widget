import { createStore, applyMiddleware } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { composeWithDevTools } from 'redux-devtools-extension'
import { analytics } from '../middleware/analytics'
import reducers from '../reducers'

const persistConfig = {
	key: 'hinto-widget',
	storage,
	whitelist: ['closed', 'cooldown'],
}

const persistedReducer = persistReducer(persistConfig, reducers)

export const store = createStore(
	persistedReducer,
	composeWithDevTools(applyMiddleware(analytics)),
)

export const persistor = persistStore(store)
