const db = require("../config/database");

const productref = db.firestore().collection("products")

module.exports = productref;    