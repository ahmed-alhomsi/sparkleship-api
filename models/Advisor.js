const mongoose = require('mongoose')
// const Degree = require('./Degree')

const AdvisorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "please enter advisor's name"],
        minlength: 3,
        maxlength: 50
    },
    password: {
        type: String,
        required: [true, "please enter a password"],
        minlength: 6,
        maxlength: 100
    },
    email: {
        type: String,
        required: [true, "please enter an email"],
        minlength: 3,
        maxlength: 50,
        match: [/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, "please enter a valid email!"],
        unique: true
    },
    accountStatus: {
        type: String,
        enum: ["pending", "approved"],
        default: "pending"
    },
    description: {
        type: String,
        // required: [true, "please enter scholarship description"],
        minlength: 15,
        maxlength: 500
    },
    degrees: [{type: mongoose.Types.ObjectId, ref: 'Degree'}],
    academicLevel: {
        type: String,
        enum: ["highschool", "bachelor's", "master's", "phd"]
    },
    fieldOfStudy: {
        type: String,
    },
    cv: {
        // should it be a normal string? should we change it to mongoose.Types.ObjectId referencing CV document?
        type: String
    }
})

module.exports = mongoose.model('Advisor', AdvisorSchema)