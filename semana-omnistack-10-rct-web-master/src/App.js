import React, { useState, useEffect } from 'react';
import api from './services/api';

import './global.css';
import './App.css';
import './sidebar.css';
import './main.css';

import DevForm from './components/DevForm';
import DevItem from './components/DevItem';

/*
  criar o update e delete dos registros
*/

function App() {
  
  const [devs, setDevs] = useState([]);
  const [editDev, setEditDev] = useState([]);

  useEffect(() => {
    loadDevs();
  }, []);

  async function loadDevs() {
    const response = await api.get('/devs');
    setDevs(response.data);
  }

  async function handleAddDev(data) {
    if (data.id) {
      await api.put('/devs', data);
    } else {
      await api.post('/devs', data);
    }

    loadDevs();
  }

  async function handleEditDev(devId) {
    const response = await api.get(`/devs/${devId}`);
    setEditDev(response.data);
  }

  async function handleDeleteDev(devId) {
    await api.delete(`/devs/${devId}`);
    loadDevs();
  }

  return (
    <div id="app">
      <aside>
        <strong>Cadastrar</strong>
        <DevForm onSubmit={handleAddDev} editDev={editDev} />
      </aside>

      <main>
        <ul>
          {devs.map(dev => (
            <DevItem key={dev._id} dev={dev} onEditDev={handleEditDev} onDeleteDev={handleDeleteDev} />
          ))}
        </ul>
      </main>
    </div>
  );
}

export default App;
