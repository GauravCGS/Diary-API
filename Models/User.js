import { Schema,model } from "mongoose"; 

const UserSchema = new Schema({
    email:{
        type:String,
        required:[true, 'please enter an email'],
        uniquie:true,
        match: [/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,'Please provide valid email']
    },
    password:{
        type:String,
        required:[true,'password is required'],
        minlength:6
    }

}, {
    collection: 'users',
    timestamps: true
});

export default model('User',PostSchema);