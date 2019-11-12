const productref = require("../models/product.model");



// exports.addProduct = function (req, res) {
//     req.fields.price = parseFloat(req.fields.price);
//     req.fields.weight = parseFloat(req.fields.weight);
//     productref.add({ ...req.fields })
//         .then(ref => {
//             ref.get().then(doc => res.status(201).json(doc.data()))
//         })
//         .catch(error => res.json(error));

// };
exports.getAllProducts = function (req, res) {
    productref.get().then(docs => {
        const results = [];
        docs.forEach(doc => results.push(doc.data()))
        res.json(results);
    });

};
// exports.getSingleproduct = function (req, res) {
//     productref.where("sku", "==", req.params.sku).get()
//         .then(docs => {
//             docs.forEach(doc => res.json(doc.data()));
//         });
// };

exports.deleteProduct = async function (req, res) {
    try {

        const docs = await productref.where("sku", "==", req.params.sku).get();
        docs().forEach(doc => doc.ref.delete());
        res.status(204).end();
    } catch (error) {
        log.error(error.stack);
        res.status(500).end();
    }
}

exports.updateProduct = function (req, res) {
    if (req.fields.price) {
        req.fields.price = parseFloat(req.fields.price);
    }
    if (req.fields.weight) {
        req.fields.weight = parseFloat(req.fields.weight);
    }

    productref.where("sku", "==", req.params.sku).get().then(docs => {
        docs.forEach(doc => doc.ref.update({ ...req.fields }).get()
            .then(doc => res.json(doc.data()))
        );
    })
};


const { log } = require("../middleware/logger")

function getSingleDocument(docs) {
    return docs[0];
};


exports.getSingleproduct = async function (req, res) {
    try {
        const docs = await productref.where("sku", "==", req.params.sku)
            .limit(1)
            .get();
        docs.forEach(doc => res.json(doc.data()))
    } catch (error) {
        log.error(error.stack);
        res.status(500).end();
    }
};

exports.addProduct = async function (req, res) {
    try {
        console.log(req.fields)
        req.fields.price = parseFloat(req.fields.price)
        req.fields.weight = parseFloat(req.fields.weight)
        const ref = await productRef.add({ ...req.fields })
        const doc = await ref.get();
        res.status(201).json(doc.data())
    } catch (error) {
        log.error(error.stack);
        res.status(500).end();
    }
};