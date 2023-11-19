import { shade } from 'polished';
import styled, { css } from 'styled-components';

interface ContainerProps {
    lastTask: boolean;
    isCompleted: boolean;
}

export const Container = styled.div<ContainerProps>`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px;
    border: 1px solid #9a3333;
    border-bottom: 0;

    ${(props) => props.lastTask && css`
        border-bottom: 1px solid #9a3333;
    `}

    > div {
        display: flex;
        align-items: center;
    }

    label {
        margin-top: 0 !important;
        display: flex;
        align-items: center;
        font-size: 0.875em;
        cursor: pointer;

        ${(props) => props.isCompleted && css`
            text-decoration: line-through;
        `}

        input {
            margin-right: 15px;
        }
    }

    button {
        width: 30px;
        height: 30px;
        border: 0;
        margin-left: 5px;
        border-radius: 5px;

        &.edit {
            background-color: #4a9bed;

            &:hover {
                background-color: ${shade(0.2, '#4a9bed')};
            }
        }

        &.delete {
            background-color: #dd1717;
        
            &:hover {
                background-color: ${shade(0.2, '#dd1717')};
            }
        }
    }
`;
