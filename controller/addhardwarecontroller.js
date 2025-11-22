const addhardware = require("../model/addithardwaremodel");
const mongoose = require("mongoose");
exports.addProjectController = async (req, res) => {
    console.log(`Inside Add Project Controller`);

    const {
        jeccid, cpusino, monitorsino, keyboardsino,
        mousesino, printersino, locationid, purchasedon,
        amcexpdata, brand, department, room, spoc,
        status, amcvendor, operatingsystems, remarks
    } = req.body;

    console.log(req.body); // Better than logging all individually

    try {
        const newdata = new addhardware({
            jeccid, cpusino, monitorsino, keyboardsino,
            mousesino, printersino, locationid, purchasedon,
            amcexpdata, brand, department, room, spoc,
            status, amcvendor, operatingsystems, remarks
        });

        await newdata.save();
        res.status(200).json(newdata);
    } catch (error) {
        console.error("Error saving data:", error);
        res.status(500).json({ message: `Project adding failed: ${error.message}` });
    }
};


// get

exports.getproject = async (req, res)=>{
    console.log('inside new data controller')

    try {
        const allData = await addhardware.find(); 
        res.status(200).json(allData);
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).json({ error: "Failed to fetch data" });
    }
    }


    //update user project
    exports.edithardware = async (req, res) => {
        console.log(`Inside Edit Hardware Controller`);
      
        const { id } = req.params;
      
        const {
          jeccid, cpusino, monitorsino, keyboardsino,
          mousesino, printersino, locationid, purchasedon,
          amcexpdata, brand, department, room, spoc,
          status, amcvendor, operatingsystems, remarks
        } = req.body;
      
        console.log("Updating hardware with ID:", id);
        console.log(req.body);
      
        try {
          const updatedData = await addhardware.findByIdAndUpdate(
            { _id: id },
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
      
          res.status(200).json(updatedData);
        } catch (error) {
          console.error("Error updating data:", error);
          res.status(500).json({ message: `Hardware update failed: ${error.message}` });
        }
      };



// DELETE all hardware records under a SPOC
exports.deleteBySpoc = async (req, res) => {
    console.log("🟡 Inside Delete By SPOC Controller");

    try {
        const { spoc } = req.params;
        console.log("➡ SPOC Received:", spoc);

        if (!spoc || spoc.trim() === "") {
            return res.status(400).json({ message: "SPOC not provided" });
        }

        const deleted = await addhardware.deleteMany({ spoc: spoc });

        if (deleted.deletedCount === 0) {
            return res.status(404).json({
                message: `No hardware found for SPOC: ${spoc}`
            });
        }

        return res.status(200).json({
            success: true,
            deletedCount: deleted.deletedCount,
            message: `Successfully deleted ${deleted.deletedCount} items under SPOC ${spoc}`
        });

    } catch (error) {
        console.error("❌ Error deleting by SPOC:", error.message);
        return res.status(500).json({ message: "Server error while deleting by SPOC" });
    }
};
exports.deleteOneBySpocAndJeccid = async (req, res) => {
    console.log("🟡 Inside Delete One (spoc + jeccid)");

    try {
        const { spoc, jeccid } = req.query;

        if (!spoc || !jeccid) {
            return res.status(400).json({ message: "SPOC and JECCID required" });
        }

        const deleted = await addhardware.findOneAndDelete({ spoc, jeccid });

        if (!deleted) {
            return res.status(404).json({ message: "No matching hardware found" });
        }

        return res.status(200).json({
            success: true,
            message: "Hardware deleted",
            deleted
        });

    } catch (error) {
        console.error("❌ ERROR deleting:", error.message);
        return res.status(500).json({ message: error.message });
    }
};
exports.bulkDeleteBySpoc = async (req, res) => {
    const { spoc } = req.body;

    if (!spoc) {
        return res.status(400).json({ message: "SPOC not provided" });
    }

    try {
        const deleted = await addhardware.deleteMany({ spoc });

        return res.status(200).json({
            success: true,
            deletedCount: deleted.deletedCount,
            message: "Bulk delete by SPOC completed"
        });

    } catch (error) {
        console.error("❌ ERROR:", error);
        return res.status(500).json({ message: "Server error" });
    }
};
