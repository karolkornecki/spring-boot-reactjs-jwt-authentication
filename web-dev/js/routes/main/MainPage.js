import React, { Component } from 'react';
import { connect } from 'react-redux';
import { logout } from '../../actions/index';
import { MainForm } from './components/MainForm';

class MainPage extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <MainForm {...this.props} />
        );
    }
}

const mapStateToProps = (state, ownProps) => ({
    firstName: state.user.account.firstName,
    lastName: state.user.account.lastName
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    logout: () => dispatch(logout())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MainPage)
