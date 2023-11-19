import React, { useEffect, useState } from 'react';
import { Container } from './styles';
import { FaTimes } from 'react-icons/fa';
import { useTask } from '../../hooks/task';
import Loader from '../loader';

export interface ConfirmModalControl {
    taskTitle?: string;
    taskId: string;
    isOpen: boolean;
}

const ConfirmModal: React.FC = () => {
    const [showModal, setShowModal] = useState(false);
    const { confirmModalControl, controlLoaderDeleteTask, controlConfirmModal, deleteTask } = useTask();

    useEffect(() => {
        if (confirmModalControl)  {
            setShowModal(confirmModalControl.isOpen);
        }
    }, [confirmModalControl, controlLoaderDeleteTask]);

    const handleCloseModal = () => {
        if (controlLoaderDeleteTask) {
            return;
        }
        
        controlConfirmModal({ isOpen: false, taskId: confirmModalControl.taskId });
    }

    return (
        <Container showModal={showModal}>
            <div className="modal">
                <header className="top">
                    <h3 className="title">Remove task</h3>
                    <button type="button" onClick={handleCloseModal}>
                        <FaTimes size={14} color="9a3333" />
                    </button>
                </header>

                <div className="content">
                    {
                        controlLoaderDeleteTask ? <Loader size={20} />
                        : 
                            <>
                                <p>Would you like to remove the task {confirmModalControl.taskTitle}</p>

                                <div className="buttons">
                                    <button
                                        type="button"
                                        className="cancel"
                                        onClick={handleCloseModal}
                                    >Cancel</button>

                                    <button
                                        type="button"
                                        className="delete"
                                        onClick={() => deleteTask(confirmModalControl.taskId)}
                                    >Delete</button>
                                </div>
                            </>
                    }
                </div>
            </div>
        </Container>
    )
};

export default ConfirmModal;