const mongoose = require('mongoose')
const Degree = require('./Degree')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const StudentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "please enter a name"],
        minlength: 3,
        maxlength: 50
    },
    email: {
        type: String,
        required: [true, "please enter an email"],
        minlength: 3,
        maxlength: 50,
        match: [/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, "please enter a valid email!"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "please enter a password"],
        minlength: 6,
        maxlength: 100
    },
    age: {
        type: Number,
        min: 18,
        max: 35
    },
    gender: {
        // true for male, false for female
        // type: Boolean,
        // default: true
        type: String,
        enum: ["male", "female"]
    },
    nationality: {
        type: String
    },
    status: {
        type: String,
        enum: ["highschool student", "bachelor's student", "master's student", "phd student"],
        default: "bachelor's student"
    },
    fieldOfStudy: {
        type: String,
    },
    hoursOfWorkExperience: {
        type: Number,
        min: 0,
        max: 12000,
        default: 0
    },
    hoursOfVolunteeringExperience: {
        type: Number,
        min: 0,
        max: 6000,
        default: 0
    },
    languageTest: {
        type: String,
        enum: ["TOEFL", "IELTS"],
        // default: "IELTS"
    },
    languageLevel: {
        // this could be in IELTS || TOEFL, IELTS is from 1 - 9 and TOEFL is from 0 - 120
        type: Number,
        min: 1,
        max: 120,
    },
    languageLevelLetter: {
        type: String,
        enum: ["A1", "A2", "B1", "B2", "C1", "C2"]
    },
    lookingForScholarship: {
        type: String,
        enum: ["fully-funded", "partially-funded"],
        default: "fully-funded"
    },
    personalStatement: {
        type: String,
    },
    currentResidency: {
        type: String,
    },
    coverLetter: {
        type: String,
    },
    researchProposal: {
        type: String,
    },
    extracurricularActivities: {
        // here we can instruct the Student to type them with a "," in between each activity (for further processing / filtering)
        type: String
    },
    highschoolDegree: {
        type: mongoose.Types.ObjectId,
        ref: 'highschool-degree',
        // required: [true, 'please enter a highschool Degree']
    },
    lastDegreeAcquired: {
        type: mongoose.Types.ObjectId,
        ref: 'degree',
        degreeType: {
            type: String,
            enum: ["bachelors", "masters", "phd"]
        }
    }
})

// StudentSchema.pre('save', async function(next) {
//     const salt = await bcrypt.genSalt(10)
//     this.password = await bcrypt.hash(this.password, salt)
//     next()
// })

StudentSchema.pre('save', async function() {
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

StudentSchema.methods.createJWT = function() {
    return jwt.sign({userID: this._id, name: this.name}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_LIFETIME})
}

StudentSchema.methods.checkPassword = async function(candidatePassword) {
    const matches = await bcrypt.compare(candidatePassword, this.password)
    return matches
}

module.exports = mongoose.model('Student', StudentSchema)
