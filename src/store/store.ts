import { compose, createStore, applyMiddleware, Middleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import logger from 'redux-logger';
// import thunk from 'redux-thunk';
import { rootReducer } from './root-reducer';

import createSagaMiddleware from 'redux-saga';

import { rootSaga } from './root-saga';

const sagaMiddleware = createSagaMiddleware();

export type RootState = ReturnType<typeof rootReducer>;

// override the defaulr shape
declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const middlewares = [
  process.env.NODE_ENV === 'development' && logger,
  sagaMiddleware,
].filter((middleware): middleware is Middleware => Boolean(middleware));

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['user', 'categories'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const composeEnhancer =
  (process.env.NODE_ENV !== 'production' &&
    window &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

// in other for the middlewares to work you must compose the middlewares
const composedEnhancers = composeEnhancer(applyMiddleware(...middlewares));

// the second argument is if you want to add any additional default states

export const store = createStore(
  persistedReducer,
  undefined,
  composedEnhancers
);

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);
