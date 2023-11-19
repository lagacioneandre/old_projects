import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './styles.css';
import { faPencilAlt, faTrashAlt } from "@fortawesome/free-solid-svg-icons";

function DevItem({ dev, onEditDev, onDeleteDev }) {
    async function editDev() {
        await onEditDev(dev._id);
    }

    async function removeDev() {
        await onDeleteDev(dev._id);
    }

    return (
        <li className="dev-item">
            <header>
                <img src={dev.avatar_url} alt={dev.name} />
                <div className="user-info">
                    <strong>{dev.name || dev.github_username}</strong>
                    <span>{dev.techs.join(', ')}</span>
                </div>
            </header>

            <p>{dev.bio}</p>

            <div className="actions">
                <div className="flex w70">
                    <a href={`https://github.com/${dev.github_username}`} target="_blank" rel="noopener noreferrer">Acessar perfil no Github</a>
                </div>

                <div className="flex w30">
                    <button type="button" className="edit" onClick={editDev}>
                        <FontAwesomeIcon icon={faPencilAlt} />
                    </button>
                    <button type="button" className="remove" onClick={removeDev}>
                        <FontAwesomeIcon icon={faTrashAlt} />
                    </button>
                </div>
            </div>
        </li>
    );
}

export default DevItem;