import mongoose from "mongoose"
import { Person } from "../models/person.model.js"



const createConnections = async(req,res)=>{
    const {name,designation,description} = req.body

        if(!name?.trim() || !designation?.trim() || !description?.trim()){
       return res.status(400).json({message: "All the fields are required"})
        }
        const maxLength = 600
        if(description.length>maxLength){
            return res.status(400).json({message:`Text must be less then ${maxLength} characters`})
        }    
    try {
        
        const newPerson = new Person({
            name,
            designation,
            description
        })
        await newPerson.save()
        
        const createdPerson = await Person.findById(newPerson._id)
        if(!createdPerson){
            return res.status(500).json({message: "Something went wrong while creating a person"})
        }
        res.status(201).json({
            message: "A connection created successfully!",
            connection: createdPerson
        })
    } catch (error) {
        res.status(500).json({ message: error.message })
        console.log(error)
    }  
}

const getAllConnections= async(req,res)=>{
    try {
        const people = await Person.find()

    if(!people || people.length===0){
        return res.status(404).json({message: "Sorry! No connections found!"})
    }
    res.status(200).json({
        message:"Connections found",
        connections: people
    })
    } catch (error) {
        res.status(500).json({ message: error.message })
        console.log(error)
    }
}

const updateConnection = async (req,res)=>{
    console.log(req.params.id.toString())
    const id = req.params.id.toString()
    const person = req.body
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({message:"Person not found"})
    }
    try {
        const updatedPerson = await Person.findByIdAndUpdate(id,person,{new:true})
        res.status(200).json({ 
            message: "Connection updated successfully", 
            newperson: updatedPerson
        })
    } catch (error) {
        res.status(500).json({ message: error.message })
        console.log(error)
    }
}

const deleteConnection = async(req,res)=>{
    const id = req.params.id.toString()
    const person = await Person.findById(id)

        if(!person){
            return res.status(404).json({message: "No such connection exists!"})
        }
    try {
        await Person.deleteOne({_id:id})
        return res.status(200).json({
            message:"Connection deleted succesfully"
        })

    } catch (error) {
        res.status(500).json({ message: error.message })
        console.log(error)
    }
}

export {createConnections,getAllConnections,updateConnection,deleteConnection}