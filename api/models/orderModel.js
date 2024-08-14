import {Schema} from 'mongoose'
import mongoose from 'mongoose'
import { userAddressSchema } from './userModel.js';

const orderSchema = new Schema({
    products: [{
        productId: {
            type: Schema.Types.ObjectId,
            ref: 'Product',
            required: true
        },
        quantity: {
            type: Number,
            required: true
        }
    }],
    orderDate: {
        type: Date,
        default: Date.now
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    address: userAddressSchema
});

const OrderModel = mongoose.model('Order', orderSchema);

export default OrderModel