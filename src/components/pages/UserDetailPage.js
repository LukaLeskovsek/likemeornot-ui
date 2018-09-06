import React from 'react';
import {Image, Item, Icon, Button} from 'semantic-ui-react';
import { connect } from 'react-redux';
import {fetchUserDetails, likeUser } from './../../actions/actions';
import InlineError from '../../messages/InlineError';

class UserDetailPage extends React.Component {

    componentDidMount(){
        this.props.dispatch(fetchUserDetails(this.props.user.id));
    }

    onLikeUser(userId){
        this.props.dispatch(likeUser(userId, this.props.user.email));
    }

    render(){
        return (
            <div>
                <Item>
                    <Item.Image size='tiny' src='https://react.semantic-ui.com/images/wireframe/image.png' />
                    <Item.Content>
                        <Item.Header as='h2'>{this.props.userDetails.firstname + ' ' + this.props.userDetails.lastname }</Item.Header>
                        <Item.Meta>BIO</Item.Meta>
                        <Item.Description>
                            <Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' />  
                        </Item.Description> 
                    </Item.Content>
                </Item>
                <br/>
                <Button icon onClick={() => this.onLikeUser(this.props.userDetails._id)}>
                    <Icon name='heart' />
                    {this.props.userDetails.likes} Likes - Do you Like me?!
                </Button>      
            </div>
        )
    }
};

function mapStateToProps(state){
    return {
        userDetails : state.common.userDetails,
        loading : state.common.loading,
        error : state.common.error,
        user : state.common.user
    }
}

export default connect(mapStateToProps)(UserDetailPage);