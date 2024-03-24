const mongoose = require('mongoose')

const ScholarshipSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "please enter scholarship title"],
        minlength: 3,
        maxlength: 50
    },
    description: {
        type: String,
        required: [true, "please enter scholarship description"],
        minlength: 15,
        maxlength: 500
    },
    providedBy: {
        // type: mongoose.Types.ObjectId,
        // ref: 'Student',
        // required: [true, 'please provide a student']
        type: String,
        required: [true, "please provide the party providing the scholarship"],
    },
    link: {
        type: String,
         // match: [/^(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})(\.[a-zA-Z0-9]{2,})?\/[a-zA-Z0-9]{2,}$/, "please enter a valid link"], // make this a regular expression to match links (source: https://www.freecodecamp.org/news/how-to-write-a-regular-expression-for-a-url/) PLEAES NOTE: I HAVEN'T TESTED IT YET!!!!
    },
    availableSeats: {
        type: Number,
        min: 1,
        max: 10000
    },
    applyDate: {
        type: Date,
        required: [true, "please enter scholarship start date"]
    },
    deadline: {
        type: Date,
        required: [true, "please enter scholarship deadline"]
    },
    isArchived: {
        type: Boolean,
        default: false
    },
    minimumGPA: {
        type: Number,
        min: 2.0,
        max: 4.0
    },
    location: {
        type: String
    },
    fieldOfStudy: {
        type: String,
    },
    hoursOfWorkExperience: {
        type: Number,
        min: 0,
        max: 10000,
        default: 0
    },
    hoursOfVolunteeringExperience: {
        type: Number,
        min: 0,
        max: 5000,
        default: 0
    },
    languageTest: {
        type: String,
        enum: ["TOEFL", "IELTS", "EITHER"],
        default: "IELTS"
    },
    languageLevelLetter: {
        type: String,
        enum: ["A1", "A2", "B1", "B2", "C1", "C2"]
    },
    funding: {
        type: String,
        enum: ["fully-funded", "partially-funded"],
        default: "fully-funded"
    },
    requiredDegree: {
        type: String,
        enum: ["highschool", "bachelor's", "master's", "phd"],
        default: "bachelor's"
    }
})

module.exports = mongoose.model('Scholarship', ScholarshipSchema)