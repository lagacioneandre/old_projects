import React from 'react';
import Dashboard from './pages/dashboard';
import GlobalStyles from './styles/global';

const App: React.FC = () => {
    return (
        <>
            <Dashboard></Dashboard>
            <GlobalStyles />
        </>
    );
}

export default App;
