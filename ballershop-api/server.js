const express = require('express');
const mongoose = require('mongoose');
const Product = require('./models/ProductSchema');
const Order = require('./models/OrderSchema');
const cors = require('cors');
const morgan = require('morgan');
const User = require('./models/UserSchema');

try {
  require('dotenv').config();
} catch (error) {
  console.error('Error loading .env file:', error);
}


const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

const dbURI = process.env.MONGO_URL;
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(result => {
    app.listen(5001, () => console.log("Server started on port 5001"))
    console.log("Connected to MongoDB");
  })
  .catch(err => console.log(err));

// Routes for products
app.get('/product', (req, res) => {
  Product.find()
    .then(products => {
      res.json(products);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    });
});

app.post('/product', (req, res) => {
  const productData = req.body;
  const product = new Product(productData);

  product.save()
    .then(() => {
      res.status(201).json({ message: 'Product added successfully' });
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    });
});

app.delete('/product/:id', (req, res) => {
  const productId = req.params.id;

  Product.findByIdAndDelete(productId)
    .then(deletedProduct => {
      if (!deletedProduct) {
        return res.status(404).json({ error: 'Product not found' });
      }
      res.json({ message: 'Product deleted successfully' });
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    });
});

// Routes for orders
app.get('/order', (req, res) => {
  Order.find()
    .then(orders => {
      res.json(orders);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    });
});

app.post('/order', (req, res) => {
  const orderData = req.body;
  const order = new Order(orderData);

  order.save()
    .then(() => {
      res.status(201).json({ message: 'Order added successfully' });
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    });
});

app.delete('/order/:id', (req, res) => {
  const orderId = req.params.id;
  
  Order.findByIdAndDelete(orderId)
    .then(deletedOrder => {
      if (!deletedOrder) {
        return res.status(404).json({ error: 'Order not found' });
      }
      res.json({ message: 'Order deleted successfully' });
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    });
});

app.post('/register', (req, res) => {
  const userData = req.body;

  const user = new User(userData);

  user.save()
    .then(() => {
      res.status(201).json({message: 'User registered successfully'});
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error'});
    })
}) 

app.post('/login', async (req, res) => {
  const {username, password} = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) { 
      return res.status(404).json({ error: 'user not found'})
    }

    if (user.password !== password) {
      return res.status(401).json({ error: 'Incorrect password'})
    }
    res.json({ message: 'Login successfully', user });
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Internal Server Error'})
  }
})

// Route to get user by ID
app.get('/user/:id', (req, res) => {
  const userId = req.params.id;

  User.findById(userId)
    .then(user => {
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.json(user);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    });
});
