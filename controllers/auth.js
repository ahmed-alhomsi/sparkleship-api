const Student = require('../models/Student')
const {StatusCodes} = require('http-status-codes')
const {BadRequestError} = require('../errors')
const {UnauthenticatedError} = require('../errors')

const jwt = require('jsonwebtoken')

const register = async(req, res) => {
    // if(!name || !password || !email) {
    //     throw new BadRequestError('must enter a name, email and password!')
    // }

    // const {name, password, email} = req.body

    // const salt = await bcrypt.genSalt(10)

    // const hashedPassword = await bcrypt.hash(password, salt)

    // const tempStudent = {name, email, password: hashedPassword}

    const student = await Student.create({...req.body})
    
    const token = student.createJWT()

    res.status(StatusCodes.CREATED).json({user: {name: student.name }, token})
}

const login = async(req, res) => {
    const {email, password} = req.body
    if(!email || !password) {
        throw new BadRequestError('please provide a username and a password')
    }
    const student = await Student.findOne({email})
    if(!student) {
        throw new UnauthenticatedError("Invalid Credintials")
    }
    const password_is_correct = await student.checkPassword(password)
    if(!password_is_correct) {
        throw new UnauthenticatedError("Invalid Password")
    }
    const token = student.createJWT()
    res.status(StatusCodes.OK).json({user: {name: student.name}, token})
}

module.exports = { register, login }