const addhardware = require("../model/addithardwaremodel");

/* ==========================================================
   🧩 ADD HARDWARE — Prevent Duplicate Entries
========================================================== */
exports.addProjectController = async (req, res) => {
  console.log("Inside Add Project Controller");

  const {
    jeccid, cpusino, monitorsino, keyboardsino,
    mousesino, printersino, locationid, purchasedon,
    amcexpdata, brand, department, room, spoc,
    status, amcvendor, operatingsystems, remarks
  } = req.body;

  try {
    // ✅ Check for duplicate JECC ID or serial numbers
    const existing = await addhardware.findOne({
      $or: [
        { jeccid },
        { cpusino },
        { monitorsino },
        { keyboardsino },
        { mousesino },
        { printersino }
      ]
    });

    if (existing) {
      return res.status(400).json({
        success: false,
        message: "Duplicate entry found. JECC ID or serial number already exists!"
      });
    }

    // ✅ Save new hardware entry
    const newdata = new addhardware({
      jeccid, cpusino, monitorsino, keyboardsino,
      mousesino, printersino, locationid, purchasedon,
      amcexpdata, brand, department, room, spoc,
      status, amcvendor, operatingsystems, remarks
    });

    await newdata.save();

    res.status(200).json({
      success: true,
      message: "Hardware added successfully ✅",
      data: newdata
    });

  } catch (error) {
    console.error("❌ Error saving data:", error);
    res.status(500).json({
      success: false,
      message: `Project adding failed: ${error.message}`
    });
  }
};

/* ==========================================================
   📦 GET ALL HARDWARE
========================================================== */
exports.getproject = async (req, res) => {
  console.log("Inside Get Hardware Controller");
  try {
    const allData = await addhardware.find();
    res.status(200).json(allData);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Failed to fetch data" });
  }
};

/* ==========================================================
   ✏️ EDIT HARDWARE ENTRY
========================================================== */
exports.edithardware = async (req, res) => {
  console.log("Inside Edit Hardware Controller");
  const { id } = req.params;

  const {
    jeccid, cpusino, monitorsino, keyboardsino,
    mousesino, printersino, locationid, purchasedon,
    amcexpdata, brand, department, room, spoc,
    status, amcvendor, operatingsystems, remarks
  } = req.body;

  try {
    const updatedData = await addhardware.findByIdAndUpdate(
      id,
      {
        jeccid, cpusino, monitorsino, keyboardsino,
        mousesino, printersino, locationid, purchasedon,
        amcexpdata, brand, department, room, spoc,
        status, amcvendor, operatingsystems, remarks
      },
      { new: true }
    );

    if (!updatedData) {
      return res.status(404).json({ message: "Hardware entry not found." });
    }

    res.status(200).json({
      success: true,
      message: "Hardware updated successfully ✅",
      data: updatedData
    });

  } catch (error) {
    console.error("Error updating data:", error);
    res.status(500).json({ message: `Hardware update failed: ${error.message}` });
  }
};
