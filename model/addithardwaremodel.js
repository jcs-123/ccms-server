const mongoose = require('mongoose')
const addprojectSchema = new mongoose.Schema({
    jeccid: {
        type : String
    },
    cpusino : {
        type : String
    },
    monitorsino : {
        type : String
    },
    keyboardsino : {
        type : String
    },
    mousesino : {
        type : String

    },
    printersino: {
        type : String

    },
    locationid: {
        type : String

    },
    purchasedon: {
        type : String

    },
    amcexpdata: {
        type : String

    },
    brand: {
        type : String

    },
    department: {
        type : String

    },
    room: {
        type : String

    },
    spoc: {
        required : true,
        type : String

    }
    ,
    status: {
        type : String

    },
    amcvendor: {
        type : String

    },
    operatingsystems: {
        type : String

    },
    remarks: {
        type : String

    }
})

const addhardware = mongoose.model('addhardware', addprojectSchema)
module.exports = addhardware