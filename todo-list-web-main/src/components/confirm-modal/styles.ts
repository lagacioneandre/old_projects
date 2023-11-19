import { shade } from 'polished';
import styled, { css } from 'styled-components';

interface ContainerProps {
    showModal: boolean;
}

export const Container = styled.div<ContainerProps>`
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    left: 0;
    top: -100%;
    opacity: 0;
    z-index: 10;
    background-color: rgba(0, 0, 0, .4);
    width: 100vw;
    height: 100vh;
    transition: all .3s;

    ${(props) => props.showModal && css`
        top: 0;
        opacity: 1;
    `}

    .modal {
        width: 100%;
        max-width: 300px;
        border-radius: 5px;
        overflow: hidden;
        background-color: #fff;

        .top {
            background-color: #9a3333;
            display: flex;
            align-items: center;
            justify-content: space-between;
            height: 30px;
        
            .title {
                font-size: 0.875em;
                color: #fff;
                font-weight: normal;
                margin-left: 10px;
            }

            button {
                width: 30px;
                height: 30px;
                border: 0;
                border-radius: 0 5px 0 0;
                cursor: pointer;

                &:hover {
                    background-color: #ddd;
                }
            }
        }

        .content {
            padding: 15px 10px;
            text-align: center;

            .buttons {
                margin-top: 15px;

                button {
                    padding: 5px 15px;
                    margin: 0 7px;
                    border: 0;
                    color: #fff;
                    border-radius: 5px;

                    &.cancel {
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
            }
        }
    }
`;
