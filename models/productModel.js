import { Schema } from "mongoose";
import mongoose from "mongoose";


const product = new Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    images : [{
        type : String,
    }],
    
    categoryId : [{
        type : Schema.Types.ObjectId, 
        ref : 'Category', 
        required : true
    }]
})

const newproduct = new Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    images : [{
        type : String,
    }],
    
    categoryId : [{
        type : Schema.Types.ObjectId, 
        ref : 'Category', 
        required : true
    }]
})

product.index({name: 'text'})


const ProductModel = mongoose.model('Product', newproduct)

export default ProductModel