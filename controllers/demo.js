const { log } = require("../middleware/logger")

function printSingledocument(docs) {
    return docs[0];
};


exports.whatever = async function (req, res) {
    try {

        const docs = await productref.where("stuff", "==", "otherstuff")
        res.json(getsingedocument(docs).data());
    } catch (error) {
        res.status(500).end();
        log.error(error);
    }
};