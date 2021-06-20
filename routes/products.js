const router = require("express").Router();
const Product = require("../models/product");

// GET PRODUCT
router.get("/:id", (req, res) => {
  Product.findById(req.params.id)
    .then((doc) => {
      if (!doc) {
        res.status(404).json({ error: "Product not found" });
      }
      res.status(200).json(doc);
    })
    .catch((err) => {
      console.error(err);
      res
        .status(500)
        .json({ error: `${err.name}: ${err.message}: please contact software developer with this error message` });
    });
});

// GET ALL PRODUCTS
router.get("/", (req, res) => {
  Product.find().then((data) => console.log(data));
});

// CREATE PRODUCT
router.post("/new_product", (req, res) => {
  const newProduct = req.body;

  // Check newProduct has any data, otherwise throw an error
  if (newProduct) {
    const product = new Product(newProduct);

    product
      .save()
      .then((doc) => {
        res.status(200).json(doc);
      })
      .catch((err) => {
        console.error(err);
        res
          .status(500)
          .json({ error: `${err.name}: ${err.message}: please contact software developer with this error message` });
      });
  } else {
    res.status(500).json({ error: "no data object has been provided" });
  }
});

// UPDATE PRODUCT
router.put("/:id", async (req, res) => {
  const paramsId = req.params.id;
  const updatedObj = req.body;

  // Check if the object ID in body matches the id from params
  if (updatedObj.productId === paramsId) {
    // Updates the entry in the databse and returns the NEW entry
    Product.findByIdAndUpdate(
      paramsId,
      {
        $set: updatedObj,
      },
      {
        new: true,
      }
    )
      .then((doc) => {
        if (!doc) {
          res.status(404).json({ error: "Product not found" });
        }
        res.status(200).json(doc);
      })
      .catch((err) => {
        console.error(err);
        res
          .status(500)
          .json({ error: `${err.name}: ${err.message}: please contact software developer with this error message` });
      });
  } else {
    res.status(500).json({ error: "internal server error" });
  }
});

// DELETE PRODUCT
router.delete("/:id", (req, res) => {
  const paramsId = req.params.id;

  // Check if the object ID in body matches the id from params
  if (req.params.id === paramsId) {
    Product.findByIdAndDelete(paramsId)
      .then((doc) => {
        if (!doc) {
          res.status(404).json({ error: "Product not found" });
        }
        res.status(200).json(doc);
      })
      .catch((err) => {
        console.error(err);
        res
          .status(500)
          .json({ error: `${err.name}: ${err.message}: please contact software developer with this error message` });
      });
  } else {
    res.status(500).json({ error: "internal server error" });
  }
});

module.exports = router;
