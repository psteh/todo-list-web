import React from 'react'
import moment from 'moment';
import _ from 'lodash';
import { Button } from 'react-bootstrap';

const List = ({ data, sort, handleUpdate, handleDelete }) => {
    const sortType = sort?.type;
    const sortWay = sort?.asc ? 'asc' : 'desc';

    return _.orderBy(data, sortType, [sortWay]).map((todo, index) => (
        <tr key={index}>
            <td>{todo.task}</td>
            <td>{moment(todo.created_at).format('YYYY-MM-DD HH:mm:ss')}</td>
            <td>
                {!todo.done && (
                    <Button
                        variant="info"
                        size="sm"
                        onClick={() => handleUpdate(todo._id, todo.task, true)}
                    >
                        Done
                    </Button>
                )}
                <Button
                    variant="danger"
                    size="sm"
                    style={!todo.done ? styles['ml-5'] : null}
                    onClick={() => handleDelete(todo._id)}
                >
                    Delete
                </Button>
            </td>
        </tr>
    ));
};

const styles = {
    'ml-5': {
        marginLeft: 5,
    },
};

export default List;