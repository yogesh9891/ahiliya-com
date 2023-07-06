import React, { useState } from "react";
import { BsHandbagFill } from "react-icons/bs";
import { MdAccessTimeFilled } from "react-icons/md";
import { GiReceiveMoney } from "react-icons/gi";
import { FaUser } from "react-icons/fa";
import { images } from "../Utility/Images";
import Quantity from "../Utility/Quantity";
import PageBanner from "../Utility/PageBanner";
import SocialBanner from "../Utility/SocialBanner";

function TrackOrder() {
  const [cartProduct, setcartProduct] = useState([
    {
      name: "Bagh Hand Block Printed Natural Dyed Cotton Fabric",
      img: images.product1,
      price: 350.0,
      quantity: 1,
      status: "placed",
    },
  ]);
  return (
    <main>
      <PageBanner
        banner4
        title="Order #11"
        text="Bagh Hand Block Printed Natural Dyed Cotton Fabric"
      />

      <section className="mb-50 account-page-right">
        <div className="container">
          <h5 className="title poppin text-dark">
            RO023998298CN is <span className="green">In Transit</span>
          </h5>
          <div className="cart-page">
            <table className="table table-borderless">
              <thead>
                <tr className="times-roman">
                  <th scope="col">ID</th>
                  <th scope="col">Products</th>
                  <th scope="col">Price</th>
                  <th scope="col">Quantity</th>
                  <th scope="col">Status</th>
                </tr>
              </thead>
              <tbody className="cart-page-product">
                {cartProduct.map((item, i) => {
                  return (
                    <tr key={i}>
                      <td>
                        <span className="fw-semibold">#{i}</span>
                      </td>
                      <td>
                        <div className="cart-page-product-title">
                          <img src={item.img} alt={item.name} />
                          <p className="mb-0">{item.name}</p>
                        </div>
                      </td>
                      <td>Rs.{item.price}</td>
                      <td>
                       {item.quantity}
                      </td>
                      <td>
                        <button
                          className={`btn btn-custom btn-hover text-white btn-sm ${
                            (item.status === "placed" && "btn-green") ||
                            (item.status === "Cancelled" && "btn-danger") ||
                            (item.status === "Ready to ship" && "btn-warning")
                          }`}
                        >
                          {item.status}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <ul className="tracking-order">
            <li>
              <div className="current-order-box">
                <div className="icon">
                  <BsHandbagFill />
                </div>
                <div>
                  <h5 className="text-dark">Order Placed</h5>
                  <p>August 1, 2018</p>
                </div>
              </div>
            </li>
            <li>
              <div className="current-order-box">
                <div className="icon">
                  <MdAccessTimeFilled />
                </div>
                <div>
                  <h5 className="text-dark">Arriving Date</h5>
                  <p>August 1, 2018 by 9pm</p>
                </div>
              </div>
            </li>
            <li>
              <div className="current-order-box">
                <div className="icon">
                  <GiReceiveMoney />
                </div>
                <div>
                  <h5 className="text-dark">Total</h5>
                  <p>₹200</p>
                </div>
              </div>
            </li>
            <li>
              <div className="current-order-box">
                <div className="icon">
                  <FaUser />
                </div>
                <div>
                  <h5 className="text-dark">Ship to</h5>
                  <p>Authony Marano</p>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </section>

      <SocialBanner />
    </main>
  );
}

export default TrackOrder;
