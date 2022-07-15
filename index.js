
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

const router = require('./routes/washingMachine')
require('./config/database')
const app = express();

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors());

app.use('/wdata', router)

const port =  5000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})