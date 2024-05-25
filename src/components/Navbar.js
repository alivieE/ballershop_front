import React, { useState } from 'react';
import './Navbar.css';
import Modal from '../components/Modal'; 
import ProductForm from './ProductForm';
import { useAuth } from '../AuthContext';
import { Link } from 'react-router-dom';
const Navbar = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { user, logout } = useAuth();
 
  const handleShowModal = () => {
    setIsModalVisible(true);
  };

  const handleHideModal = () => {
    setIsModalVisible(false);
  };

  
  return (
    <nav>
      <Link to = "/">
      <img className="logo" src="/img/logo.png" alt="Logo"/> 
      </Link>     
      <div className="right">
        {user && (
          <React.Fragment>
            <button className="add" onClick={handleShowModal}>ADD AN ITEM</button>
            <p className="profile-name">{user.username}</p>
            <img className="profile" src="/img/profile-icon.png" alt="Profile"/>
          </React.Fragment>
        )}
        
      </div>

      {isModalVisible && (
        <Modal onHideModal={handleHideModal}>
          <ProductForm/>          
        </Modal>
      )}
    </nav>
  );
}

export default Navbar;
