import { applyMiddleware, combineReducers, createStore } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import AsyncStorage from '@react-native-async-storage/async-storage'

import authReducer from './reducers/authReducer'
import thunk from 'redux-thunk'
import remindersReducer from './reducers/remindersReducer'

const rootReducer = combineReducers({
  auth: authReducer,
  reminders: remindersReducer
}) 

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export let store = createStore(persistedReducer, applyMiddleware(thunk))
export let persistor = persistStore(store)