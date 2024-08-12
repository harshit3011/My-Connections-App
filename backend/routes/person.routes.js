import express from "express"
import { createConnections, deleteConnection, getAllConnections, updateConnection } from "../controllers/person.controllers.js"


const router = express.Router()

router.get("/",getAllConnections)
router.post("/",createConnections)
router.put("/:id",updateConnection)
router.delete("/:id",deleteConnection)

export default router