import React from 'react';
import {Image, Card, Icon} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import {fetchUserDetails} from './../../actions/actions';
import { connect } from 'react-redux';

class UserPage extends React.Component {

    onUserSelect = (userId) => {
        this.props.dispatch(fetchUserDetails(userId));
    }

    render(){
        return (
            <div>
                <Card>
                    <Image src='https://react.semantic-ui.com/images/avatar/large/daniel.jpg' />
                    <Card.Content>
                    <Card.Header>{this.props.caption}</Card.Header>
                    <Card.Meta>{this.props.email}</Card.Meta>
                    </Card.Content>
                    <Card.Content extra>
                    <a onClick={() => this.onUserSelect(this.props.userId)}>
                        <Icon name='heart' />
                        {this.props.likes} Likes
                    </a>
                    </Card.Content>
                </Card>
                <br></br>
            </div>
        )
    }
};

export default connect()(UserPage);