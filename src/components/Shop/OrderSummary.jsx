import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShippingCountryContext } from "../../App";
import { getAddress } from "../../services/address.service";
import { getconvertIntoCurrencyPriceWithOutSymbol, getconvertIntoCurrencyPriceWithSymbol, getCurrencyPriceSymbol } from "../../services/Currency.service";
import { getLocalCart } from "../../services/localCart";
import { getDecodedToken, getToken } from "../../services/User.service";
import { ApplyCouponApi, getCartData, getCartDataApi, getCartShippingCharge } from "../../services/UserCart.service";
import { errorToast, successToast } from "../../utils/Toast";

function OrderSummary() {
  const [cartArr, setCartArr] = useState([]);
  const [shipping, setshipping] = useState(0)
  const [weight, setWeight] = useState(0)
  const [code, setCode] = useState("")
  const [discount, setDisocunt] = useState("")
  const [country, setcountry] = useState("");
  const navigate = useNavigate()
  const  [contextCounry,setcontextCounry]= useContext(ShippingCountryContext)

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
        // console.log( "cart insoide");
        setCartArr(response.data);
      }
    } catch (err) {
      errorToast(err);
      // console.error(err);
    }
  }

  const handleGetUserCart = async () => {
    try {
      let { data: res } = await getCartDataApi();
      // console.log(res.data,"sahfsahsiuashfuahfausdfhsu")
      if (res.data && res.data.dicountObj) {
  
          setDisocunt(res.data.dicountObj)
          
      } else {

        setDisocunt(null)
      }
    } catch (err) {
      errorToast(err);
      // console.error(err);
    }
  };

  const handleGetAddress = async () => {
    try {
      let { data: res } = await getAddress();
      // console.log(res,"Addresss");
      if (res.data && res.data.length > 0) {
        let address = res.data.find((el) => el.isDefault == true);

        // console.log(address,"dsfgsdfd")
        setcountry(address?.country)
        setcontextCounry(address.country)
      }
    } catch (err) {
      errorToast(err);
    }
  };
  useEffect(() => {
  


    if(getToken()){
      
      handleGetAddress();
      handleGetCart();
      handleGetUserCart();

    handleGetShippingCharge();

    } else {
      handleGetCart();
      handleGetShippingCharge();
      let localShipping = localStorage.getItem("cart-shipping");    
      if(localShipping){
        let  cart = JSON.parse(localShipping);
        // console.log(cart,"cartcart")
        if(cart){
          setshipping(cart.price)
  
        }
      }
    
      let localDiscount = localStorage.getItem("cart-discount"); 
      let  localDiscountobj = JSON.parse(localDiscount);
      if(localDiscountobj!=""){
        setDisocunt(localDiscountobj)
        
      }

      
    }
 

  }, []);

  useEffect(() => {
    // console.log(contextCounry,"contextCounrycontextCounry")
    if(contextCounry ){
        handleGetShippingCharge();

    }
    // console.log(contextCounry,"contex++++++++++++++++++++++")


  }, [contextCounry,cartArr]);


  const handleGetShippingCharge = async () => {
    try {

      let totalWeight = getWeightValue();
      let decodeToken = getDecodedToken();
      // console.log(totalWeight,"wt")
      if(contextCounry && totalWeight){
        let query =`country=${contextCounry}&weight=${totalWeight}`;
        if(decodeToken && decodeToken.userId){
          query += `&userId=${decodeToken?.userId}`
        }

        let { data: res } = await getCartShippingCharge(query,{cartArr})
        // console.log(res, "cart")
        if (res.data) {
          if(res?.data?.price)
          setshipping(res?.data?.price)
          localStorage.setItem('cart-shipping', JSON.stringify(res?.data))
        } else {
          setshipping("")
          localStorage.setItem('cart-shipping', "")

        }
      }
    }
    catch (err) {
      console.error(err)
      errorToast(err)
    }
  }


  const handleApplyCoupon = async () => {
    try {

      if(`${code}` == ''){
        errorToast("Please Fill Code ")
        return
      }

      let obj = {
        amount : getTotalValue().toFixed(2)
      }
      if(getToken()){
        let decodeToken = getDecodedToken();
        if(decodeToken){
          obj.userId = decodeToken.userId
        }
      }
      let { data: res } = await ApplyCouponApi(code,obj)
      // console.log(res, "cart")
      if (res.data) {
      // console.log(res.data, "cart")
        if(res.data){
          setDisocunt(res.data)
          localStorage.setItem('cart-discount', JSON.stringify(res?.data))

        } else {
          setDisocunt(null)
          localStorage.setItem('cart-discount', null)
        }
        if (res.message) {
          successToast(res.message)
        }
      
        return
    }
   
  } catch (err) {
    errorToast(err)
  }
  }


  const getWeightValue = () => {
    // console.log(cartArr,"cartArr")
    let wt =  cartArr && cartArr.length > 0 && cartArr.reduce((acc, el) =>acc+ el.quantity *parseInt(el.weight), 0) 
  //  console.log(wt,"sdfsdfs")
    return wt;
  }

  const getTotalValue = () => {
    return cartArr && cartArr.length > 0 ? cartArr.reduce((acc, el) => acc + el.quantity * (el.variantobj?.price?el.variantobj?.price:el.price), 0) : 0;
  };

  return (
    <div className="checkout-page-right">
      <p className="title">Your Order</p>
      <ul className="order-list">
        {cartArr &&
          cartArr.length > 0 &&
          cartArr.map((el, i) => {
            return (
              <li key={i}>
                <span>{el.productName}</span>
                <span>{el?.variantobj && el.variantobj.name ? getconvertIntoCurrencyPriceWithSymbol(el.variantobj.price * el.quantity) : getconvertIntoCurrencyPriceWithSymbol(el.price * el.quantity)}</span>
              </li>
            );
          })}

        <li>
          <form action="/" className="w-100">
            <div className="form-control subscribe-form mb-0 border-0">
              <input
                type="text"
                className="bg-transparent border-0 w-100"
                placeholder="Gift card or discount code"
                onChange={(e)=>{setCode(e.target.value)}}
              />
              <button type="button" onClick={()=>{handleApplyCoupon()}} className="btn btn-custom btn-hover btn-green">
                Apply
              </button>
            </div>
          </form>
        </li>
        <li>
          <span>Subtotal</span>
          <span> {getconvertIntoCurrencyPriceWithSymbol(getTotalValue().toFixed(2))}</span>
        </li>
          {
            discount && (
              <li>
              <span>Disount</span>
              <span>- {getCurrencyPriceSymbol()} {getconvertIntoCurrencyPriceWithOutSymbol(discount?.amount)}</span>
            </li>
            )
          }
        {
          shipping != 0 && (
            <li>
            <span>Shipping</span>
            <span className="fs-15"> { shipping != 0?getCurrencyPriceSymbol()+ ''+ getconvertIntoCurrencyPriceWithOutSymbol(shipping):'Free'}</span>
          </li>
          )
        }

         {
          shipping == 0 && contextCounry =='india' && (
            <li>
            <span>Shipping</span>
            <span className="fs-15">Free</span>
          </li>
          )
        }
        
     

        {
            discount  ? (
                    <li>
                <span>Total</span>
                <span className="green"> {getCurrencyPriceSymbol()} {getconvertIntoCurrencyPriceWithOutSymbol(getTotalValue() - discount.amount + +shipping)}</span>
              </li>
            ) : (
              <li>
          <span>Total</span>
          <span className="green"> {getCurrencyPriceSymbol()} {getconvertIntoCurrencyPriceWithOutSymbol(getTotalValue()+ +shipping)}</span>
        </li>
            )

          }
        
      </ul>
    </div>
  );
}

export default OrderSummary;
