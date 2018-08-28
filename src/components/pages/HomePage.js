import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../../actions/actions";

class HomePage extends React.Component {
    constructor(props){
        super(props);
    }
    render() {
        let {isAuthenticated, logout} = this.props;
        return(
            <div>
                <h1>Home Page</h1>
                {isAuthenticated ? (
                <button onClick={() => logout()}>Logout</button>
                ) : (
                <div>
                    <Link to="/login">Login</Link> or <Link to="/signup">Sign Up</Link>
                </div>
                )}
            </div>
        );
    }
}

HomePage.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  logout: PropTypes.func.isRequired
};

function mapStateToProps(state) {
    return {  isAuthenticated: !!state.common.user.token  };
}

export default connect(mapStateToProps, { logout: actions.logout })(HomePage);