const productref = require("../models/product.model");



exports.addProduct = function (req, res) {
    req.fields.price = parseFloat(req.fields.price);
    req.fields.weight = parseFloat(req.fields.weight);
    productref.add({ ...req.fields })
        .then(ref => {
            ref.get().then(doc => res.status(201).json(doc.data()))
        })
        .catch(error => res.json(error));

};
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

exports.deleteProduct = function (req, res) {
    productref.where("sku", "==", req.params.sku).get().then(docs => {
        docs.forEach(doc => doc.ref.delete());
    })
        .catch(err => res.status(500).json({ message: err }));
    res.status(204).end();
};

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
        const docs = await productref.where("sku", "==", req.params.sku);
        res.json(getSingleProduct(docs).data());
    } catch (error) {
        res.status(500).end();
        log.error(error);
    }
};