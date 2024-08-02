import mongoose, { Schema } from "mongoose";


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

product.index({name: 'text'})

const ProductModel = mongoose.model('Product', product)

export default ProductModel