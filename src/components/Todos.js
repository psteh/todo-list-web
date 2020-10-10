import React, { useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { getTodos, deleteTodo, updateTodo } from '../redux/Todos';
import List from './List';

const Todos = ({ todos = [] }) => {

    const [sort, setSort] = useState({ type: 'task', asc: true });

    const countCompleted = () => {
        const completed = todos.filter((todo) => todo.done) || [];
        const count = todos?.length - completed?.length;
        return (
            <div style={styles.completed}>{count}/{todos?.length} items left</div>
        )
    }

    const handleDelete = async (id) => {
        try {
            await deleteTodo({ id });
            await getTodos();
        } catch (error) {
            console.log(error);
        }
    };

    const handleUpdate = async (id, task, done = false) => {
        try {
            await updateTodo({ id, task, done });
            await getTodos();
        } catch (error) {
            console.log(error);
        }
    };

    const sortData = (type = 'task') => {
        setSort({ type, asc: !sort.asc })
    };

    return (
        <>
            {countCompleted()}
            <Table hover variant="dark" style={styles['mt-10']}>
                <thead>
                    <tr>
                        <th>
                            <Button variant="link" style={styles.tableHeader} onClick={() => sortData('task')}>To Do</Button>
                        </th>
                        <th>
                            <Button variant="link" style={styles.cursor} onClick={() => sortData('created_at')}>Created At</Button>
                        </th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <List
                        data={todos}
                        sort={sort}
                        handleDelete={handleDelete}
                        handleUpdate={handleUpdate}
                    />
                </tbody>
            </Table>
        </>
    );
};

const styles = {
    'mt-10': {
        marginTop: 10
    },
    'ml-5': {
        marginLeft: 5
    },
    completed: {
        paddingTop: 20,
        paddingBottom: 20,
        float: 'right'
    },
    tableHeader: {
        cursor: 'pointer'
    }
}

const mapStateToProps = (state) => {
    return { todos: state.data };
}

export default connect(mapStateToProps)(Todos);