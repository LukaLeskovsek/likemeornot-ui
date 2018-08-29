import "./../../styles/Sidebar.css";
import {Header, Dimmer, Loader} from 'semantic-ui-react';
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import UserListPage from './UserListPage';
import { fetchUsers } from "../../actions/actions";

class SidebarPage extends React.Component {

    componentDidMount(){
        this.props.dispatch(fetchUsers());
    }

    render(){
        return (
            <div className="Sidebar">
                <Header as="h1">Our users</Header>}
                <UserListPage userlist={this.props} />
            </div> 
        );
    }
};

export default connect()(SidebarPage);