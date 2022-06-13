import express from "express"
import cors from "cors"
import dotenv from 'dotenv';
dotenv.config();

const app = express();

app.use(cors());

app.get('/api', (req, res) => {
    res.send("Hello from Curie-server");
})

app.listen(5000, () => {
    console.log("CURIE SERVER LISTENING ON PORT 5000...");
});
