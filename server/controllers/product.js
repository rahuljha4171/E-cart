import { catchAsyncError } from "../middleware/catchAsyncError.js";
import Product from "../models/product.js";
import ErrorHandler from "../utils/errorHandler.js";
import { Features } from "../utils/features.js";
import cloudinary from "cloudinary";

/****************** Create Product by Admin ***********************/

export const createProduct = catchAsyncError(async (req, res, next) => {
  let images = [];

  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  const imagesLinks = [];

  for (let i = 0; i < images.length; i++) {
    const result = await cloudinary.v2.uploader.upload(images[i], {
      folder: "products",
    });

    imagesLinks.push({
      public_id: result.public_id,
      url: result.secure_url,
    });
  }

  req.body.images = imagesLinks;
  req.body.user = req.user.id;

  const product = new Product(req.body);

  await product.save();

  res.status(201).json({ success: true, product });
});
/****************** Update Product by Admin ***********************/

export const updateProduct = catchAsyncError(async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product not Found!", 404));
  }

   // Images Start Here
   let images = [];

   if (typeof req.body.images === "string") {
     images.push(req.body.images);
   } else {
     images = req.body.images;
   }
 
   if (images !== undefined) {
     // Deleting Images From Cloudinary
     for (let i = 0; i < product.images.length; i++) {
       await cloudinary.v2.uploader.destroy(product.images[i].public_id);
     }
 
     const imagesLinks = [];
 
     for (let i = 0; i < images.length; i++) {
       const result = await cloudinary.v2.uploader.upload(images[i], {
         folder: "products",
       });
 
       imagesLinks.push({
         public_id: result.public_id,
         url: result.secure_url,
       });
     }
 
     req.body.images = imagesLinks;
   }
 
   product = await Product.findByIdAndUpdate(req.params.id, req.body, {
     new: true,
     runValidators: true,
     useFindAndModify: false,
   });
 
   res.status(200).json({
     success: true,
     product,
   });
 });

/****************** Delete Product by Admin ***********************/

export const deleteProduct = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product not Found!", 404));
  }

  // Deleting Images From Cloudinary
  for (let i = 0; i < product.images.length; i++) {
    await cloudinary.v2.uploader.destroy(product.images[i].public_id);
  }

  await product.remove();

  res.status(200).json({
    success: true,
    message: "Product Delete Successfully",
  });
}); 

/****************** Fetch Product Details ***********************/

export const getProduct = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product not Found!", 404));
  }

  res.status(200).json({ success: true, product });
});

/****************** Fetch All Products ***********************/

export const getAllProducts = catchAsyncError(async (req, res, next) => {
  const resultPerPage = 8;
  const productsCount = await Product.countDocuments();

  const apiFeature = new Features(Product.find(), req.query).search().filter();

  let products = await apiFeature.query;

  let filteredProductsCount = products.length;

  apiFeature.pagination(resultPerPage);

  products = await apiFeature.query.clone();

  res.status(200).json({
    success: true,
    products,
    productsCount,
    resultPerPage,
    filteredProductsCount,
  });
});
/****************** Fetch All Products By Admin ***********************/

export const getAdminProducts = catchAsyncError(async (req, res, next) => {
  const products = await Product.find();

  res.status(200).json({
    success: true,
    products,
  });
});

/****************** Create and Update Review ***********************/

export const createProductReview = catchAsyncError(async (req, res, next) => {
  const { rating, comment, productId } = req.body;

  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };

  const product = await Product.findById(productId);

  const isReviewed = product.reviews.find(
    (rev) => rev.user.toString() === req.user._id.toString()
  );

  if (isReviewed) {
    product.reviews.forEach((rev) => {
      if (rev.user.toString() === req.user._id.toString())
        (rev.rating = rating), (rev.comment = comment);
    });
  } else {
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length;
  }

  let avg = 0;
  product.reviews.forEach((rev) => {
    avg += rev.rating;
  });

  product.ratings = avg / product.reviews.length;

  await product.save({ validateBeforeSave: false });

  res.status(200).json({ success: true });
});

/****************** Get All reviews of a Product ***********************/
export const getProductReviews = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.query.id);

  if (!product) {
    return next(new ErrorHandler("Product not Found", 404));
  }

  res.status(200).json({ success: true, reviews: product.reviews });
});

/****************** Delete a review ***********************/
export const deleteReview = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.query.productId);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  const reviews = product.reviews.filter(
    (rev) => rev._id.toString() !== req.query.id.toString()
  );

  let avg = 0;

  reviews.forEach((rev) => {
    avg += rev.rating;
  });

  let ratings = 0;

  if (reviews.length === 0) {
    ratings = 0;
  } else {
    ratings = avg / reviews.length;
  }

  const numOfReviews = reviews.length;

  await Product.findByIdAndUpdate(
    req.query.productId,
    {
      reviews,
      ratings,
      numOfReviews,
    },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  res.status(200).json({ success: true });
});
