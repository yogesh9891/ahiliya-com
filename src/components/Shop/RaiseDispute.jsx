import React, { useState } from "react";
import Select from "react-select";
import { images } from "../Utility/Images";
import PageBanner from "../Utility/PageBanner";
import Quantity from "../Utility/Quantity";
import SocialBanner from "../Utility/SocialBanner";

function RaiseDispute() {
  const [cartProduct, setcartProduct] = useState([
    {
      name: "Bagh Hand Block Printed Natural Dyed Cotton Fabric",
      img: images.product1,
      price: 350.0,
      quantity: 1,
      status: "placed",
    },
  ]);
  const options = [
    { value: "Wooden printing blocks", label: "Wooden printing blocks" },
    { value: "Fabric", label: "Fabric" },
    { value: "Home Decor", label: "Home Decor" },
    { value: "Clothing", label: "Clothing" },
    { value: "Paper & journals", label: "Paper & journals" },
    { value: "Bags & Accessories", label: "Bags & Accessories" },
    { value: "Christmas", label: "Christmas" },
    { value: "Bulk Order", label: "Bulk Order" },
  ];
  return (
    <main>
      <PageBanner
        banner4
        title="Order #11"
        text="Bagh Hand Block Printed Natural Dyed Cotton Fabric"
      />

      <section className="mb-50 account-page-right">
        <div className="container">
          <h4>Fill out the form to raise your dispute</h4>
          <div className="gray-bg px-4 py-5">
            <form action="/" className="form row">
              <div className="col-12 mb-4">
                <label className="mb-1 text-dark">Title Of Your Message</label>
                <input type="text" className="form-control" />
              </div>
              <div className="col-12 mb-4">
                <label className="mb-1 text-dark">Your Message</label>
                <textarea className="form-control" rows="5"></textarea>
              </div>
              <div className="col-12">
                <button
                  type="submit"
                  className="btn btn-hover btn-custom btn-green rounded px-4"
                >
                  Continue
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
      <section className="profile-page mb-50">
        <div className="container">
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
                      <td>{item.quantity}</td>
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
        </div>
      </section>

      <SocialBanner />
    </main>
  );
}

export default RaiseDispute;
