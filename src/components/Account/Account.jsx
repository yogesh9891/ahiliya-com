import React, { useContext } from "react";
import { useState } from "react";
import { ImPointRight } from "react-icons/im";
import { useNavigate } from "react-router-dom";
import { AuthoriseContext } from "../../App";
import { removeToken } from "../../services/User.service";
import { images } from "../Utility/Images";
import SocialBanner from "../Utility/SocialBanner";
import WishlistTable from "../WishlistTable";
import OrderHistory from "./OrderHistory";
import Profile from "./Profile";
import TrackOrder from "./TrackOrder";

function Account() {
  const [initial, setinitial] = useState("profile");
  const [orderDetail, setorderDetail] = useState(false)
  const [isAuthorized, setIsAuthorized] = useContext(AuthoriseContext);
  const navigate = useNavigate()
  const [tabs, settabs] = useState([
    {
      name: "Profile",
      render: <Profile />,
      value: "profile",
    },
    {
      name: "WishList",
      render: <WishlistTable />,
      value: "wishlist",
    },
    {
      name: "Order History",
      render: <OrderHistory />,
      value: "order",
    },
    {
      name: "Track Your Order",
      render: <TrackOrder />,
      value: "trackOrder",
    },
  ]);


  const handleLogout = () => {
    removeToken()
    navigate("/")
    setIsAuthorized(false)
  }
  return (
    <main>
      <section className="account-page pb-50 mt-5">
        <div className="container-fluid">
          <div className="row gy-4">
            <div className="col-12 col-xl-4 col-xxl-3">
              <ul className="account-page-left">
                <li>
                  <h5 className="poppin green">Hii, User !</h5>
                </li>
                {tabs.map((item, i) => {
                  return (
                    <li
                      key={i}
                      onClick={() => setinitial(item.value)}
                      className={initial === item.value ? "active" : ""}
                    >
                      <div className="icon">
                        <ImPointRight />
                      </div>
                      <button>{item.name}</button>
                    </li>
                  );
                })}
                <li>
                  <div className="icon">
                    <ImPointRight />
                  </div>
                  <button onClick={() => handleLogout()}>Sign Out</button>
                </li>
              </ul>
            </div>
            <div className="col-12 col-xl-8 col-xxl-9">
              {tabs.map((item, i) => {
                return (
                  item.value === initial && (
                    <div className="account-page-right">
                      <h5 className="title poppin">{item.name}</h5>

                      {item.render}
                    </div>
                  )
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <SocialBanner />
    </main>
  );
}

export default Account;
