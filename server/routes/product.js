import express from "express";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  updateProduct,
  getProduct,
  createProductReview,
  getProductReviews,
  deleteReview,
  getAdminProducts,
} from "../controllers/product.js";
import { isAuthenticatedUser, authorizeRoles } from "../middleware/auth.js";

const router = express.Router();

router.get("/products", getAllProducts);

router.get("/product/:id", getProduct);

router.get(
  "/admin/products",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  getAdminProducts
);
router.post(
  "/admin/product/new",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  createProduct
);

router.put(
  "/admin/product/:id",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  updateProduct
);

router.delete(
  "/admin/product/:id",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  deleteProduct
);

router.put("/review", isAuthenticatedUser, createProductReview);
router.get("/reviews", getProductReviews);

router.delete("/reviews", isAuthenticatedUser, deleteReview);

export default router;
