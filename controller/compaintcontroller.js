const complaintdata = require("../model/complaintmodel");

// Add Complaint
exports.addcomplaint = async (req, res) => {
  console.log(`Inside Add complaint Controller`);
  const {
    jeccid, cpusino, monitorsino, keyboardsino,
    mousesino, printersino, complaintstatus, complaintremark,
    complaintDate, ticketNo, spoc, status,department,room
  } = req.body;

  try {
    const newdata = new complaintdata({
      jeccid, cpusino, monitorsino, keyboardsino,
      mousesino, printersino, complaintstatus, complaintremark,
      complaintDate, ticketNo, spoc, status,department,room
    });

    await newdata.save();
    res.status(200).json(newdata);
  } catch (error) {
    console.error("Error saving data:", error);
    res.status(500).json({ message: `Project adding failed: ${error.message}` });
  }
};

// Get All Complaints
exports.getcomplaint = async (req, res) => {
  console.log('inside get complaint controller');
  try {
    const allData = await complaintdata.find();
    res.status(200).json(allData);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Failed to fetch data" });
  }
};

// Update Assigned SPOC and Status
exports.assignComplaint = async (req, res) => {
    const { ticketNo } = req.params;
    const { assignedSpoc, status } = req.body;
  
    try {
      const updated = await complaintdata.findOneAndUpdate(
        { ticketNo },
        {
          assignedSpoc,
          status: "assigned",         // or use the `status` from req.body if dynamic
          assignedDate: new Date(),   // store current timestamp as assignedDate
        },
        { new: true }
      );
  
      if (!updated) {
        return res.status(404).json({ error: "Complaint not found" });
      }
  
      res.status(200).json(updated);
    } catch (error) {
      console.error("Error assigning complaint:", error);
      res.status(500).json({ error: "Assignment failed" });
    }
  };
  

// Update Complaint Remark
exports.updateRemark = async (req, res) => {
    const { ticketNo } = req.params;
    const { complaintremark } = req.body;
  
    try {
      // Find the complaint by ticketNo
      const complaint = await complaintdata.findOne({ ticketNo });
  
      if (!complaint) {
        return res.status(404).json({ error: "Complaint not found" });
      }
  
      // Append the new remark to the existing remarks
      const updatedRemark = complaint.complaintremark
        ? complaint.complaintremark + '\n' + complaintremark
        : complaintremark; // If no existing remark, add the new one as the first remark
  
      // Update the complaint's remark field
      complaint.complaintremark = updatedRemark;
  
      // Save the updated complaint
      const updatedComplaint = await complaint.save();
  
      // Return the updated complaint data
      res.status(200).json(updatedComplaint);
    } catch (error) {
      console.error("Error updating remark:", error);
      res.status(500).json({ error: "Remark update failed" });
    }
  };


  //ccassigned get

exports.getcccomplaint = async (req, res) => {
    console.log('inside get complaint controller');
    try {
      const allData = await complaintdata.find();
      res.status(200).json(allData);
    } catch (error) {
      console.error("Error fetching data:", error);
      res.status(500).json({ error: "Failed to fetch data" });
    }
  };

//   update status and remark
// New API: Update both status and remark for a complaint
exports.updateStatusAndRemark = async (req, res) => {
    const { ticketNo } = req.params;
    const { status, complaintremark } = req.body;
  
    try {
      // Find the complaint by ticketNo
      const complaint = await complaintdata.findOne({ ticketNo });
  
      if (!complaint) {
        return res.status(404).json({ error: "Complaint not found" });
      }
  
      // Update complaint status
      if (status) {
        complaint.status = status;
      }
  
      // Append or add remark
      if (complaintremark) {
        complaint.complaintremark = complaint.complaintremark
          ? complaint.complaintremark + "\n" + complaintremark
          : complaintremark;
      }
  
      // Save the updated complaint
      const updatedComplaint = await complaint.save();
  
      // Respond with the updated data
      res.status(200).json({
        message: "Complaint status and remark updated successfully",
        data: updatedComplaint,
      });
    } catch (error) {
      console.error("Error updating complaint:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  };
  