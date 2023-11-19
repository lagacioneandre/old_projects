import React from 'react';
import Header from '../../components/header';
import TaskInput from '../../components/task-input';
import Tasklist from '../../components/task-list';
import { Container, Content } from './styles';
import 'react-toastify/dist/ReactToastify.css';
import ConfirmModal from '../../components/confirm-modal';
import { TaskProvider } from '../../hooks/task';

const Dashboard: React.FC = () => {

    return (
        <TaskProvider>
            <Container>
                <Header />

                <Content>
                    <TaskInput />
                    <Tasklist />
                </Content>

                <ConfirmModal />
            </Container>
        </TaskProvider>
    )
};

export default Dashboard;