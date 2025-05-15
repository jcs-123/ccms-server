const mongoose = require('mongoose');

const complaintSchema = new mongoose.Schema({
  jeccid: {
    type: String,
  },
  cpusino: {
    type: String,
  },
  monitorsino: {
    type: String,
  },
  keyboardsino: {
    type: String,
  },
  mousesino: {
    type: String,
  },
  complaintstatus: {
    type: String, // This can hold the latest remark text
  },
  complaintremark: {
    type: String, // If you use this too, clarify difference with complaintstatus
  },
  complaintDate: {
    type: String,
  },
  ticketNo: {
    type: String,
  },
  spoc: {
    type: String,
  },
  status: {
    type: String, // pending | assigned | resolved etc.
  },
  assignedSpoc: {
    type: String, // <-- This is new: who it's assigned to
  },
  assignedDate:{
    type: String,

  },
  department:{
    type: String,
 
  },
  room:{
    type: String,
  
  }
});

const complaintdata = mongoose.model('complaintdata', complaintSchema);
module.exports = complaintdata;
