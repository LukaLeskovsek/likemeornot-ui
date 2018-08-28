import { Header, Item, Image, Icon } from 'semantic-ui-react';
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import _ from 'lodash';
import UserPage from './UserPage';

class UserListPage extends React.Component {

    render(){
        return (          
            <div>                 
                 { 
                    _.map(this.props.userList, (user, idx) => {
                     return <UserPage 
                                key={idx} 
                                userId={user._id}
                                caption={user.firstname + ' ' + user.lastname}
                                likes={user.likes}
                                email={user.email}
                            />
                    }) 
                 }
            </div>
        )
    }
};

function mapStateToProps(state) {
    return {
        userList : state.common.userList,
        loading : state.common.loading,
        error : state.common.error
    }
}

export default connect(mapStateToProps,null)(UserListPage);