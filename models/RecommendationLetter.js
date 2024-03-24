const mongoose = require('mongoose')

const RecommendationLetterSchema = new mongoose.Schema({
    studentName: {
        type: String,
    },
    issuedBy: {
        type: String,
        required: [true, "please enter the name of the person who issued the letter"]
    },
    issuedTo: {
        // this is a reference to the Student document, different from studentName (the name only)
        type: mongoose.Types.ObjectId,
        ref: 'Student',
        required: [true, "please enter the student who got issued the letter"]
    },
    text: {
        type: String,
        required: [true, "please enter recommendation letter text"],
        minlength: 50,
        maxlength: 500
    },
    dateAcquired: {
        // sometimes scholarships require the recommendation letter to have a date, this is optional
        type: Date,
    }
})

module.exports = mongoose.model('RecommendationLetter', RecommendationLetterSchema)