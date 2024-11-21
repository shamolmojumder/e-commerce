import express from 'express';
import colors from 'colors';
import dotenv from 'dotenv'

// configure env
dotenv.config();



//rest object creation
const app = express();


app.get("/", (req, res) => {
    res.send('<h1>Welcomme to our Server</h1>')
})


const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Sever running on${process.env.DEV_MODE} mode on ${PORT}`.bgCyan.white);
})