import React from 'react';
import LoginForm from '../../forms/LoginForm';
import PropTypes from 'prop-types';
import { connect} from 'react-redux';
import {login} from '../../actions/actions';

class LoginPage extends React.Component {
    
    submit = data => {
        const login_res = this.props.login(data).then();
        return login_res.then(() => this.props.history.push("/dashboard"));//return login_res;    
    };

    render() {
        return (
            <div>
                <h1>Login</h1>
                <LoginForm submit={this.submit}/>
            </div>
        );
    };
};

LoginPage.propTypes = {                                                                                                                                         
    history : PropTypes.shape(
        {
            push : PropTypes.func.isRequired
        }
    ),
    login : PropTypes.func.isRequired
};

export default connect(null, {login})(LoginPage);