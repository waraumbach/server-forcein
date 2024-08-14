import {Schema} from 'mongoose'
import mongoose from 'mongoose'


const category = new Schema({
    name : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    }  
})

category.index({name: 'text'})

const CategoryModel = mongoose.model('Category', category)

export default CategoryModel