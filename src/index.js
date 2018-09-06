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
import decode from 'jwt-decode';
import {composeWithDevTools} from 'redux-devtools-extension';
import { userLoggedIn } from './actions/actions';
import setAuthorizationHeader from './setAuthorizationHeader';

const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk))
);

if(localStorage.likemeornotJWT){
    //in production it's almost a must-have that you set an expiration period on your t
    const payload = decode(localStorage.likemeornotJWT);

    const user = {
        email : payload.email,
        id : payload.id,
        token : localStorage.likemeornotJWT
    };
    
    setAuthorizationHeader(localStorage.likemeornotJWT);

    store.dispatch(userLoggedIn(user));
}

ReactDOM.render(<BrowserRouter>
                    <Provider store={store}>
                        <Route component={App} />
                    </Provider>
                </BrowserRouter>, document.getElementById('root'));
registerServiceWorker();
