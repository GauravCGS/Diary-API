import { Schema,model } from "mongoose";
import bcrypt from 'bcrypt';
import validator from "validator";
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

//signup
UserSchema.statics.signup = async function(email, password){
    if(!email || !password) throw Error('all fields required');
    if(!validator.isEmail(email)) throw Error('invalid email address');
    // if(!validator.isStrongPassword(password)) throw Error('password is not strong enough');

    const exist = await this.findOne({email});
    if(exist) throw Error('email already registered');

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password,salt);

    const user = await this.create({email, password:hash});

    return user;
}

//login

UserSchema.statics.login = async function(email, password){
    if(!email || !password) throw Error('all fields required');

    const user = await this.findOne({email});
    if(!user) throw Error('email not registered');

    const match = await bcrypt.compare(password, user.password);

    if(!match) throw Error('incorrect password');
    return user;
}



export default model('User',UserSchema);