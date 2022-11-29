import ErrorHandler from "../utils/errorHandler.js";

export const catchAsyncError = (theFunc) => (req, res, next) => {
  Promise.resolve(theFunc(req, res, next)).catch(next);
};
