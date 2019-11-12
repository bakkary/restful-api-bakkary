const { getAllProducts, getSingleproduct, deleteProduct, updateProduct, addProduct } = require("../controllers/products.controller");

module.exports = function (router) {
    router.options("/products", function (req, res) {
        res.header("Allow", "OPTIONS, GET, POST")
        res.status(204);
        res.end();

    });
    router.get("/products", getAllProducts);

    router.get("/products/:sku", getSingleproduct);

    router.delete("/products/:sku", deleteProduct);
    //delete tingen

    router.patch("/products/:sku", updateProduct);
    //opdater tingen

    router.post("/products", addProduct);
    //opret tingen
};

