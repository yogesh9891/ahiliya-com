import axios  from "axios";
import React, { useContext, useEffect, useMemo } from "react";
import { Navigate, Route, Routes, useLocation, useNavigate } from "react-router-dom";

import { AuthoriseContext, axiosApiInstance } from "../App";
import About from "../components/About";
import Account from "../components/Account/Account";
import Login from "../components/Auth/Login";
import Register from "../components/Auth/Register";
import ResetPassword from "../components/Auth/ResetPassword";
import BlogDetail from "../components/BlogDetail";
import Blogs from "../components/Blogs";
import FAQ from "../components/FAQ";
import FeedBack from "../components/FeedBack";
import Gallery from "../components/Gallery";
import Index from "../components/Index";
import Footer from "../components/Layout/Footer";
import Header from "../components/Layout/Header";
import PrivacyPolicy from "../components/PrivacyPolicy";
import CartPage from "../components/Shop/CartPage";
import OrderComplete from "../components/Shop/OrderComplete";
import Procedure from "../components/Shop/Procedure";
import ProductDetail from "../components/Shop/ProductDetail";
import Products from "../components/Shop/Products";
import RaiseDispute from "../components/Shop/RaiseDispute";
import ReturnRefund from "../components/Shop/ReturnRefund";
import SubCategory from "../components/Shop/SubCategory";
import TrackOrder from "../components/Shop/TrackOrder";
import ViewOrder from "../components/Shop/ViewOrder";
import SingleReview from "../components/SingleReview";
import TermsCondition from "../components/TermsCondition";
import Wishlist from "../components/Wishlist";
import { getDecodedToken, getToken, refreshToken, removeToken, setToken } from "../services/User.service";
import { errorToast } from "../utils/Toast";
import ForgetPasword from "../components/Auth/ForgetPassword";
import Refund from "../components/Refund";
import Shipping from "../components/Shipping";

export default function RootRouter() {
  const [isAuthorized, setIsAuthorized] = useContext(AuthoriseContext);
  const navigate = useNavigate();

  const location = useLocation();
  const CheckIsAuthorised = async () => {
    let token = getToken();
    if (token) {
      setIsAuthorized(true);
    } else {
      setIsAuthorized(false);
    }
  };
  const logoutUser = () => {
    removeToken();
    setIsAuthorized(false);
  };

  useEffect(() => {
    CheckIsAuthorised();
    // console.log(location, "location");
    // if (isAuthorized && `${location.pathname}` == "/") navigate(-1);
  }, [isAuthorized]);

  useMemo(() => {
    let token = getToken();
    // console.log(token, "token");
    axiosApiInstance.interceptors.request.use(
      async (config) => {
        // console.log(token)
        if (token) {
          config.headers["authorization"] = "Bearer " + token;
        }
        // config.headers['Content-Type'] = 'application/json';
        return config;
      },
      (error) => {
        console.log(error);
        Promise.reject(error);
      }
    );
    axiosApiInstance.interceptors.response.use(
      (res) => {
        // Add configurations here
        return res;
      },
      async (err) => {
        // console.log("INterceptor error");
          let {config,response} = err;
          if(response && response.status == 401){
            if(!token){
              // errorToast("Please Login ")
              // navigate("/login")
            } 
              let decode = getDecodedToken();

                let refreshTokenResponse = await refreshToken(decode);

                if(refreshTokenResponse.data && refreshTokenResponse.data.success){
                    let refreshToken = refreshTokenResponse.data.token;
                    await  setToken(refreshToken);
                    await  new Promise(resolve => {
                      config.headers["authorization"] = "Bearer " + refreshToken;
                      // console.log(config,"configconfigconfig")
                        resolve(axios(config))
                      })
                }

              // console.log(refreshTokenResponse,"responseerror")
          }
        // logoutUser()

        return Promise.reject(err);
      }
    );
  }, [isAuthorized]);

  useMemo(() => {
    let token = getToken();
    // console.log(token, "token")
    axiosApiInstance.interceptors.request.use(
      async (config) => {
        // console.log(token)
        if (token) {
          config.headers['authorization'] = 'Bearer ' + token;
        }
        // config.headers['Content-Type'] = 'application/json';
        return config;
      },
      error => {
        console.log(error)
        Promise.reject(error)
      });
    axiosApiInstance.interceptors.response.use(
      (res) => {
        // Add configurations here
        return res;
      },
      async (err) => {
        // console.log("INterceptor error")

        // logoutUser()

        return Promise.reject(err);
      }
    );
  }, [])




  return (
    <>
      <Header auth={isAuthorized} />
      <Routes>
        {
          isAuthorized &&
          <>
            <Route path="/Wishlist" exact element={<Wishlist />} />
            <Route path="/Account" exact element={<Account />} />
            <Route path="/ViewOrder" exact element={<ViewOrder />} />
            <Route path="/TrackOrder" exact element={<TrackOrder />} />
            <Route path="/ReturnRefund" exact element={<ReturnRefund />} />
            <Route path="/RaiseDispute" exact element={<RaiseDispute />} />
          </>
        }

        <Route path="/" exact element={<Index />} />
        <Route path="/About-Us" exact element={<About />} />
        <Route path="/Cart" exact element={<CartPage />} />
        <Route path="/FAQ" exact element={<FAQ />} />
        <Route path="/Terms-and-Condition" exact element={<TermsCondition />} />
        <Route path="/Return-and-Refund-Policy" exact element={<Refund />} />
        <Route path="/Shipping-and-Payment-Policy" exact element={<Shipping />} />
        <Route path="/Privacy-Policy" exact element={<PrivacyPolicy />} />
        <Route path="/Blogs" exact element={<Blogs />} />
        <Route path="/Blog-Detail/:slug" exact element={<BlogDetail />} />
        <Route path="/Login" exact element={<Login />} />
        <Route path="/Register" exact element={<Register />} />
        <Route path="/ResetPassword/:id" exact element={<ResetPassword />} />
        <Route path="/ForgetPasword" exact element={<ForgetPasword />} />
        <Route path="/SubCategory/:id" exact element={<SubCategory />} />
        <Route path="/Gallery" exact element={<Gallery />} />
        <Route path="/FeedBack" exact element={<FeedBack />} />
        <Route path="/Procedure" exact element={<Procedure />} />
        <Route path="/Products/:id" exact element={<Products />} />
        <Route path="/Product-Detail/:id" exact element={<ProductDetail />} />
        <Route path="/single-review/:id" exact element={<SingleReview />} />
        <Route path="/OrderComplete/:id" exact element={<OrderComplete />} />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <Footer />
    </>
  )
}
