const express = require('express');
const connectDB = require('./config/db')
const dotenv = require('dotenv');
const authRoute = require('./routes/authRoute');
const applyMiddlewares = require('./middlewares/middleware');
dotenv.config();

const app = express();


applyMiddlewares(app);



connectDB();

app.use('/api/users', authRoute);

app.listen(process.env.PORT, () => {
  console.log(`Server running at http://localhost:${process.env.PORT}`);
});