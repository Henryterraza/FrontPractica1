import {React, useState, useEffect} from 'react';
import { useRouter } from 'next/router';
import { NEW_PLAYLIST } from '../../services/NewPlaylist';

import './Sidebar.css'; // Archivo de estilos


function Sidebar({handleRadioClick, setPerfil, Playlists, UpdatePlaylist, user, UpdateCanciones, setActPlaylists, SongPlaylist}) {

  const [showPlaylists, setShowPlaylists] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [cove, setCove] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
 
  const router = useRouter(); 
  
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setIsAdmin(parsedUser.rol === 'Admin');
    }
  }, []);

  const handleInicioClick = () => {
    console.log("home")
    setPerfil(false)
    router.push('/home');
    UpdateCanciones();
  };

  const handlePlaylistToggle = () => {
    UpdatePlaylist();
    setShowPlaylists(!showPlaylists); // Alternar la visibilidad de la lista de playlists
  };

  const handlePlaylistClick = (playlist) => {
    setActPlaylists(playlist);
    SongPlaylist(playlist.id);
  };

  const handleFavoriteClick = () => {
    const perfilFav = {
      name: "Favorite",
      id: -1,
      cover: "favorito.png",
      description: ""
    }

    handlePlaylistClick(perfilFav);
  };

  const handleNewPlaylistClick = () => {
    setShowModal(true);
  };

  const handleAdminClick = () => {
    router.push('/admin');
  }


  const handleCreatePlaylist = async() => {



    const res_data = {
      "name": name,
      "description": descripcion,
      "cover": cove,
      "id_user": "7",
    }


    try {
      const updatedUser = new FormData();
      updatedUser.append('name', name);
      updatedUser.append('description', descripcion);
      updatedUser.append('cover', cove);
      updatedUser.append('id_user', user.toString());


      const result = await NEW_PLAYLIST(updatedUser);
      console.log(result)
      if (result.status) {
        console.log('Add successful:', result);

      } else {
        console.log(result.message);
      }
    } catch (error) {
      console.log('No se logro conectarse');
    } 


    
    // Aquí podrías hacer una solicitud para guardar la nueva playlist
    setShowModal(false);
    UpdatePlaylist();
  };

  const handleCancel = () => {
    setShowModal(false);
  };

  return (
    <div className="sidebar">
      <div className="logo"> 
        <img src="logo.png" alt="Logo" />
      </div>
      <ul>
        <li onClick={handleInicioClick}>
        <img src="casa.png" alt="Home Icon" className="icon" />
        Inicio</li>
        <li onClick={handleRadioClick}>
        <img src="radio.png" alt="Radio Icon" className="icon" />
        Radio</li>
        <div className="playlist-header">
          <li onClick={handlePlaylistToggle}>
          <img src="playlist.png" alt="Playlist Icon" className="icon" />
          Playlist</li>
          <button onClick={handleNewPlaylistClick} className="new-playlist-btn">➕</button>
        </div>
        {isAdmin && (
          <li onClick={handleAdminClick}>
            <img src="admin.png" alt="Administrador" className="icon" />
            Administrador
          </li>
        )}
      </ul>
      {showPlaylists && ( // Renderizar la sección de playlists solo si showPlaylists es true
        <div className="playlist-section">
          <div key="1" className="playlist-item" onClick={() => handleFavoriteClick()}>
              <img src="favorito.png" alt={"favorito"} className="playlist-image"/>
              <div className="playlist-details">
                <p>Favoritos</p>
              </div>
            </div>
          {Playlists.map((playlist, index) => (
            <div key={index} className="playlist-item" onClick={() => handlePlaylistClick(playlist)}>
              <img src={playlist.cover} alt={playlist.name} className="playlist-image"/>
              <div className="playlist-details">
                <p>{playlist.name}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Crear Nueva Playlist</h2>
            <input
              type="text"
              name="name"
              placeholder="Nombre de la playlist"
              onChange={(e)=> setName(e.target.value)}
            />
            <textarea
              name="description"
              placeholder="Descripción"
              onChange={(e)=> setDescripcion(e.target.value)}
            />
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={(e) => setCove(e.target.files[0])}
            />
            <button className='button-crear' onClick={handleCreatePlaylist}>Crear</button>
            <button className='button-cancelar' onClick={handleCancel}>Cancelar</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Sidebar;
