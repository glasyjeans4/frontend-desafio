import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [canciones, setCanciones] = useState([]);
  const [ultimaCancion, setUltimaCancion] = useState(null);
  const [generos, setGeneros] = useState([]);

  useEffect(() => {
    const obtenerCanciones = async () => {
      const respuesta = await axios.get('http://localhost:3000/canciones');
      setCanciones(respuesta.data);
    };

    const obtenerUltimaCancion = async () => {
      const respuesta = await axios.get('http://localhost:3000/canciones/ultima');
      setUltimaCancion(respuesta.data);
    };

    const obtenerGeneros = async () => {
      const respuesta = await axios.get('http://localhost:3000/generos');
      setGeneros(respuesta.data);
    };

    obtenerCanciones();
    obtenerUltimaCancion();
    obtenerGeneros();
  }, []);

  return (
    <div className="container">
      <div className="left">
        <h1>Lista de canciones</h1>
        {canciones.map((cancion) => (
          <div className="cancion" key={cancion.id}>{cancion.titulo}</div>
        ))}
        <h1>Lista de géneros</h1>
        {generos.map((genero) => (
          <div className="genero" key={genero.id}>{genero.name}</div>
        ))}
      </div>
      <div className="right">
        <h1>Última canción agregada</h1>
        {ultimaCancion && <div className="ultimaCancion">{ultimaCancion.titulo}</div>}
      </div>
    </div>
  );
}

export default App;
