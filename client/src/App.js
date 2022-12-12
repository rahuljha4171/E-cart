import "./App.css";
import Header from "./components/layout/header/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import Footer from "./components/layout/footer/Footer.jsx";
import Home from "./components/home/Home.jsx";
import ProductDetails from "./components/product/productDetails/ProductDetails.jsx";
import Products from "./components/product/products/Products.jsx";
import Search from "./components/product/search/Search.jsx";
import LoginSignup from "./components/user/LoginSignup";
import Profile from "./components/user/Profile";
import UpdateProfile from "./components/user/UpdateProfile.jsx";

import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import { useSelector } from "react-redux";
import UpdatePassword from "./components/user/UpdatePassword";
import ForgotPassword from "./components/user/ForgotPassword";
import ResetPassword from "./components/user/ResetPassword";
import Cart from "./components/Cart/Cart";
import store from "./store";
import { useEffect, useState } from "react";
import { loadUser } from "./actions/user";
import Shipping from "./components/Cart/Shipping";
import ConfirmOrder from "./components/Cart/ConfirmOrder";
import axios from "axios";
import Payment from "./components/Cart/Payment";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import OrderSuccess from "./components/Cart/OrderSuccess";
import MyOrders from "./components/Order/MyOrders";
import OrderDetails from "./components/Order/OrderDetails";
import Dashboard from "./components/Admin/Dashboard.jsx";
import ProductList from "./components/Admin/ProductList";
import NewProduct from "./components/Admin/NewProduct";
import UpdateProduct from "./components/Admin/UpdateProduct";
import OrderList from "./components/Admin/OrderList";
import ProcessOrder from "./components/Admin/ProcessOrder";
import UserList from "./components/Admin/UserList";
import UpdateUser from "./components/Admin/UpdateUser";
import ProductReviews from "./components/Admin/ProductReviews";
import About from "./components/layout/About/About";
import Contact from "./components/layout/Contact/Contact";
import NotFound from "./components/layout/notFound/NotFound";

const App = () => {
  const { isAuthenticated } = useSelector((state) => state.user);
  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
    const { data } = await axios.get("/api/v1/stripeapikey");

    setStripeApiKey(data.stripeApiKey);
  }

  useEffect(() => {
    store.dispatch(loadUser());

    getStripeApiKey();
  }, []);

  window.addEventListener("contextmenu", (e) => e.preventDefault());

  return (
    <Router>
      <Header />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/product/:id" element={<ProductDetails />} />
        <Route exact path="/products" element={<Products />} />
        <Route path="/products/:keyword" element={<Products />} />

        <Route exact path="/search" element={<Search />} />
        <Route exact path="/about" element={<About />} />
        <Route exact path="/contact" element={<Contact />} />

        <Route
          exact
          path="/account"
          element={isAuthenticated ? <Profile /> : <Navigate to="/login" />}
        />
        <Route
          exact
          path="/profile/update"
          element={
            isAuthenticated ? <UpdateProfile /> : <Navigate to="/login" />
          }
        />
        <Route
          exact
          path="/password/update"
          element={
            isAuthenticated ? <UpdatePassword /> : <Navigate to="/login" />
          }
        />

        <Route exact path="/password/forgot" element={<ForgotPassword />} />
        <Route
          exact
          path="/password/reset/:token"
          element={<ResetPassword />}
        />

        <Route exact path="/login" element={<LoginSignup />} />

        <Route exact path="/cart" element={<Cart />} />

        <Route
          exact
          path="/shipping"
          element={isAuthenticated ? <Shipping /> : <Navigate to="/login" />}
        />
        <Route
          exact
          path="/order/confirm"
          element={
            isAuthenticated ? <ConfirmOrder /> : <Navigate to="/login" />
          }
        />

        <Route>
          {stripeApiKey && (
            <Route
              exact
              path="/process/payment"
              element={
                isAuthenticated ? (
                  <Elements stripe={loadStripe(stripeApiKey)}>
                    <Payment />
                  </Elements>
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
          )}
        </Route>
        <Route
          exact
          path="/success"
          element={
            isAuthenticated ? <OrderSuccess /> : <Navigate to="/login" />
          }
        />
        <Route
          exact
          path="/orders"
          element={isAuthenticated ? <MyOrders /> : <Navigate to="/login" />}
        />
        <Route
          exact
          path="/order/:id"
          element={
            isAuthenticated ? <OrderDetails /> : <Navigate to="/login" />
          }
        />

        <Route
          path="/admin/dashboard"
          element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />}
        />
        <Route
          path="/admin/products"
          element={isAuthenticated ? <ProductList /> : <Navigate to="/login" />}
        />
        <Route
          path="/admin/product"
          element={isAuthenticated ? <NewProduct /> : <Navigate to="/login" />}
        />
        <Route
          path="/admin/product/:id"
          element={
            isAuthenticated ? <UpdateProduct /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/admin/orders"
          element={isAuthenticated ? <OrderList /> : <Navigate to="/login" />}
        />
        <Route
          path="/admin/order/:id"
          element={
            isAuthenticated ? <ProcessOrder /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/admin/users"
          element={isAuthenticated ? <UserList /> : <Navigate to="/login" />}
        />
        <Route
          path="/admin/user/:id"
          element={isAuthenticated ? <UpdateUser /> : <Navigate to="/login" />}
        />
        <Route
          path="/admin/reviews"
          element={
            isAuthenticated ? <ProductReviews /> : <Navigate to="/login" />
          }
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
