const express = require("express");
const router = express.Router();
const {
  authenticateUser,
  authorizePermissions,
} = require("../middleware/authentication");

const {
  getAllOrders,
  getCurrentUserOrders,
  getSingleOrder,
  updateOrder,
  createOrder,
} = require("../controllers/orderController");

router
  .route("/")
  .get(authenticateUser, authorizePermissions("admin", "owner"), getAllOrders)
  .post(authenticateUser, createOrder);

router.route("/showAllMyOrders").get(authenticateUser, getCurrentUserOrders);
router
  .route("/:id")
  .get(authenticateUser, getSingleOrder)
  .patch(authenticateUser, updateOrder);

module.exports = router;
