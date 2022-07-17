import express from "express"
import http from 'http'
import cors from "cors"
import dotenv from 'dotenv';
import authRoute from './routes/authRoute'
import userRoute from './routes/userRoute'
import roomRoute from './routes/roomRoute'
import musicRoute from './routes/musicRoutes'
import connectMongoDB from "./services/dbconnect";
import cookieParser from 'cookie-parser'
import setupSocket from "./socket";

dotenv.config();

connectMongoDB();

global.rooms = new Map()

const port = 5000;
const app = express();
const server = http.createServer(app);

const corsOptions = {
    origin: process.env.CLIENT_URL,
    credentials: true,
    optionSuccessStatus: 200,
};

app.use(cookieParser());
app.use(cors(corsOptions));
app.use(express.json());


app.use('/api/auth', authRoute);
app.use('/api/user', userRoute);
app.use('/api/room', roomRoute);
app.use('/api/music', musicRoute);



app.get('/api/test', (req, res) => {
    res.send("Hello from Curie-server");
})

setupSocket(server, corsOptions)

server.listen(port, () => {
    console.log("CURIE SERVER LISTENING ON PORT 5000...");
});
