import React from 'react';
import {Form, Button, FormField, Messaage, Message} from 'semantic-ui-react';
//import EmailValidator from 'email-validator';
import InlineError from '../messages/InlineError';
import PropTypes from 'prop-types';

class LoginForm extends React.Component {
    state = {
        data : {
            email : '', 
            password : ''
        },
        loading : false,
        errors : {}
    };

    onChange = (e) => this.setState({
        data : { ...this.state.data, [e.target.name] : [e.target.value] }
    });

    onSubmit = () => {
        const errors = this.validate(this.state.data);
        this.setState({errors});
        if(Object.keys(errors).length === 0) {
            this.props.submit(this.state.data).catch(err =>
                this.setState({ errors: err.response.data.errors })
              );;
        }
    };

    validate = (data) => {
        const errors = {};
        
        if(!data.password){
            errors.password = "Password can't be blank";
        }

        if(!data.email){
            errors.email = "Email can't be blank";
        }
       // if(!EmailValidator.validate(data.email)){
       //     errors.email = 'Invalid email!';    
       // }

        return errors;
    }

    render() {
        const {data, errors} = this.state;
        return (
            <div>
                <Form onSubmit={this.onSubmit}>
                {errors.global && <Message negative><Message.Header>Something wong</Message.Header><p>{errors.global}</p></Message>}
                    <FormField>
                        <label htmlFor="email">Email</label>
                        <input type="email" 
                               name="email" 
                               id="email" 
                               placeholder="user@email.com" 
                               value={data.email}
                               onChange={this.onChange}
                        />
                        {errors.email && <InlineError text={errors.email} />} 
                    </FormField>
                    <FormField>
                        <label htmlFor="password">Password</label>
                        <input type="password" 
                               name="password" 
                               id="password"  
                               placeholder="Make it secure!"
                               value={data.password}
                               onChange={this.onChange}
                        />
                        {errors.password && <InlineError text={errors.password} />}
                    </FormField>                         
                    <Button primary>Login</Button>
                </Form>
            </div>
        );
    };
}

LoginForm.propTypes = {
    submit : PropTypes.func.isRequired,
}

export default LoginForm;