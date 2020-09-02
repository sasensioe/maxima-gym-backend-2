
require('dotenv').config();

const express = require('express');
const cors = require('cors');

const { dbConnection } = require('./database/config');

// server
const app = express();

// cors
app.use(cors());

// parse body
app.use(express.json());

// database connection
dbConnection();

// routes
app.use('/api/articles', require('./routes/articles.routes'));
app.use('/api/users', require('./routes/users.routes'));
app.use('/api/login', require('./routes/auth.routes'));
app.use('/api/all', require('./routes/search.routes'));
app.use('/api/images', require('./routes/images.routes'));
app.use('/api/info-requests', require('./routes/info-requests.routes'));

// server init
app.listen(process.env.PORT, () => {
    console.log('Listening in port ' + process.env.PORT)
})