import React from 'react';
import { Container } from './styles';
import { FiEdit, FiTrash } from 'react-icons/fi';
import { Task, TaskState, useTask } from '../../hooks/task';

interface TaskItem {
    task: Task;
    lastTask: boolean;
}

const TaskItem: React.FC<TaskItem> = ({ task, lastTask }) => {
    const { updateTask, editTask, controlConfirmModal } = useTask();

    const handleCompleteTask = () => {
        task.state = task.state === TaskState.complete ? TaskState.incomplete : TaskState.complete;
        updateTask(task);
    };

    return (
        <Container lastTask={lastTask} isCompleted={task.state === TaskState.complete}>
            <div>
                <label htmlFor="conpleteTask">
                    <input
                        type="checkbox"
                        name="conpleteTask"
                        id="conpleteTask"
                        onChange={handleCompleteTask}
                        defaultChecked={task.state === TaskState.complete}
                    />
                    {task.description}
                </label>
            </div>

            <div>
                {
                    task.state === TaskState.complete ? ''
                    :
                    <button type="button" className="edit" onClick={() => editTask(task)}>
                        <FiEdit size={14} color="fff" />
                    </button>
                }

                <button
                    type="button"
                    className="delete"
                    onClick={() => controlConfirmModal({  taskTitle: task.description, taskId: task.id, isOpen: true })}
                >
                    <FiTrash size={14} color="fff" />
                </button>
            </div>
        </Container>
    )
};

export default TaskItem;