import React, { useState } from 'react';
import { Button, FormControl, InputGroup } from 'react-bootstrap';

import { getTodos, createTodo } from '../redux/Todos';

const Form = () => {

    const [task, setTask] = useState('');

    const handleSubmit = async () => {
        try {
            await createTodo({ task });
            await getTodos();
            setTask('');
        } catch (error) {
            console.log(error)
            
        }
    }

    return (
        <InputGroup>
            <FormControl
                placeholder="To Do"
                value={task}
                onChange={e => setTask(e.target.value)}
            />
            <InputGroup.Append>
                <Button variant="primary" onClick={handleSubmit}>
                    ToDo!
                </Button>
            </InputGroup.Append>
        </InputGroup>
    );
}

export default Form;