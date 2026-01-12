const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const db = require('./utils/database');
const hendleError = require('./middlewares/error.middleware');

const app = express();

app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

db.authenticate()
    .then(() => console.log('Authenticate complete'))
    .catch(error => console.log(error));
    
db.sync({ force: false })
    .then(() => console.log('Synchronized database'))
    .catch(error => console.log(error));

app.get('/', (req, res) => {
    console.log('Bienvenido al server');
});

app.use(hendleError);

module.exports = app;