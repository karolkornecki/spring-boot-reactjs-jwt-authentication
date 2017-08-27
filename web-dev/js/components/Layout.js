import React, {Component} from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'

class Layout extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                {this.props.children}
            </div>
        );
    }
}

export default Layout