import express from 'express';
import colors from 'colors';
import dotenv from 'dotenv'
import morgan from 'morgan';
import connectDB from './config/db.js';
import authRoutes from "./routes/authRoute.js";

// configure env
dotenv.config();

//database connection 
connectDB();

//rest object creation
const app = express();

//middlewire
app.use(express.json());
app.use(morgan('dev'));


//routers
app.use('/api/1/auth', authRoutes);


app.get("/", (req, res) => {
    res.send('<h1>Welcomme to our Server</h1>')
})


const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Sever running on ${process.env.DEV_MODE} mode on ${PORT}`.bgCyan.white);
})