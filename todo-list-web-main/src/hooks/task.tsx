import React, { createContext, useCallback, useContext, useState } from 'react';
import { ConfirmModalControl } from '../components/confirm-modal';
import { ToastContainer, toast } from 'react-toastify';
import api from '../services/api';

export enum TaskState {
    complete = 'COMPLETE',
    incomplete = 'INCOMPLETE',
}

export interface Task {
    id: string;
    description: string;
    state: TaskState;
    createdAt: Date;
    completedAt: Date | null;
}

export interface UpdateTask {
    needUpdate: boolean;
    needLoader: boolean;
}

interface TaskContextData {
    editTaskTitle: Task;
    confirmModalControl: ConfirmModalControl;
    controlLoaderDeleteTask: boolean;
    updateTaskList: UpdateTask;
    getTasks(_filterBy: string, _orderBy: string): Promise<Task[]>;
    createTask(taskName: string): Promise<void>;
    updateTask(task: Task): Promise<void>;
    editTask(task: Task): Promise<void>;
    controlConfirmModal(data: ConfirmModalControl): Promise<void>;
    deleteTask(taskId: string): Promise<void>;
    controlUpdateTaskList(state: boolean): void;
}

const TaskContext = createContext<TaskContextData>({} as TaskContextData);

export const TaskProvider: React.FC = ({ children }) => {
    const [editTaskTitle, setEditTaskTitle] = useState<Task>({} as Task);
    const [confirmModalControl, setConfirmModalControl] = useState<ConfirmModalControl>({} as ConfirmModalControl);
    const [controlLoaderDeleteTask, setControlLoaderDeleteTask] = useState<boolean>(false);
    const [updateTaskList, setUpdateTaskList] = useState<UpdateTask>({ needUpdate: true, needLoader: true });

    const getTasks = useCallback(async (_filterBy: string, _orderBy: string) => {
        const _tasks = await api.get<Task[]>(`tasks?filterBy=${_filterBy}&orderBy=${_orderBy}`);
        return _tasks.data;
    }, []);

    const createTask = useCallback(async (description: string) => {
        await api.post<Task>('tasks', { description });
        toast.success('Task created');
        setUpdateTaskList({ needUpdate: true, needLoader: false });
    }, []);

    const updateTask = useCallback(async (task: Task) => {
        const response = await api.patch<{message: string}>(`tasks/${task.id}`, task);
        toast.success(response.data.message);
        setUpdateTaskList({ needUpdate: true, needLoader: false });
    }, []);

    const editTask = useCallback(async (task: Task) => {
        setEditTaskTitle(task);
    }, []);

    const controlConfirmModal = useCallback(async (data: ConfirmModalControl) => {
        setConfirmModalControl(data);
    }, []);

    const deleteTask = useCallback(async (taskId: string) => {
        setControlLoaderDeleteTask(true);
        const response = await api.delete<{message: string}>(`tasks/${taskId}`);
        toast.success(response.data.message);
        setUpdateTaskList({ needUpdate: true, needLoader: false });
        setControlLoaderDeleteTask(false);
        setConfirmModalControl({ isOpen: false, taskId });
    }, []);

    const controlUpdateTaskList = useCallback((state: boolean) => {
        setUpdateTaskList({ needUpdate: state, needLoader: state });
    }, []);
    
    return (
        <TaskContext.Provider
            value={{
                editTaskTitle,
                confirmModalControl,
                controlLoaderDeleteTask,
                updateTaskList,
                getTasks,
                createTask,
                updateTask,
                editTask,
                controlConfirmModal,
                deleteTask,
                controlUpdateTaskList,
            }}
        >
            {children}
            
            <ToastContainer />
        </TaskContext.Provider>
    );
}

export function useTask(): TaskContextData {
    const context = useContext(TaskContext);

    if (!context) {
        throw new Error('useTask must be used within an TaskContext');
    }

    return context;
}
