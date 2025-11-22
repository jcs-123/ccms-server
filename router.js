// import express
const express = require('express');

const addhardwarecontroller = require('./controller/addhardwarecontroller');
const compaintcontroller = require('./controller/compaintcontroller');
const logincredentialcontroller = require('./controller/logincredentialcontroller');

const router = new express.Router();

// Add hardware
router.post('/add-hardware', addhardwarecontroller.addProjectController);

// Get all hardware
router.get('/get-data', addhardwarecontroller.getproject);

// Update hardware
router.put('/update-data/:id', addhardwarecontroller.edithardware);

// Add complaint
router.post('/add-complaint', compaintcontroller.addcomplaint);

// Get all complaints
router.get('/get-complaint', compaintcontroller.getcomplaint);

// ✅ Assign complaint (Update SPOC and status by ticketNo)
router.put('/assign-complaint/:ticketNo', compaintcontroller.assignComplaint);

// ✅ Update complaint remark (Update status by ticketNo)
router.put('/update-remark/:ticketNo', compaintcontroller.updateRemark);


//login
router.post('/add-spoc',logincredentialcontroller.addSpocUser);
router.post('/bulk-add', logincredentialcontroller.bulkAddSpocUsers);
// Route to get all SPOC users
router.get('/get-spoc-users', logincredentialcontroller.getSpocUsers);

// Route to edit a SPOC user
router.put('/edit-spoc/:id', logincredentialcontroller.editSpocUser);

// Route to delete a SPOC user
router.delete('/delete-spoc/:id', logincredentialcontroller.deleteSpocUser);
router.get('/get-spoc-user/:id', logincredentialcontroller.getSingleSpocUser);
router.put('/spoc/edit/:id', logincredentialcontroller.updatePassword);


//get new cc complaint
router.get('/get-cccomplaint', compaintcontroller.getcccomplaint);

//upadate status and remark
router.post("/update-status-remark/:ticketNo", compaintcontroller.updateStatusAndRemark);

// delete


router.delete("/hardware/delete-by-spoc/:spoc", addhardwarecontroller.deleteBySpoc);
router.delete("/hardware/delete-one", addhardwarecontroller.deleteOneBySpocAndJeccid);
router.post("/hardware/delete-spoc-bulk", addhardwarecontroller.bulkDeleteBySpoc);

// Export
module.exports = router;
