import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import SignupForm from '../../forms/SignupForm';
import {signup} from '../../actions/actions';

class SignupPage extends React.Component {

    submit = (data) => this.props.signup(data).then( () => this.props.history.push('/dashboard'))

    render(){

        return(
            <SignupForm submit={this.submit} />
        );
    }
};

SignupPage.propTypes = {
    history : PropTypes.shape({
        push : PropTypes.func.isRequired
    }),
    signup : PropTypes.func.isRequired
};

export default connect(null, {signup})(SignupPage);