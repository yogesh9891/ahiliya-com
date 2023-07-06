import React, { useEffect, useState } from "react";
import { ImBin } from "react-icons/im";
import { Link, useNavigate } from "react-router-dom";
import { generateImageUrl } from "../services/url.service";
import {
  addItemQuantityInCart,
  getCartData,
  removeItemCart,
  removeItemQuantityInCart,
} from "../services/UserCart.service";
import { errorToast, successToast } from "../utils/Toast";
import { images } from "./Utility/Images";
import Quantity from "./Utility/Quantity";
import {
  getLocalCart,
  addItemInToLocalCart,
  removeItemFromlocalCart,
  reduceItemFromlocalCart,
} from "../services/localCart";
import { getToken } from "../services/User.service";
import {
  getconvertIntoCurrencyPrice,
  getconvertIntoCurrencyPriceWithOutSymbol,
  getconvertIntoCurrencyPriceWithSymbol,
  getCurrencyPriceSymbol,
} from "../services/Currency.service";
import { CartContext, CartCountContext } from "../App";
import { useContext } from "react";

function CartBar({ setshowCart, showCart }) {
  const deleteCart = (i) => {
    // console.log(cartProduct, "cart");
    // let temp = cartProduct.filter((item, index) => i !=== index);
    // setcartProduct([...temp]);
    // console.log(temp, i);
  };
  const navigate = useNavigate();
  const [showCartSideBar, setShowCartSideBar] = useContext(CartContext)
const [show, setshow] = useState("")

  const [cartArr, setCartArr] = useState([]);
  const [carts, setCarts] = useContext(CartCountContext)


  const handleAddToCart = async (item,obj={}) => {
    try {


      let response = {};
      if (getToken() && getToken() != null) {
        let { data: res } = await addItemQuantityInCart(item?.productId,obj);
        response = res;
      } else {
        item._id = item?.productId;
        let { data: res } = await addItemInToLocalCart(item,obj);
        response = res;
      }
      
      if (response.message) {
        successToast(response.message);
        handleGetCart();
      }
    } catch (err) {
      errorToast(err);
    }
  };

  const handleReduceItemQuantityFromCart = async (id,varientId="") => {
    try {
      let response = {};
      if (getToken() && getToken() != null) {
        let { data: res } = await removeItemQuantityInCart(id,varientId);
        response = res;
      } else {
        let res = await reduceItemFromlocalCart(id,varientId);
        response = res;
      }
      if (response.message) {
        successToast(response.message);
        handleGetCart();
      }
    } catch (err) {
      errorToast(err);
    }
  };

  const handleRemoveFromCart = async (id,varientId) => {
    try {

        if(!window.confirm("Are you sure want to remove this item?")){
            return 0;
        }
      let response = {};
      if (getToken() && getToken() != null) {
      
        let { data: res } = await removeItemCart(id,varientId);
        response = res;
      } else {
        let res = await removeItemFromlocalCart(id,varientId);
        // console.log(res,"responseresponseresponse")
        response = res;
      }
      if (response.message) {
        successToast(response.message);
        handleGetCart();
      }
    } catch (err) {
      errorToast(err);
    }
  };
  const handleGetCart = async () => {

    // console.log("cart start")
    try {
      let response = "";
      if (getToken() && getToken() != null) {
        let { data: res } = await getCartData();
        response = res;
      } else {
        let { data: res } = await getLocalCart();
        // console.log(res, "cart");

        response = res;
      }
      if (response.data) {
      setCartArr(response.data);
      setCarts(response.data.length)
      }
    } catch (err) {
      errorToast(err);
      // console.error(err);
    }
  };

  
  useEffect(() => {

    // console.log(showCartSideBar, " showCartSideBar cartArr1");

    handleGetCart();
    if (showCartSideBar == true) {
      // handleGetCart();
      setshow("show")

     }else {
        setshow("")
     } 

  }, [showCartSideBar]);



  const getTotalValue = () => {
    return cartArr && cartArr.length > 0
      ? cartArr.reduce((acc, el) => acc + (el.variantobj?.name?el.variantobj.price:el.price)*el.quantity, 0)
      : 0;
  };

const hanndleProceedpay = () => {
  setShowCartSideBar(false);
  navigate('/Procedure');
//     if(getToken()){
//     }
//  else{
//     navigate('/Login');

//  }
    }

  // useEffect(() => {
  //   setcartProduct(cartProduct);
  // }, [cartProduct]);

  return (
    <div
      className={`offcanvas offcanvas-start cart-sidebar fade ${show}`}
      tabIndex="-1"
      id="cart-offcanvas"
      aria-labelledby="cart-offcanvasLabel"
    >
      <div className="cart-box offcanvas-body">
        <div className="cart-heading position-relative">
          <h6 className="poppin mb-0">Shopping Cart</h6>
          <button
            type="button"
            className="btn-close pointer position-absolute end-0 top-0"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
            onClick={()=>{setShowCartSideBar(false)}}
          ></button>
        </div>
        <div className="cart-product-container">
          {cartArr && cartArr.length > 0 ? (
            cartArr.map((item, i) => {
              return (
                  <div className="cart-product" key={i}>
                    <div className="box">
                      <div className="left">
                        <img
                          src={generateImageUrl(item?.productImage)}
                          alt={item?.productObj?.name}
                          className="cart-product-img"
                        />
                      </div>
                      <div className="right flex-1">
                        <p className="cart-product-heading">
                          {item?.productName}
                        </p>
                        <ul className="product-detail-tags">
                          <li>
                            <p><span className="fw-semibold">sku: </span>{item?.sku}</p>
                          </li> 
                          { item?.variantobj && item.variantobj.name && (
                            <li>
                            <p><span className="fw-semibold">size: </span>{item.variantobj.name}</p>
                          </li>
                          )
                            
                          }
                          <li>
                            <div className="handle-quantity">
                              <div className="product-quantity">
                              <div
                                  className="plus-minus"
                                  onClick={() =>
                                    handleReduceItemQuantityFromCart(
                                      item.productId,
                                      item.varientId
                                    )
                                  }
                                >
                                  -
                                </div>
                              
                                <div className="show-quantity">
                                  {item?.quantity}
                                </div>
                                <div
                                  className="plus-minus"
                                  onClick={() => handleAddToCart(item,
                                    {
                                      quantity:1,
                                      attribute:item.variantobj.name?item.variantobj.name:"",
                                      price:item.price,
                                      stock:item.stock,
                                      variantobj:item.variantobj.name?item.variantobj:{}
                                    }
                                  )}
                                >
                                  +
                                </div>

                              </div>
                              <p className="mt-3" >  {item?.variantobj && item.variantobj.name ? (getconvertIntoCurrencyPriceWithSymbol(item.variantobj.price)) : ( getconvertIntoCurrencyPriceWithSymbol(item?.price))}</p>

                            </div>
                            {/* <Quantity
                          initial={item.quantity}
                          array={cartArr}
                          setarray={setcartProduct}
                          index={i}
                        /> */}
                          </li>
                        </ul>
                        <div className="cart-price">
                          <div
                            className="icon delete-product pointer"
                            onClick={() => handleRemoveFromCart(item.productId ,item.varientId)}
                          >
                            <ImBin />
                          </div>
                          <p className="product-detail-price mb-0 fw-semibold">
                             {item?.variantobj && item.variantobj.name ? (getconvertIntoCurrencyPriceWithSymbol(item.variantobj.price*item.quantity)) : ( getconvertIntoCurrencyPriceWithSymbol(item?.price*item.quantity))}
                            
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
              );
            })
          ) : (
            <div className="text-center h-100 flex-column d-flex justify-content-center">
              <img src={images.empty_cart} alt="" />
              <h4>Your Cart is Empty!!!</h4>
            </div>
          )}
          <div className="order-summary">
            <div className="cart-heading">
              <h6 className="poppin">Order Summary</h6>
            </div>
            <ul>
              <li>
                <span>Basket Total</span>
                {getCurrencyPriceSymbol()}
                {getconvertIntoCurrencyPriceWithOutSymbol(
                  getTotalValue().toFixed(2)
                )}
              </li>
              <li>
                <span>Grand Total</span>
                <span className="green">
                  {getCurrencyPriceSymbol()}
                  {getconvertIntoCurrencyPriceWithOutSymbol(
                    getTotalValue().toFixed(2)
                  )}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="cart-bottom">
        <ul className="product-detail-links">
          <li>
            <button
              onClick={()=>{setShowCartSideBar(false);navigate("/")}}
              className="btn btn-hover btn-custom btn-green " data-bs-dismiss="offcanvas"
            >
              Continue Shopping
            </button>
          </li>
          <li>
            <button type="button"  className="btn btn-hover btn-custom btn-maroon" data-bs-dismiss="offcanvas" onClick={()=>{hanndleProceedpay()}}>
            Proceed To Pay
            </button>
           
         
          </li>
        </ul>
      </div>
    </div>
  );
}

export default CartBar;
