require("dotenv").config();

const express = require("express");
const path = require("path");

const app = express();
const route = require("./route.js");

//middleware
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

//Access either env or default port
const PORT = 3000 || process.env.PORT;

app.use(express.static(path.join(__dirname, '../client/dist')));

// routes
// app.get('/cart', route.getImages);

// product routes
app.get('/products', route.getProducts);

// review routes
// app.get('/reviews', )

// cart routes
app.get('/cart', route.getCart);
app.post('/cart', route.createCart);

// interaction routes
app.post('/interations', route.createInterations);

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});

module.exports.app = app;