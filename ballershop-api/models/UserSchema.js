const mongoose = require('mongoose');

const phoneValidator = (phone) => {
    const re = /^\+?[1-9]\d{1,14}$/; // This is a very basic international phone number format validator
    return re.test(phone);
  };

  const emailValidator = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;;\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email.toLowerCase());
  };
  

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true,
        unque: true
    },
    email: {
        type: String,
        require: true,
        unque: true,
        validate: [emailValidator, 'Please fill a valid email address'],
        lowercase: true
    },
    password: {
        type: String,
        require: true
    },
    phone: {
        type: String,        
        validate: [phoneValidator, 'Please fill a valid phone number'],
        unque: true,
        require: [true, 'User phone number required'],       
    },
})

const User = mongoose.model('User', userSchema);

module.exports = User;