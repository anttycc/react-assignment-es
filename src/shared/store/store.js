import {createStore,applyMiddleware} from "redux";
import reducers from "./reduces";
import thunk from "redux-thunk";
import logger from "redux-logger";

import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { createBrowserHistory } from "history";
export const history = createBrowserHistory();


const persistConfig = {
  key: '@@STATE',
  storage: storage,
  whitelist: ['login','product'] // which reducer want to store
};
const pReducer = persistReducer(persistConfig, reducers);
const middleware = applyMiddleware(thunk, logger);
const store = createStore(pReducer, middleware);
const persistor = persistStore(store);
export { persistor, store };
// export const store=createStore(reducers,applyMiddleware(thunk,logger));