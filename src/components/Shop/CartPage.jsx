import React, { useEffect, useState,useContext } from "react";
import { AiFillCloseSquare } from "react-icons/ai";
import { Link } from "react-router-dom";
import { CartCountContext } from "../../App";
import { getconvertIntoCurrencyPriceWithSymbol } from "../../services/Currency.service";
import { addItemInToLocalCart, getLocalCart, reduceItemFromlocalCart, removeItemFromlocalCart } from "../../services/localCart";
import { generateImageUrl } from "../../services/url.service";
import { getToken } from "../../services/User.service";

import {
  addItemQuantityInCart,
  getCartData,
  removeItemCart,
  removeItemQuantityInCart,
} from "../../services/UserCart.service";
import { errorToast, successToast } from "../../utils/Toast";
import { images } from "../Utility/Images";
import Quantity from "../Utility/Quantity";


function CartPage({ setprocedure }) {
  // ===================================================================================================================

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
    // console.log(showCart ? "t" : "f", "showCart")
    // if (showCart) {
    handleGetCart();
    // }
  }, []);

  const getTotalValue = () => {
    return cartArr && cartArr.length > 0
      ? cartArr.reduce((acc, el) => acc + (el.variantobj?.name?el.variantobj.price:el.price)*el.quantity, 0)
      : 0;
  };

  //   ===================================================================================================================
  return (
    <div className="cart-page">
      <div className="title-section text-center mb-4">
        <h1 className="heading mb-0">Shopping Cart</h1>
        <Link to="/Product-Detail" className="text-dark btn-hover btn-custom">
          Continue Shopping
        </Link>
      </div>
      <div className="table-responsive">
        <table className="table table-borderless">
          <thead>
            <tr className="times-roman">
              <th scope="col" className="col-12 col-lg-4">
                Products
              </th>
              <th scope="col" className="col-12 col-lg-2">
                Price
              </th>
              <th scope="col" className="col-12 col-lg-3">
                Quantity
              </th>
              <th scope="col" className="col-12 col-lg-2">
                Total
              </th>
              <th scope="col" className="col-12 col-lg-1"></th>
            </tr>
          </thead>
          <tbody className="cart-page-product">
            {cartArr &&
              cartArr.length > 0 &&
              cartArr.map((item, i) => {
                return (
                  <tr key={i}>
                    <td className="col-12 col-lg-4">
                      <div className="cart-page-product-title">
                        <img
                          src={generateImageUrl(item?.productImage)}
                          alt={item?.productObj?.name}
                          className="cart-product-img"
                        />
                        <p className="mb-0 flex-1">{item?.productName}</p>
                        { item?.variantobj && item.variantobj.name && (
                            <><b className="fw-semibold">size: </b><span>{item.variantobj.name}</span></>
                          )
                        }
                      </div>
                    </td>
                    <td className="col-12 col-lg-2"><p className="mb-0">
                    
                    {item?.variantobj && item.variantobj.price ? (getconvertIntoCurrencyPriceWithSymbol(item.variantobj.price)) : ( getconvertIntoCurrencyPriceWithSymbol(item?.price))}
                    </p></td>
                    <td className="col-12 col-lg-3">
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
                          <div className="show-quantity">{item?.quantity}</div>
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
                      </div>
                    </td>
                    <td className="col-12 col-lg-2">
                      <p className="mb-0">  {item?.variantobj && item.variantobj.price ? (getconvertIntoCurrencyPriceWithSymbol(item.variantobj.price*item.quantity)) : ( getconvertIntoCurrencyPriceWithSymbol(item?.price*item.quantity))}</p>
                    </td>
                    <td className="col-12 col-lg-1">
                      <div
                        className="icon"
                        onClick={() => handleRemoveFromCart(item.productId ,item.varientId)}
                      >
                        <AiFillCloseSquare />
                      </div>
                    </td>
                  </tr>
                );
              })}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="2"></td>
              <td>Subtotal:</td>
              <td>{(getconvertIntoCurrencyPriceWithSymbol(getTotalValue().toFixed(2))) }</td>
              <td></td>
            </tr>
          </tfoot>
        </table>
      </div>
      <div className="links">
        <div
          onClick={() => setprocedure("checkout")}
          // to="/Checkout"
          className="btn btn-hover btn-custom btn-black rounded-1 px-4 py-3"
        >
          Checkout
        </div>
      </div>
    </div>
  );
}

export default CartPage;
