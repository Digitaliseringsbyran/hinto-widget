import { createStore, applyMiddleware } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storageSession from 'redux-persist/lib/storage/session'
import { composeWithDevTools } from 'redux-devtools-extension'
import { analytics } from '../middleware/analytics'
import reducers from '../reducers'

const persistConfig = {
	key: 'hinto-widget',
	storage: storageSession,
	whitelist: ['closed', 'cooldown', 'viewedMessages'],
}

const persistedReducer = persistReducer(persistConfig, reducers)

export const store = createStore(
	persistedReducer,
	composeWithDevTools(applyMiddleware(analytics)),
)

export const persistor = persistStore(store)
