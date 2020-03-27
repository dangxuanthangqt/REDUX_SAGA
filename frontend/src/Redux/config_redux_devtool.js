import { createStore , applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../Reducer/re_root';
import createSagaMiddleware from 'redux-saga'

import root_saga from '../sagas/root_saga';

const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
    }) : compose;

    const sagaMiddleware = createSagaMiddleware()
const config_redux =()=>{
    const middleware=[thunk, sagaMiddleware];
    const enhancer = composeEnhancers(
      applyMiddleware(...middleware),
      // other store enhancers if any
    );
    
    const store = createStore(rootReducer, enhancer);
    sagaMiddleware.run(root_saga)
   
    return store;
}
export default config_redux;
