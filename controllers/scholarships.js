const Scholarship = require('../models/Scholarship')
const {StatusCodes} = require('http-status-codes')
const {BadRequestError, NotFoundError} = require('../errors')

const getAllScholarships = async(req, res) => {
    const { title, providedBy, fieldOfStudy, requiredDegree, applyDate, deadline, gpa, isArchived, languageTest, languageLevelLetter, funding, sort, fields } = req.query
    const queryObject = {}
    let englishLevel = ["A1", "A2", "B1", "B2", "C1", "C2"]

    if(title) {
        queryObject.title = {$regex: title, $options: "i" }
    }
    if(providedBy) {
        queryObject.providedBy = {$regex: providedBy, $options: "i" }
    }
    if(fieldOfStudy) {
        queryObject.fieldOfStudy = {$regex: fieldOfStudy, $options: "i" }
    }
    if(requiredDegree) {
        queryObject.requiredDegree = {$regex: requiredDegree, $options: "i" }
    }
    if(applyDate) {
        queryObject.applyDate = new Date(applyDate)
    }
    if(deadline) {
        queryObject.deadline = new Date(deadline)
    }
    if(gpa) {
        // get all the scholarships that match the students GPA, plus all the ones that are less than it (basically all scholarships that qualify)
        queryObject.minimumGPA = {$lte: parseFloat(gpa)}
    }
    if(isArchived) {
        queryObject.isArchived = isArchived === 'true' ? true : false
    }
    if(languageTest) {
        queryObject.languageTest = languageTest
    }
    if(languageLevelLetter) {
        // queryObject.languageLevelLetter = languageLevelLetter
        let numOfLevels = englishLevel.indexOf(languageLevelLetter) + 1
        englishLevel.splice(numOfLevels)
    }
    if(funding) {
        queryObject.funding = funding
    }

    // console.log(queryObject)

    let result = Scholarship.find(queryObject).where('languageLevelLetter').in(englishLevel)

    if(sort) {
        const sortList = sort.split(",").join(" ")
        result = result.sort(sortList)
    } else {
        result = result.sort("createdAt")
    }
    if(fields) {
        const fieldsList = fields.split(",").join(" ")
        result = result.select(fieldsList)
    }

    // pagination & limiting number of scholarships returned
    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 10
    const skip = (page - 1) * limit

    result = result.skip(skip).limit(limit)

    const scholarships = await result
    res.status(StatusCodes.OK).json({scholarships, count: scholarships.length})
}

const getAllScholarshipApplications = async(req, res) => {
    const studentID = req.user.userID

    // new for filteration:
    const { title, providedBy, fieldOfStudy, requiredDegree, applyDate, deadline, gpa, isArchived, languageTest, languageLevelLetter, funding, sort, fields } = req.query
    const queryObject = {}
    let englishLevel = ["A1", "A2", "B1", "B2", "C1", "C2"]

    if(title) {
        queryObject.title = {$regex: title, $options: "i" }
    }
    if(providedBy) {
        queryObject.providedBy = {$regex: providedBy, $options: "i" }
    }
    if(fieldOfStudy) {
        queryObject.fieldOfStudy = {$regex: fieldOfStudy, $options: "i" }
    }
    if(requiredDegree) {
        queryObject.requiredDegree = {$regex: requiredDegree, $options: "i" }
    }
    if(applyDate) {
        queryObject.applyDate = new Date(applyDate)
    }
    if(deadline) {
        queryObject.deadline = new Date(deadline)
    }
    if(gpa) {
        // get all the scholarships that match the students GPA, plus all the ones that are less than it (basically all scholarships that qualify)
        queryObject.minimumGPA = {$lte: parseFloat(gpa)}
    }
    if(isArchived) {
        queryObject.isArchived = isArchived === 'true' ? true : false
    }
    if(languageTest) {
        queryObject.languageTest = languageTest
    }
    if(languageLevelLetter) {
        // queryObject.languageLevelLetter = languageLevelLetter
        let numOfLevels = englishLevel.indexOf(languageLevelLetter) + 1
        englishLevel.splice(numOfLevels)
    }
    if(funding) {
        queryObject.funding = funding
    }
    // END OF FILTERS
    
    if(!studentID) {
        throw new BadRequestError("no student ID was found...")
    }
    
    // using filters to query students applied to scholarships with the filters:
    queryObject.applierID = studentID
    const scholarships = await Scholarship.find(queryObject)

    // const scholarships = await Scholarship.find({applierID: studentID})
    res.status(StatusCodes.OK).json({scholarships})
}

const getScholarship = async(req, res) => {
    const scholarshipID = req.params.id
    if(!scholarshipID) {
        throw new BadRequestError('sholarship ID must be provided')
    }
    const scholarship = await Scholarship.findOne({_id: scholarshipID})
    if(!scholarship) {
        throw new NotFoundError(`scholarship with the id: ${scholarshipID} was not found...`)
    }
    res.status(StatusCodes.OK).json({ scholarship })
}

const createScholarship = async(req, res) => {
    const newscholarship = Scholarship.create({...req.body})
    res.status(StatusCodes.CREATED).json({scholarship: newscholarship, msg: "created scholarship successfully!"})
}

const updateScholarship = async(req, res) => {

    const scholarshipID = req.params.id

    if(!scholarshipID) {
        throw new BadRequestError('sholarship ID must be provided')
    }

    const updatedScholarship = await Scholarship.updateOne({_id: scholarshipID}, req.body, {
        new: true,
        runValidators: true,
    })

    res.status(StatusCodes.OK).json({ scholarship: updatedScholarship, msg: "updated scholarship" })
}

const deleteScholarship = async(req, res) => {
    const scholarshipID = req.params.id
    if(!scholarshipID) {
        throw new BadRequestError('sholarship ID must be provided')
    }
    const deletedScholarship = await Scholarship.deleteOne({_id: scholarshipID})
    if(!deletedScholarship) {
        throw new NotFoundError(`scholarship with id: ${scholarshipID} was not found...`)
    }
    res.status(StatusCodes.OK).json({ scholarship: deletedScholarship ,msg: "scholarship was deleted" })
}

module.exports = { getAllScholarships, getScholarship, getAllScholarshipApplications, createScholarship, updateScholarship, deleteScholarship }