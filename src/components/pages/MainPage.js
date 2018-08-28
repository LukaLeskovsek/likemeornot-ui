import './../../styles/Main.css';
import { Header } from 'semantic-ui-react';
import React from 'react';
import UserDetailPage from './UserDetailPage';

class MainPage extends React.Component {

    render() {
        return (
            <div className="Main">
                <Header as="h1">Do you like me? Or not :(</Header>
                <UserDetailPage />
            </div>
        )
    }
};

export default MainPage;