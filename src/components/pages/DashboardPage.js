import React from 'react';
import { connect } from 'react-redux';
import MainPage from './MainPage';
import SidebarPage from './SidebarPage';

class DashboardPage extends React.Component{
    render(){
        return (
            <div className="ui grid">
                <div className="six wide column">
                    <SidebarPage /> 
                </div>
                <div className="eight wide column">
                    <MainPage /> 
                </div>                
            </div>            
        )
    }
};
  
function mapStateToProps(state) {
    return {  
        isAuthenticated: !!state.common.user.token  
    };
}

export default connect(mapStateToProps, null)(DashboardPage);