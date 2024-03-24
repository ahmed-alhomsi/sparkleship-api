const express = require('express')
const router = express.Router()
const { getAllScholarships, getScholarship, getAllScholarshipApplications, createScholarship, updateScholarship, deleteScholarship } = require('../controllers/scholarships')

router.route('/my-applications').get(getAllScholarshipApplications)
router.route('/').get(getAllScholarships).post(createScholarship)
router.route('/:id').get(getScholarship).patch(updateScholarship).delete(deleteScholarship)

module.exports = router