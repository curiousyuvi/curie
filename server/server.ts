import express, { Request, Response } from "express"
import http from 'http'
import cors from "cors"
import setupSocket from "./src/socket";

global.rooms = new Map()

const port = process.env.PORT || 5000;
const app = express();
const server = http.createServer(app);

const corsOptions = {
    origin: "http://localhost:3000",
    credentials: true,
    optionSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());


app.get('/api/hello', (req: Request, res: Response) => {
    res.send('Hello, World!');
})

setupSocket(server, corsOptions)

server.listen(port, () => {
    console.log("CURIE SERVER LISTENING ON PORT 5000...");
});