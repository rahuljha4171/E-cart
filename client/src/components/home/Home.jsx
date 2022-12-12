import React from "react";
import { CgMouse } from "react-icons/cg";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useAlert } from "react-alert";

import "./home.css";
import ProductCard from "./ProductCard";
import MetaData from "../layout/MetaData";
import { clearErrors, getProduct } from "../../actions/product";
import Loader from "../layout/loader/Loader";

const Home = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { loading, error, products } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProduct());
  }, [dispatch, error, alert]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title="E-Cart - Online Shopping website" />
          <div className="banner">
            <p>Welcome to E-Cart</p>
            <h1>Get all the amazing products here</h1>
            <a href="#container">
              <button>
                Scroll
                <CgMouse />
              </button>
            </a>
          </div>

          <h2 className="homeHeading">Featured Products</h2>

          <div className="container" id="container">
            {products &&
              products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
          </div> 
        </>
      )}
    </>
  );
};

export default Home;
