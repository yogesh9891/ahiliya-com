import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { images } from "../Utility/Images";
import SocialBanner from "../Utility/SocialBanner";
import CartPage from "./CartPage";
import Checkout from "./Checkout";
import Payment from "./Payment";
import Shipping from "./Shipping";
import { getToken } from "../../services/User.service";
import { usePrevLocation } from "../Utility/LocationUtilHook";

function Procedure() {

  const navigate = useNavigate();

  let location = useLocation();
  let prev = usePrevLocation(location)

  const [procedure, setprocedure] = useState("checkout");

  const [checkoutData, setCheckoutData] = useState({});

  const [options, setoptions] = useState([
    {
      name: "Cart",
      value: "cart",
      path: "/Cart",
      render: <CartPage setprocedure={(val) => setprocedure(val)} />,
    },
    {
      name: "Checkout",
      value: "checkout",
      path: "/Checkout",
      render: <Checkout checkoutData={(val) => setCheckoutData(val)} setprocedure={(val) => setprocedure(val)} />,
    },
    {
      name: "Shipping",
      value: "shipping",
      path: "/Shipping",
      render: <Shipping checkoutData={checkoutData} setprocedure={setprocedure} />,
    },
    {
      name: "Payment",
      value: "payment",
      path: "/Payment",
      render: <Payment setprocedure={setprocedure} />,
    },
  ]);

  // useEffect(() => {
  //   if(!getToken()){
  //     navigate("/Login");
  //   }
  // }, []);
  // let history = use
  const scrollHAndler = () => {
    // alert("Scroll")
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    document.scrollTop = "0px";
  };

  // console.log(location, "location")



  return (
    <main>
      <section className="procedure pt-50 pb-50">
        <div className="container-fluid px-lg-5">
          <ul className="mb-4 mb-sm-5 procedure-tabs">
            {/* {console.log(options,"options234")} */}
            {options.map((item, i) => {
              return (
                <li key={i}>
                  <button
                    onClick={() => { setprocedure(item.value); scrollHAndler(); }}
                    className={`btn btn-hover btn-custom ${procedure === item.value ? "btn-green" : "btn-black"
                      }`}
                  >
                    {item.name}
                  </button>
                </li>
              );
            })}
          </ul>
          {options.map((item, i) => {
            return procedure === item.value && item.render;
          })}
        </div>
      </section>

      <SocialBanner />
    </main>
  );
}

export default Procedure;
