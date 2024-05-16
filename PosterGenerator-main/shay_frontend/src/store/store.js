import createReducerManager from './rootReducer';
import createSagaMiddleware from 'redux-saga';
import createSagaManager from './rootSaga';
import { configureStore } from '@reduxjs/toolkit';

const sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware];
const initialstate = {};
const reducerManager = createReducerManager(initialstate);

const store = configureStore({
    reducer: reducerManager.reduce,
    middleware: middleware,
    preloadedState: initialstate
});

let sagaManager = createSagaManager(sagaMiddleware);

sagaManager.setAddSagaListener((saga) => {
    sagaMiddleware.run(saga);
});

store.reducerManager = reducerManager;
store.sagaManager = sagaManager;

export default store;
