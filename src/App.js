import axios from "axios";
import React, { createContext, useState } from "react";
import { useReducer } from "react";
import {Helmet} from "react-helmet";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import { injectStyle } from "react-toastify/dist/inject-style";
import 'react-toastify/dist/ReactToastify.css';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle";
import "./assets/scss/main.css";
import ScrollToTop from "./components/ScrollToTop";
import "./components/Utility/Style";
import RootRouter from "./Router/RootRouter";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
export let AuthoriseContext = createContext();
export let CartContext = createContext();
export let CartCountContext = createContext();
export let FilterContext = createContext();
export let ProductFilterContext = createContext();
export let ShippingCountryContext = createContext();

export const axiosApiInstance = axios.create();
function App() {

  const [isAuthorized, setIsAuthorized] = useState(false);
  const [showCartSideBar, setShowCartSideBar] = useState(false);
  const [contextCounry, setcontextCounry] = useState("");
  const [carts, setCarts] = useState(0);
  const [products, setProducts] = useState({
    products: [],
    categoryId: "",
  });
  const [filter, setFilter] = useState({
    sortBy: 'date_desc',
    categoryArr: [],
    priceRangeArr: {
      start: "",
      end: ""
    }
  });

  injectStyle();



  return (
    <AuthoriseContext.Provider value={[isAuthorized, setIsAuthorized]}>
      <CartContext.Provider value={[showCartSideBar, setShowCartSideBar]}>
        <CartCountContext.Provider value={[carts, setCarts]}>
          <ProductFilterContext.Provider value={[products, setProducts]}>
            <ShippingCountryContext.Provider value={[contextCounry, setcontextCounry]}>
              <FilterContext.Provider
                value={[filter, setFilter]}
              >
                <PayPalScriptProvider
                  options={{

                    ///////test credentails
                    // "client-id": "Abx-wfh6f2UkiPNujqDyH-YWpf0pvnpqsCcG6GPeEBCip5ckySla-jWZsqXD7uaR7WI4_2NXCnE4im2Z",
                    ///////live credentails
                    "client-id": "AfPRbINqQzRL2n7_gDI5m-4HFwGj8ubKcziAvrBxGXklaNGzv4muvGEJkyV9BC_y6xjyzr8oWarAqrDS",
                    components: "buttons",
                    // currency: currency
                  }}
                >

                  <BrowserRouter>
                    <ScrollToTop />
                    <ToastContainer position="bottom-right" />
                    <Helmet>
                        <title>Aahilya Creations - Handmade Indian Crafts, Fabric & Home Decor | Online Store</title>
                        <meta
                          name="description"
                          content={`Aahilya Creations is the leading online store for handmade Indian crafts and fabric. Buy wooden printing blocks, cotton fabric, bags & accessories, Christmas handmade, clothing, and home decor items at Aahilya Creations}`}
                        />
                        <link rel="canonical" href={`${window.location.href}`} />
                        <meta
                          name="keywords"
                          content={`wooden printing blocks, wooden blocks online india, wooden blocks online uk, woodblock printing, Woodblock Printing Online In India, Woodblock Printing in uk, block printing`}
                        />
                        <meta property="og:title"    content={`Aahilya Creations - Handmade Indian Crafts, Fabric & Home Decor | Online Store`} />
                        <meta property="og:site_name" content="Aahilya"/>
                        <meta property="og:url" content={`${window.location.href}`}/>
                        <meta property="og:description"   content={`Aahilya Creations is the leading online store for handmade Indian crafts and fabric. Buy wooden printing blocks, cotton fabric, bags & accessories, Christmas handmade, clothing, and home decor items at Aahilya Creations}`} />
                        <meta property="og:type" content="website"/>
                      </Helmet>
                    <RootRouter />
                  </BrowserRouter>
                </PayPalScriptProvider>
              </FilterContext.Provider>
            </ShippingCountryContext.Provider>
          </ProductFilterContext.Provider>
        </CartCountContext.Provider>
      </CartContext.Provider>
    </AuthoriseContext.Provider >
  );
}

export default App;
