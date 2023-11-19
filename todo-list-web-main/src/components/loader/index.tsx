import React from 'react';
import { Container } from './styles';
import { FaSpinner } from 'react-icons/fa';

interface LoaderConfig {
    size?: number;
}

const Loader: React.FC<LoaderConfig> = ({ size }) => {

    return (
        <Container>
            <FaSpinner size={size || 35} className="spinner" />
        </Container>
    )
};

export default Loader;