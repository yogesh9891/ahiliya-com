import React, { useState, useRef, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import ReactDOM from "react-dom";
import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer
} from "@paypal/react-paypal-js";
import OrderSummary from "./OrderSummary";
import $ from "jquery";
import {
  createCodOrder,
  createGuestOrder,
  createOrder,
  orderCallback,
  paypalPaymentCallback,
} from "../../services/order.service";
import { errorToast, successToast } from "../../utils/Toast";
import { getCartData } from "../../services/UserCart.service";
import { clearLocalCart, getLocalCart } from "../../services/localCart";
import { getToken } from "../../services/User.service";
import { CartCountContext } from "../../App";
import { images } from "../Utility/Images";


function Payment({ setprocedure }) {
  const navigate = useNavigate();
  const [hidePaymentNote, setHidePaymentNote] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("paypal");
  const [loading, setLoading] = useState(false);
  const [currencyObj, setCurrencyObj] = useState("");
  const payPalBtnRef = useRef()
  const [currency, setCurrency] = useState("GBP");
  const PayPalButton = window.paypal.Buttons.driver("react", {
    React,
    ReactDOM,
  });

  const [carts, setCarts] = useContext(CartCountContext)

  const handleGetCart = async () => {
    try {
      let { data: res } = await getCartData();

      // console.log("dflkalkdlsdk")
      if (res.data.length == 0) navigate("/Procedure")
      return 0
    } catch (err) {

    }
  };

  useEffect(() => {
    let localCurrency = localStorage.getItem("currency-conver-rate");
    let localCurrencyObj = JSON.parse(localCurrency);

    if (localCurrencyObj && localCurrencyObj?.code) {
      console.log(localCurrencyObj?.code, "localCurrencyObj?.code")
      setCurrency(localCurrencyObj?.code)
    }


  }, [])


  const handlecreateGuestOrder = async () => {
    try {

      let userCartObj = await getLocalCart();
      // console.log(userCartObj.data,"userCartObjuserCartObj")
      if (userCartObj.data == null) {
        errorToast("Your Cart is Empty")
        return
      }
      let localCurrency = localStorage.getItem("currency-conver-rate");
      let localCurrencyObj = JSON.parse(localCurrency);
      let obj = {
        userCart: userCartObj.data,
        currencyObj: localCurrencyObj
      }
      if (localCurrencyObj && localCurrencyObj?.code) {
        setCurrency(localCurrencyObj?.code)
      }
      setCurrencyObj(localCurrencyObj);
      let localDiscount = localStorage.getItem("cart-discount");

      if (localDiscount) {
        let localDiscountobj = JSON.parse(localDiscount);
        obj.localDiscount = localDiscountobj;
      }

      let localShipping = localStorage.getItem("cart-shipping");

      if (localShipping) {
        let localShippingObj = JSON.parse(localShipping);
        obj.localShipping = localShippingObj;

      }
      let localAddress = localStorage.getItem("cart-address");
      if (localAddress) {
        let localAddressObj = JSON.parse(localAddress);
        obj.localAddress = localAddressObj;
      }
      // console.log(obj,"obj124123")
      const res = await createGuestOrder(obj);
      // console.log(res,"23423res2")
      return res;
    } catch (error) {
      // console.error(error);
      errorToast(error);
    }

  }

  const clearlocalStorage = () => {
    localStorage.setItem("cart-shipping", null);
    // localStorage.setItem("cart-address",null);   
    localStorage.setItem("cart-discount", null);
    clearLocalCart()
    setCarts(0)
  }
  const createOrderPay = async (data, actions) => {
    try {
      let res = "";
      setLoading(true);

      if (getToken()) {
        res = await createOrder();
      } else {
        res = await handlecreateGuestOrder();
      }
      if (res.data.success) {
        // console.log(JSON.stringify(res.data, null, 2),"paypal");
        console.log(actions, "Order", actions)
        return actions.order.create({
          purchase_units: [
            {
              amount: {
                value: res.data.data.amount / 100,
              },
            },
          ],
        });
      }
    } catch (error) {
      setLoading(false);

      // console.error(error);
      errorToast(error);
    }
  };

  const onApprove = (data, actions) => {
    // The order is created successfully
    // navigate("/OrderComplete");

    return actions.order.capture();
  };

  // Handle the errors in case there is something wrong
  const onError = (err) => console.log("Error ", err);

  function loadScript(src) {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  }


  async function displayRazorpay(obj, orderId) {
    //  console.log(obj,"obj, =-=", orderId,"-=-= orderId")
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    const options = {
      key: "rzp_live_7vqxfDFU1ZayDE", // Enter the Key ID generated from the Dashboard
      // key: "rzp_test_jOl57g4TNamtFW", // Enter the Key ID generated from the Dashboard
      amount: obj.amount,
      currency: obj.currency,
      name: "Ahilya",
      description: "Order",
      // image: { logo },
      order_id: obj.id,
      handler: async function (response) {
        const data = {
          orderCreationId: obj.id,
          razorpayPaymentId: response.razorpay_payment_id,
          razorpayOrderId: response.razorpay_order_id,
          razorpaySignature: response.razorpay_signature,
        };

        const serialize = function (obj) {
          var str = [];
          for (var p in obj)
            if (obj.hasOwnProperty(p)) {
              str.push(
                encodeURIComponent(p) + "=" + encodeURIComponent(obj[p])
              );
            }
          return str.join("&");
        };

        let { data: res } = await orderCallback(serialize(obj), orderId);
        if (res) {
          // navigate("/account/order");
          setLoading(false);

          successToast(res.message);

          clearlocalStorage();
          navigate(`/OrderComplete/${res.orderId}`);
        }
      },

      theme: {
        color: "#61dafb",
      },
    };
    // console.log(options,"opt2ions----")
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  }



  const handleCheckout = async () => {
    try {
      let res = "";
      setLoading(true)
      if (getToken()) {
        res = await createOrder();
        //  console.log(res,"******123res===")

      } else {
        res = await handlecreateGuestOrder();
        //  console.log(res,"123res===")
      }
      // console.log(res,"res===")
      if (res.data.success) {
        // console.log(JSON.stringify(res.data, null, 2),'displayRazorpay');
        setLoading(true);
        displayRazorpay(res.data.data, res.data.orderId);
        setLoading(false)
      }
    } catch (error) {
      // console.error(error);
      errorToast(error);
      setLoading(false)
    }
  };

  const handleCodOrderSubmit = async () => {
    try {
      const { data: res } = await createCodOrder();
      if (res) {
        successToast(res.message);
        navigate("/OrderComplete");
      }
    } catch (error) {
      errorToast(error);
    }
  };

  const handleOrder = () => {

    // handlecreateGuestOrder();
    if (loading) {
      return 0;
    }
    if (paymentMethod == "Razorpay") {
      handleCheckout();
    } else if (paymentMethod == "paypal") {


      console.log(payPalBtnRef, "payPalBtnRef.current")

      alert("Please Click On PayPal BUtton")

      // button.addEventListener('click', ()=>{
      //   alert("Please Click On PayPal BUtton")
      // })


    } else {
      handleCodOrderSubmit();
    }
  };

  return (
    <div className="shipping-page">
      <div className="container">
        <div className="title-section text-center mb-4">
          <h1 className="heading mb-0">Payment</h1>
          <Link to="/Product-Detail" className="text-dark btn-hover btn-custom">
            Continue Shopping
          </Link>
        </div>
        <div className="row gy-4">
          <div className="col-12 col-xl-7">
            <div className="shipping-page-left">
              {/* <ul className="info">
                <li>
                  <div className="d-flex align-items-center gap-3">
                    <span>Contact</span>
                    <span>admin@admin.com</span>
                  </div>
                  <span>
                    <Link
                      to="#"
                      className="green fw-semibold"
                      onClick={() => setprocedure("checkout")}
                    >
                      Change
                    </Link>
                  </span>
                </li>
                <li>
                  <div className="d-flex align-items-center gap-3">
                    <span>Ship to</span>
                    <span>4, 110086 sultanpuri majra DL, India</span>
                  </div>
                  <span>
                    <Link
                      to="#"
                      className="green fw-semibold"
                      onClick={() => setprocedure("checkout")}
                    >
                      Change
                    </Link>
                  </span>
                </li>
                <li>
                  <div className="d-flex align-items-center gap-3">
                    <span>Method</span>
                    <span>
                      Shipping is FREE for your order above 500 Rs.!
                    </span>
                  </div>
                </li>
              </ul> */}
              <p className="title mb-0">Payment</p>
              <p className="mb-2">All transactions are secure and encrypted.</p>
              <p className="mb-2 text-danger">{loading == false ? 'Please Click on payment method for Payment. ' : 'Please Wait....'}</p>
              <form className="form">
                <ul className="info">
                  <li className="my-2">
                    <div className="form-check">
                      <label className="pointer">
                        {/* <input
                          className="form-check-input"
                          type="radio"
                          name="payment-method"
                          onClick={() => setPaymentMethod("paypal")}
                          checked={paymentMethod == "paypal"}
                        /> */}

                        <ButtonWrapper
                          currency={currency}
                          showSpinner={false}
                          setLoading={setLoading}
                        />
                        {/* </PayPalScriptProvider> */}

                        Paypal (International Payments)
                      </label>
                    </div>
                  </li>
                  <li className="my-2">
                    <div className="form-check">
                      <label className="form-check-label" onClick={() => handleCheckout()}>
                        {/* <input
                          className="form-check-input"
                          type="radio"
                          name="payment-method"
                          onClick={() => setPaymentMethod("Razorpay")}
                          checked={paymentMethod == "Razorpay"}
                        /> */}

                        <img src={images.razorpay_logo} width="100px" />
                        Razorpay Secure (UPI, Cards, Wallets, NetBanking)
                      </label>
                    </div>
                  </li>

                </ul>
              </form>

              {/* <div className="links">
              
                <div
                  onClick={() => handleOrder()}
                  className="btn btn-hover btn-custom btn-maroon rounded-1 px-4 py-3" 
                >
                  {
                    loading ==false ? ' Continue to Payment ' : 'Please Wait'
                  }
                 
                </div>
              </div> */}
            </div>
          </div>
          <div className="col-12 col-xl-5">
            <OrderSummary />
          </div>
        </div>
      </div>
    </div>
  );
}
const amount = "2";
const style = { "layout": "vertical" };
const ButtonWrapper = ({ currency, showSpinner, setLoading }) => {

  const [{ options, isPending }, dispatch] = usePayPalScriptReducer();
  const [orderId, setOrderId] = useState("");
  const [paymentResponse, setPaymentResponse] = useState({});
  const [triggerPaymentCallback, setTriggerPaymentCallback] = useState(false);
  const navigate = useNavigate()

  useEffect(() => {
    dispatch({
      type: "resetOptions",
      value: {
        ...options,
        currency: currency,
      },
    });
  }, [currency, showSpinner]);

  const createOrderPay1 = async (data, actions) => {
    try {
      let res = "";

      if (getToken()) {
        res = await createOrder();
      } else {
        res = await handlecreateGuestOrder();
      }
      if (res.data.success) {
        // console.log(JSON.stringify(res.data, null, 2),"paypal");
        console.log(data, "Order", actions)
        let response = await actions.order.create({
          purchase_units: [
            {
              amount: {
                value: res.data.data.amount / 100,
              },
            },
          ],
        })
        //   .then((orderId) => {
        //     console.log(orderId,"orderIdorderIdorderId")
        //     // Your code here after create the order

        //     // return orderId;
        // });


        console.log(response)
      }
    } catch (error) {

      console.error(error);
      errorToast(error);
    }
  };

  const handlecreateGuestOrder = async () => {
    try {

      let userCartObj = await getLocalCart();
      // console.log(userCartObj.data,"userCartObjuserCartObj")
      if (userCartObj.data == null) {
        errorToast("Your Cart is Empty")
        return
      }
      let localCurrency = localStorage.getItem("currency-conver-rate");
      let localCurrencyObj = JSON.parse(localCurrency);
      let obj = {
        userCart: userCartObj.data,
        currencyObj: localCurrencyObj
      }
      let localDiscount = localStorage.getItem("cart-discount");

      if (localDiscount) {
        let localDiscountobj = JSON.parse(localDiscount);
        obj.localDiscount = localDiscountobj;
      }

      let localShipping = localStorage.getItem("cart-shipping");

      if (localShipping) {
        let localShippingObj = JSON.parse(localShipping);
        obj.localShipping = localShippingObj;

      }
      let localAddress = localStorage.getItem("cart-address");
      if (localAddress) {
        let localAddressObj = JSON.parse(localAddress);
        obj.localAddress = localAddressObj;
      }
      // console.log(obj,"obj124123")
      const res = await createGuestOrder(obj);
      // console.log(res,"23423res2")
      return res;
    } catch (error) {
      // console.error(error);
      errorToast(error);
    }

  }

  const handleSetPaymentStatus = async () => {
    try {

      let { data: res } = await paypalPaymentCallback(paymentResponse, orderId);
      if (res) {
        setLoading(false)
        successToast(res.message);
        navigate(`/OrderComplete/${res.orderId}`);
        console.log(res, "payment callback response")
      }
    }
    catch (err) {
      setLoading(false)

      errorToast(err);
    }

  }

  useEffect(() => {

    if (triggerPaymentCallback) {
      if (orderId != "") {
        handleSetPaymentStatus()
      }
    }
  }, [triggerPaymentCallback, orderId])

  return (<>
    {(showSpinner && isPending) && <div className="spinner" />}

    <PayPalButtons
      style={style}
      disabled={false}
      // forceReRender={[amount, currency, style]}
      // fundingSource={undefined}
      createOrder={async (data, actions) => {
        setLoading(true)

        let localCurrency = localStorage.getItem("currency-conver-rate");
        let localCurrencyObj = JSON.parse(localCurrency);
        let obj = {
          currencyObj: localCurrencyObj
        }
        let res
        if (getToken()) {
          try {
            res = await createOrder(obj);
          }
          catch (err) {
            console.log()
            setLoading(false)

            errorToast(err)
          }
        } else {
          try {
            res = await handlecreateGuestOrder();
          }
          catch (err) {
            console.log()
            setLoading(false)

            errorToast(err)
          }
        }
        if (res.data.success) {
          console.log(JSON.stringify(res.data, null, 2), "paypal", res.data.orderId);
          setOrderId(res.data.orderId)
          console.log(data, "Order", actions, currency)
          // console.log(res.data.data.amount)

          return actions.order
            .create({
              purchase_units: [
                {
                  amount: {
                    currency_code: currency,
                    value: res.data.data.amount / 100,
                  },
                },
              ],
            })
            .then((orderId) => {
              // Your code here after create the order
              return orderId;
            });
        }


      }}


      onApprove={function (data, actions) {
        return actions.order.capture().then(async function (dataValue) {
          // Your code here after capture the order
          console.log(data, "data razor", dataValue, orderId)

          setPaymentResponse(dataValue);
          setTriggerPaymentCallback(true);

        });
      }}
    />

  </>
  );
}
export default Payment;
