const Scholarship = require('../models/Scholarship')
const {StatusCodes} = require('http-status-codes')
const {BadRequestError, NotFoundError} = require('../errors')

const getAllScholarships = async(req, res) => {
    const scholarships = await Scholarship.find({}).sort("createdAt")
    res.status(StatusCodes.OK).json({scholarships, count: scholarships.length})
}

const getAllScholarshipApplications = async(req, res) => {
    const studentID = req.user.userID
    if(!studentID) {
        throw new BadRequestError("no student ID was found...")
    }
    const scholarships = await Scholarship.find({applierID: studentID})
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