import styled from 'styled-components';

export const Container = styled.header`
    padding: 0 15px;
    display: flex;
    flex-direction: row;
    flex-grow: 0;
    background-color: #9a3333;
    align-items: center;
    justify-content: space-between;
    height: 50px;

    h1 {
        font-size: 1.250em;
        font-weight: bold;
        color: #fff;
    }

    a {
        color: #fff;
        text-decoration: none;
        font-size: 0.875em;

        &:hover {
            text-decoration: underline;
        }
    }
`;
