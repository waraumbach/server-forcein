import mongoose, {Schema} from 'mongoose'

const userAddressSchema = new Schema({
    name : {
        type : String,
        required : false
    },
    lastName : {
        type : String,
        required : false
    },
    street : {
        addressLine1 : {
            type : String,
            required : false
        },
        addressLine2 : {
            type : String,
        },
        number : {
            type : String,
            required : false
        }
    },
    city : {
        type : String,
        required : false
    },
    postalCode : {
        type : String,
        required : false
    }
},  { _id : false })

const userSchema = new Schema({
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    },
    isAdmin : {
        type : Boolean,
        default : false
    },
    token : {
        type : String,
        required : false
    }, 
    address : userAddressSchema
})




const User = mongoose.model('User', userSchema)


export default User