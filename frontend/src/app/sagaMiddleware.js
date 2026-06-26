import createSagaMiddleware from 'redux-saga';

// Centralize the creation of the saga middleware
const sagaMiddleware = createSagaMiddleware();

export default sagaMiddleware;
