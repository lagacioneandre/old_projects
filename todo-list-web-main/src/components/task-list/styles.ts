import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 25px;

    h2 {
        font-size: 1.125em;
        cursor: pointer;
    }

    .alert {
        margin: 20px 0;
        padding: 10px;
        background-color: #CBE5FC;
        border: 1px solid #1F85DE;
        color: #1F85DE;
        border-radius: 5px;
    }

    label {
        margin-top: 10px;
        display: flex;
        align-items: center;
        font-size: 0.875em;
        cursor: pointer;

        input {
            margin-left: 5px;
        }
    }
`;

export const Filter = styled.div`
    margin: 25px 0;
    display: flex;

    > div {

    }

    strong {
        font-size: 0.875em;
    }

    .options {
        display: flex;
        align-items: center;
        margin-top: 10px;

        label {
            display: flex;
            align-items: center;
            margin: 0 50px 0 0;

            input {
                margin: 0 5px 0 0;
            }

            .icon {
                margin-left: 5px;
            }
        }
    }
`;
