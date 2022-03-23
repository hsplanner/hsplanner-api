import mongoose from "mongoose";

const { Schema, model } = mongoose;

const UserSchema = new Schema({
    name: {type: String, require: true},
    username: {type: String, require: true, lowercase: true, unique: true},
    email: {type: String, require: true},
    birthdate: {type: Date, require: true},
    passwordHash: {type: String, require: true},
    userType: {type: Number, default: 0}
});

const User = model('User', UserSchema)

export default User;
