const addhardware = require("../model/addithardwaremodel");

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
      