import express, { Request, Response } from "express"
import http from 'http'
import cors from "cors"
import dotenv from 'dotenv';
import authRoute from './src/routes/authRoute'
import userRoute from './src/routes/userRoute'
import roomRoute from './src/routes/roomRoute'
import musicRoute from './src/routes/musicRoutes'
import connectMongoDB from "./src/services/dbconnect";
import cookieParser from 'cookie-parser'
import setupSocket from "./src/socket";
import path from 'path'


dotenv.config();

connectMongoDB();

global.rooms = new Map()

const port = process.env.PORT || 5000;
const app = express();
const server = http.createServer(app);

const corsOptions = {
    origin: "http://localhost:3000",
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

//---------------------------Deployment--------------------------------

const __dirname1 = path.resolve('../')

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname1, 'client', 'build')))

    app.get('*', (req: Request, res: Response) => {
        res.sendFile(path.resolve(__dirname1, 'client', 'build', 'index.html'))
    })
} else {
    app.get('/', (req: Request, res: Response) => {
        res.send("Hello from Curie-server");
    })
}

//---------------------------Deployment--------------------------------

setupSocket(server, corsOptions)

server.listen(port, () => {
    console.log("CURIE SERVER LISTENING ON PORT 5000...");
});