const mongoose = require('mongoose')

const DegreeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "please enter degree title"],
        minlength: 3,
        maxlength: 50
    },
    instituteName: {
        type: String,
        required: [true, "please institute issueing the degree"]
    },
    acquiredBy: {
        type: mongoose.Types.ObjectId,
        ref: 'Student',
        required: [true, 'please provide a student']
    },
    startDate: {
        // optional: when they started acquiring the degree, yearAcquired could be considered the last year
        type: Date,
    },
    yearAcquired: {
        type: Date,
        required: [true, "please date degree was acquired"]
    },
    description: {
        type: String,
        // required: [true, "please enter scholarship description"],
        minlength: 15,
        maxlength: 500
    },
    // only if applicable
    academicLevel: {
        type: String,
        enum: ["highschool", "bachelor's", "master's", "phd"]
    },
    gpa: {
        type: Number,
        min: 2.0,
        max: 4.0
    },
    fieldOfStudy: {
        type: String,
    }
})

module.exports = mongoose.model('Degree', DegreeSchema)