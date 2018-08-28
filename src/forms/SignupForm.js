import React from 'react';
import PropTypes from 'prop-types';
import {Form, Button, Message, Divider, Header, TextArea} from 'semantic-ui-react';
import isEmail from 'email-validator'
import InlineError from '../messages/InlineError';

class SignupForm extends React.Component {

    state = {
        data : {
            email : '',
            password : '',
            firstname : '',
            lastname : '',
            bio : ''
        },
        loading : false,
        errors : {}
    };

    validate = (data) => {
        const errors = {};
        
        if(!data.email){
            errors.email = "Invalid email";
        }

        if(!data.password) {
            errors.password = "Can't be blank!";
        }

        return errors;
    };

    onSubmit = (e) => {
        e.preventDefault();

        const errors = this.validate(this.state.data);
        this.setState({errors});

        if(Object.keys(errors).length === 0){
            this.setState({loading : true});
            this.props.submit(this.state.data)
                        .catch(err => {
                            this.setState({errors: err.response.data.errors, loading : false})
                        })
        }
    };

    onChange = (e) => {
        this.setState({
            ...this.state,
            data : {
                ...this.state.data,
                [e.target.name] : [e.target.value] 
            }
        })
    };

    render() {
        const {data,errors,loading} = this.state;
        return (
            <Form onSubmit={this.onSubmit} loading={loading}>
            <Header as="h3">Login info</Header>
            {errors.global && <Message negative><Message.Header>Something wong</Message.Header><p>{errors.global}</p></Message>}
            <Form.Field error={!!errors.email}>
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Enter your email"
                    value={data.email}
                    onChange={this.onChange} 
                />
                {errors.email && <InlineError text={errors.email} />}
            </Form.Field>
            <Form.Field error={!!errors.password}>
                <label htmlFor="email">Password</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Make it STRONG!"
                    value={data.password}
                    onChange={this.onChange} 
                />
                {errors.password && <InlineError text={errors.password} />}
            </Form.Field>
            <Divider />
            <Header as="h3">Personal info </Header>
            <Form.Field >
                <label htmlFor="firstname">First name</label>
                <input
                    type="text"
                    id="firstname"
                    name="firstname"
                    value={data.firstname}
                    onChange={this.onChange} 
                />
            </Form.Field>
            <Form.Field >
                <label htmlFor="lastname">Last name</label>
                <input
                    type="text"
                    id="lastname"
                    name="lastname"
                    value={data.lastname}
                    onChange={this.onChange} 
                />
            </Form.Field>
            <Form.Field >
                <label htmlFor="bio">Short bio</label>
               <TextArea
                autoHeight   
                id="bio"
                name="bio"
                
                onChange={this.onChange} />
            </Form.Field>
            <Button primary>Signup!</Button>
            </Form>
        )
    };
}

SignupForm.propTypes = {
    submit : PropTypes.func.isRequired
}

export default SignupForm;
