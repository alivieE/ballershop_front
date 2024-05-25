import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../AuthContext';
import './StartModal.css'

const AuthModal = (props) => {
    const { login } = useAuth();
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
    });

    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value
        }));
        console.log(formData)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();


        const API_URL = 'http://localhost:5001/login';

        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            if(!response.ok) throw new Error('Network response was not ok');

            const data = await response.json();
            login(data.user); 
            console.log(data);
            setSuccess(true);
            setError('')
            setTimeout(() => {
              props.CloseModal();
            }, 2000);
        } catch (error) {
            console.error('There was a problem with your fetch operation:', error);
            setError('Falied to login. Please check your credentials and try again.');
        }
    }

  return (
    <div className='startmodal'>
    <div className='startmodal-top'>
      <img src = "/img/Arrow-Reg.png" onClick={props.GoBack} alt= "Arrow Icon"/>
      <p className='skip-button'  onClick={props.CloseModal}>SKIP</p>
    </div>
    <div className='startmodal-body'>
      <div className='startmodal-left'>
          <img src='/img/player.png'/>
      </div>
      <div className='startmodal-right'>
          <img className='logo-reg' src='/img/Logo Reg.png' alt='Logo Image'/>
          <h1>USER AUTHORIZATION</h1>
          <h2>Enter your username, email, and password here to authorize.</h2>
          {success ? (
              <p className='success'>Authorization successful!</p>
          ):(
            <form onSubmit={handleSubmit}>
            <input className='regInput' name="username" type="text" placeholder="Username" onChange={handleChange} value={formData.username} required />
            <input className='regInput' name="email" type="email" placeholder="Email" onChange={handleChange} value={formData.email} required />
            <input className='regInput' name="password" type="password" placeholder="Password" onChange={handleChange} value={formData.password} required />
            {error && <p className='error'>{error}</p>}
                <button type = "submit" className='sign-button'> SING IN</button>
            </form>
          )}
      </div>
    </div>
  </div>
  )
}

export default AuthModal

