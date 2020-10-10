import React, { Component } from 'react';
import { Jumbotron } from 'react-bootstrap';
import { connect } from 'react-redux';

import Form from './Form';
import Todos from './Todos';

import { getTodos } from '../redux/Todos';

class Container extends Component {
    constructor(props) {
        super(props);
        this.state = { todos: [] };
    }

    async componentDidMount() {
        await getTodos();
        console.log(this.props);
    }

    render() {
        return (
            <Jumbotron>
                <Form />
                <Todos />
            </Jumbotron>
        );
    }
}

const mapStateToProps = (state) => {
    return { ...state };
}

export default connect(mapStateToProps)(Container);