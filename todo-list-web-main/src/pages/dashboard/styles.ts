import styled from 'styled-components';

export const Container = styled.div`
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    overflow: hidden;
`;

export const Content = styled.main`
    padding: 15px;
    height: 100%;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    flex-grow: 1;
`;
