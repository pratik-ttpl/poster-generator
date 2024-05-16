import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
    },
    userId: {
        type: String,
    },
    userTemplate: {
        type: String,
        required: true,
    },
    posterName: {
        type: String,
    },
    createdDate: {
        type: Date,
        default: Date.now,
    },
});

const User = mongoose.model("user", userSchema);

export default User;
