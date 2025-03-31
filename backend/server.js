const express = require('express')
const userRoutes = require('../backend/routes/userRoutes');
const dotenv = require('dotenv');
const connectDB = require('./db/connectDb');
const app = express()
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { get } = require('mongoose');
dotenv.config(); 

app.use(cors({
    origin: 'http://localhost:5173', 
    credentials: true, // Allow cookies, auth headers
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], 
    optionsSuccessStatus: 200 
}));
app.use(express.urlencoded())
app.use(express.json())
app.use(cookieParser())

const PORT=process.env.PORT||5000

app.use("/user",userRoutes)

connectDB()
console.log('------------------------------');

app.listen(PORT, () => console.log(`Application running on http://localhost:${PORT}`))