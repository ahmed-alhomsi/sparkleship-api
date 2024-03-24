const mongoose = require('mongoose')

const EssaySchema = new mongoose.Schema({
    text: {
        type: String,
        required: [true, "please enter degree title"],
        // based on a google search: essays should be 500 - 600 WORDS (and no more), average word length is 5, we multiply and get 2500 LETTERS
        minlength: 1000,
        maxlength: 4000
    },
    writtenBy: {
        type: mongoose.Types.ObjectId,
        ref: 'Student',
        required: [true, 'please provide a student']
    },
    strengthPercentage: {
        // how good this essay is, to be evaluated by AI, and then proofread by an advisor
        type: Number,
        min: 0, 
        max: 100
    },
})

module.exports = mongoose.model('Essay', EssaySchema)