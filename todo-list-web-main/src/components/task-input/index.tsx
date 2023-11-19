import React, { FormEvent, useEffect, useState } from 'react';
import { useTask } from '../../hooks/task';
import { Container } from './styles';

const TaskInput: React.FC = () => {
    const [taskName, setTaskName] = useState<string>('');
    const [buttonTitle, setButtonTitle] = useState<string>('Create');
    const { createTask, updateTask, editTaskTitle } = useTask();

    useEffect(() => {
        if (editTaskTitle && editTaskTitle.description) {
            setButtonTitle('Update');
            setTaskName(editTaskTitle.description);
        } else {
            resetValues();
        }

    }, [editTaskTitle]);

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        const value = taskName.trim();
        if (!value) {
            return;
        }

        if (editTaskTitle && editTaskTitle.description) {
            editTaskTitle.description = taskName;
            updateTask(editTaskTitle);
            resetValues();
            return;
        }

        createTask(value);
        resetValues();
    };

    const resetValues = () => {
        setTaskName('');
        setButtonTitle('Create');
    }

    return (
        <Container>
            <form onSubmit={handleSubmit}>

                <input
                    type="text"
                    name="taskName"
                    id="taskName"
                    value={taskName}
                    onChange={(e: any) => setTaskName(e.target.value)}
                />

                <button type="submit" disabled={!taskName.trim()}>{buttonTitle}</button>
            </form>
        </Container>
    )
};

export default TaskInput;