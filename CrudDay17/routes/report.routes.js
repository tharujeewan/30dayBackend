//import express
const express = require('express');

//create router
const router = express.Router();

//import controller
const {
    createReport,
    getAllReports,
    updateReport,
    deleteReport
} = require('../controllers/report.controller');

//POST api/report - create a new report
router.post('/', createReport);

//GET api/report - get all reports
router.get('/', getAllReports);

//PUT api/report/:id - update a report by id
router.put('/:id', updateReport);

//DELETE api/report/:id - delete a report by id
router.delete('/:id', deleteReport);

//export router
module.exports = router;
