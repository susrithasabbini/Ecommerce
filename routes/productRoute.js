const express = require("express");
const {
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  createProduct,
  uploadImage,
} = require("../controllers/productController");
const {
  authenticateUser,
  authorizePermissions,
} = require("../middleware/authentication");
const { getSingleProductReviews } = require("../controllers/reviewController");
const router = express.Router();

router
  .route("/")
  .post(authenticateUser, authorizePermissions("admin", "owner"), createProduct)
  .get(getAllProducts);

router
  .route("/:id")
  .get(getSingleProduct)
  .patch(
    authenticateUser,
    authorizePermissions("admin", "owner"),
    updateProduct
  )
  .delete(
    authenticateUser,
    authorizePermissions("admin", "owner"),
    deleteProduct
  );

router
  .route("/uploadImage")
  .post(authenticateUser, authorizePermissions("admin", "owner"), uploadImage);

router.route("/:id/reviews").get(getSingleProductReviews);

module.exports = router;
