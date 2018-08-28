import React from 'react';
import ReactDOM from 'react-dom';
import 'semantic-ui-css/semantic.min.css';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import {BrowserRouter, Route} from 'react-router-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import rootReducer from './rootReducer';
import {composeWithDevTools} from 'redux-devtools-extension';
import { userLoggedIn } from './actions/actions';



const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk))
);

if(localStorage.likemeornotJWT){
    const user = {
        token : localStorage.likemeornotJWT
    };

    store.dispatch(userLoggedIn(user));
}


ReactDOM.render(<BrowserRouter>
                    <Provider store={store}>
                        <Route component={App} />
                    </Provider>
                </BrowserRouter>, document.getElementById('root'));
registerServiceWorker();
