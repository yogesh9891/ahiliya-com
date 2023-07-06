import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAddress } from "../../services/address.service";
import { getToken } from "../../services/User.service";
import { errorToast } from "../../utils/Toast";
import OrderSummary from "./OrderSummary";

function Shipping({ setprocedure }) {

  const [address, setaddress] = useState("");


  useEffect(() => {
    if (getToken()) {
      handleGetAddress();
    } else {
      let localAddress = localStorage.getItem("cart-address");
      if (localAddress) {
        let cart = JSON.parse(localAddress);
        // console.log(cart.state,"cart-address")
        setaddress(cart)
      } else {
        setprocedure("checkout");

      }

    }
  }, []);
  const handleGetAddress = async () => {
    try {
      let { data: res } = await getAddress();
      // console.log(res);
      if (res.data && res.data.length > 0) {
        setaddress(res.data.find((el) => el.isDefault == true));
      }
    } catch (err) {
      errorToast(err);
    }
  };


  return (
    <div className="shipping-page">
      <div className="container">
        <div className="title-section text-center mb-4">
          <h1 className="heading mb-0">Shipping</h1>
          <Link to="/Product-Detail" className="text-dark btn-hover btn-custom">
            Continue Shopping
          </Link>
        </div>
        <div className="row gy-4">
          <div className="col-12 col-xl-7">
            <div className="shipping-page-left">
              <ul className="info">
                <li>
                  <div className="d-flex gap-3">
                    <span className="fw-semibold nowrap">Ship By</span>
                    <span>Aahilya Creations,C125, Sector 1, Rohini,New Delhi, Pin- 110085</span>
                  </div>
                  {/* <span>
                    <Link to="/" className="green fw-semibold">
                      Change
                    </Link>
                  </span> */}
                </li>
                <li>
                  <div className="d-flex gap-3">
                    <span className="fw-semibold nowrap">Ship to</span>
                    <span> {`${address?.addressLine1}, ${address?.addressLine2}, ${address?.landmark}, ${address?.city},
                     ${address?.state}, ${address?.country} - ${address?.pincode}`}</span>
                  </div>
                  <span>
                    <button type="button" onClick={() => setprocedure("checkout")} className="green fw-semibold">
                      Change
                    </button>
                  </span>
                </li>
              </ul>
              {/* <p className="title">Shipping method</p>
              <form className="form">
                <ul className="info">
                  <li>
                    <div className="form-check">
                      <label className="form-check-label">
                        <input className="form-check-input" type="radio" name="shipping-method" />
                        Shipping is FREE हमेशा for your order above 500 Rs.!
                      </label>
                    </div>
                    <span>
                      <p className="green fw-semibold mb-0">
                        Free
                      </p>
                    </span>
                  </li>
                </ul>
              </form> */}
              <div className="links">
                <div onClick={() => { setprocedure("payment"); window.scrollTo({ top: 0, left: 0, behavior: 'smooth' }); }} className="btn btn-hover btn-custom btn-maroon rounded-1 px-4 py-3">
                  Continue to Payment
                </div>
              </div>
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

export default Shipping;
