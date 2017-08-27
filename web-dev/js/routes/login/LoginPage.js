import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form';
import { validate } from './validate'
import { authenticate } from '../../actions/index'
import { LoginForm } from './components/LoginForm'

class LoginPage extends Component {

    constructor(props) {
        super(props);
        this.submit = this.submit.bind(this);
    }

    submit(values) {
        const { dispatch } = this.props;
        dispatch(authenticate(values.username, values.password));
    }

    render() {
        return (
            <div>
                <LoginForm {...this.props} submit={this.submit}/>
            </div>
        );
    }
}

export default connect()(
    reduxForm({
        form: 'loginForm',
        validate
    })(LoginPage)
);