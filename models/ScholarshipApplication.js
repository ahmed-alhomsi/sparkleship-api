const mongoose = require('mongoose')

const ScholarshipApplicationSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "please enter scholarship title"],
        minlength: 3,
        maxlength: 50
    },
    applierID: {
        type: mongoose.Types.ObjectId,
        ref: 'Student',
        required: [true, 'please provide a student ID']
    },
    link: {
        type: String,
         // match: [/^(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})(\.[a-zA-Z0-9]{2,})?\/[a-zA-Z0-9]{2,}$/, "please enter a valid link"], // make this a regular expression to match links (source: https://www.freecodecamp.org/news/how-to-write-a-regular-expression-for-a-url/) PLEAES NOTE: I HAVEN'T TESTED IT YET!!!!
    },
    applyDate: {
        type: Date,
        required: [true, "please enter scholarship start date"]
    },
})

module.exports = mongoose.model('ScholarshipApplication', ScholarshipApplicationSchema)