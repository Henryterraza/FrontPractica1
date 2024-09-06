import {React, useState} from 'react';
import { useRouter } from 'next/router';
import './Navbar.css'; // Asegúrate de crear un archivo CSS para los estilos
import Cookies from 'js-cookie';

function Navbar({ setShowPlaylist, Canciones, setCanciones , UpdateCanciones}) {

  const router = useRouter(); 


  const handleInputChange = (event) => {
    const value = event.target.value;

    setShowPlaylist(false);

    if (value==""){
      UpdateCanciones();
    }else{
       // Filtrar los elementos que coinciden con el valor ingresado
    const filteredItems = Canciones.filter(item => 
      item.name.toLowerCase().includes(value.toLowerCase())
    );

    // Imprimir las coincidencias en la consola
    setCanciones(filteredItems);
    }

   
  };

  const handleInicioClick = () => {
    router.push('/profile');

  };

  const handleSignout = () => {
    Cookies.remove('user');
    localStorage.removeItem('user');
    router.push('/login');

  };


  

  return (
    <div className="navbar">
      <div className="navbar-left">
        <button className="profile-icon" onClick={handleInicioClick}>
          <img src="Usuario.png" alt="Profile" />
        </button>
      </div>
      <div className="navbar-center">
        <input onChange={handleInputChange} type="text" placeholder="Buscar..." className="search-input" />
      </div>
      <div className="navbar-right">
        <i className="fa fa-sign-out-alt" aria-hidden="true"></i>
        <p onClick={handleSignout}>Sign out</p>
      </div>
    </div>
  );
}

export default Navbar;
