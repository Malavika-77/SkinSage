const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
dotenv.config();
const http = require('http');
const WebSocket = require('ws');
const app = express();
app.use(cors());
app.use(express.json());






const mongoURI ='mongodb+srv://malavikaraju77:ClGCwddTVxdv45Xa@storyteller.oarxhzg.mongodb.net/skinsage?retryWrites=true&w=majority&appName=storyteller';


// Connect to MongoDB Atlas
mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// Define the schema for the storyadmin model
const User = mongoose.model('User', {
    username: String,
    password: String
  });
// Register the storyadmin model with the defined schema

// MongoDB Schema and Model (example)
const Product = mongoose.model('Product', {
    name: String,
    img: String,
    description: String,
    howToUse: String,
    buyLink: String
  });
  const Enquiry = mongoose.model('Enquiry', {
    name: String,
    email: String,
    message: String,
  });

app.use(express.static(path.join(__dirname, 'build')));
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.post('/api/authenticate', async (req, res) => {
    const { username, password } = req.body;
    console.log('Received username:', username);
    try {
      const user = await User.findOne({ username });
  
      console.log('Retrieved user:', user); // Add this line for debugging
  
      if (!user) {
        return res.status(401).send('User not found');
      }
  
      // Compare passwords without hashing
      if (user.password !== password) {
        return res.status(401).send('Invalid password');
      }
  
      res.status(200).send({ success: true, message: 'Authenticated' });
    } catch (err) {
      console.error('Authentication error:', err);
      res.status(500).send('Authentication failed');
    }
  });
  
  
  app.post('/api/products', async (req, res) => {
    const { name, img, description, howToUse, buyLink } = req.body;
  
    const newProduct = new Product({
      name,
      img,
      description,
      howToUse,
      buyLink
    });
  
    try {
      await newProduct.save();
      res.status(201).json({ success: true, message: 'Product added successfully' });
    } catch (error) {
      console.error('Error adding product:', error);
      res.status(500).json({ success: false, message: 'Failed to add product' });
    }
  });
  app.get('/products', async (req, res) => {
    try {
        const products = await Product.find(); // Fetch all products from MongoDB
        res.json(products); // Send products as JSON response
      } catch (err) {
        console.error('Error fetching products:', err);
        res.status(500).json({ message: 'Server error' });
      }
    });
  
    app.post('/api/enquiries', async (req, res) => {
      const { name, email, message } = req.body;
      const newEnquiry = new Enquiry({
        name,
        email,
        message,
      });
      try {
        await newEnquiry.save();
        res.status(201).json({ success: true, message: 'Enquiry submitted successfully' });
      } catch (error) {
        console.error('Error submitting enquiry:', error);
        res.status(500).json({ success: false, message: 'Failed to submit enquiry' });
      }
    });
    app.get('/enquiries', async (req, res) => {
      try {
        const enquiries = await Enquiry.find().sort({ createdAt: -1 }); // Sort by latest
        res.json(enquiries);
      } catch (err) {
        console.error('Error fetching enquiries:', err);
        res.status(500).json({ message: 'Server error' });
      }
    });
    

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
