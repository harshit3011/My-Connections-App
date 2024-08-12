import express from "express"
import cors from "cors"
import personRoutes from "./routes/person.routes.js"

const app = express()

const corsOptions = {
    origin: "http://localhost:5173", 
    credentials: true, 
  };
  

app.use(cors(corsOptions));

app.use(express.json({limit: "50mb"}))
app.use(express.urlencoded({extended: true, limit:"50mb"}))
app.use(express.static("public"))

app.use("/api/connection",personRoutes)

export {app}