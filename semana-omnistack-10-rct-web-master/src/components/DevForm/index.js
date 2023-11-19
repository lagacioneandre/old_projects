import React, { useState, useEffect } from 'react';

function DevForm({ onSubmit, editDev }) {
    const [id, setId] = useState('');
    const [github_username, setGithubUsername] = useState('');
    const [techs, setTechs] = useState('');
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [isDisabled, setIsDisabled] = useState(false);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                setLatitude(latitude);
                setLongitude(longitude);
            }, (err) => {
                console.log(err);
            }, {
            timeout: 30000
        });

        if (!(editDev instanceof Array)) {
            const techs = mapTechs(editDev.techs);
            setId(editDev._id);
            setGithubUsername(editDev.github_username);
            setTechs(techs);
            setLatitude(editDev.location.coordinates[1]);
            setLongitude(editDev.location.coordinates[0]);
            setIsDisabled(true);
        }
    }, [editDev]);

    async function handleSubmit(e) {
        e.preventDefault();

        await onSubmit({
            id,
            github_username,
            techs,
            latitude,
            longitude
        });

        setId('');
        setGithubUsername('');
        setTechs('');
        setIsDisabled(false);
    }

    const mapTechs = (techs) => {
        let _techs = '';
        techs.map(item => _techs += `${item}, `);
        return _techs;
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="input-block">
                <label htmlFor="github_username">Usuário do Github</label>
                <input
                    name="github_username"
                    id="github_username"
                    required
                    value={github_username}
                    onChange={e => setGithubUsername(e.target.value)}
                    disabled={isDisabled}
                />
            </div>

            <div className="input-block">
                <label htmlFor="techs">Tecnologias</label>
                <input
                    name="techs"
                    id="techs"
                    required
                    value={techs}
                    onChange={e => setTechs(e.target.value)}
                />
            </div>

            <div className="input-group">
                <div className="input-block">
                    <label htmlFor="latitude">Latitude</label>
                    <input
                        type="number"
                        name="latitude"
                        id="latitude"
                        required
                        value={latitude}
                        onChange={e => setLatitude(e.target.value)}
                    />
                </div>

                <div className="input-block">
                    <label htmlFor="longitude">Longitude</label>
                    <input
                        type="number"
                        name="longitude"
                        id="longitude"
                        required
                        value={longitude}
                        onChange={e => setLongitude(e.target.value)}
                    />
                </div>
            </div>

            <button type="submit">Salvar</button>
        </form>
    );
}

export default DevForm;