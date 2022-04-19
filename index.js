// EXPRESS SETUP
const express = require('express');
const methodOverride = require('method-override');
const collectionController = require('./controllers/collection_controller');

// INSTANCE OF EXPRESS
const app = express();

// EXTERNAL DEPENDENCIES
const mtg = require('mtgsdk');

// MODEL FOR COLLECTION
let collection = require('./models/collection');

// CONFIGURE TEMPLATE ENGINE
app.set('view engine', 'ejs');

// PORT NUMBER TO LISTEN ON
const PORT = 3000;

// CONFIGURE MIDDLEWARE
app.use(express.urlencoded({extended: false}));
app.use(express.static("./public"));
app.use(methodOverride('_method'));

// ROUTERS
app.use('/collection', collectionController);

// ROOT CONTROLLER
app.get('/', (request, response) => response.redirect('/collection'))

// Turn server on to start listening
app.listen(PORT, () => console.log('Not ready yet! Initializing test data...'));