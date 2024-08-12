import mongoose,{Schema} from "mongoose";

const personSchema = new Schema({
    name:{
        type: String,
        required: true,
        trim: true
    },
    designation:{
        type: String,
        required: true,
        trim: true
    },
    description:{
        type: String,
        required: true,
        trim: true
    }
},{
    timestamps: true
})

export const Person = mongoose.model("person",personSchema)
