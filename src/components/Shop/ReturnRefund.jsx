import React, { useState, useEffect } from "react";
import Select from "react-select";
import PageBanner from "../Utility/PageBanner";
import Quantity from "../Utility/Quantity";
import SocialBanner from "../Utility/SocialBanner";

import { Link, useParams, useSearchParams } from "react-router-dom";
import { getOrderById } from "../../services/order.service";
import { generateImageUrl } from "../../services/url.service";
import { errorToast } from "../../utils/Toast";
import { images } from "../Utility/Images";
import { getOrderIdSequence } from "../../utils/country";

function ReturnRefund() {
  const [searchParams, setSearchParams] = useSearchParams("");

  const [orderObj, setOrderObj] = useState({});

  const [cartProduct, setcartProduct] = useState([
   
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


  const getOrderDetails = async () => {
    try {
      const { data: res } = await getOrderById(searchParams.get("orderId"));
      // console.log(res, "order get");
      if (res) {
        // setcartProduct([res.data])
        setOrderObj(res.data);
      }
    } catch (error) {
      errorToast(error);
    }
  };

  useEffect(() => {
    getOrderDetails();
    // console.log(searchParams, "get searchParams");
  }, []);
  useEffect(() => {
    console.log(orderObj, "orderObj get");
  }, [orderObj]);

  return (
    <main>
        <PageBanner
        banner4
        title={`Order ${orderObj.orderId ? '#'+getOrderIdSequence(orderObj.orderId) : ''}}`}
        text={`Order Status : ${orderObj?.orderStatus}`}
      />

      <section className="mb-50 account-page-right">
        <div className="container">
          <div className="gray-bg px-4 py-5">
            <form action="/" className="form row">
         
              <div className="col-12 mb-4">
                <label className="mb-1 text-dark">Reason</label>
                <textarea className="form-control" rows="5"></textarea>
              </div>
              <div className="col-12">
                <button
                  type="button"
                  className="btn btn-hover btn-custom btn-green rounded px-4"
                >
                  Submit
                </button>
                {/* <p className="mb-0 mt-2">Return By Aug 20, 2022</p> */}
              </div>
            </form>
          </div>
        </div>
      </section>
      <section className="profile-page mb-50">
        <div className="container">


        <div className="cart-page">
              <table className="table ">
                <thead>
                  <tr className="times-roman">
                    <th scope="col">ID</th>
                    <th scope="col">Products</th>
                    <th scope="col">Name</th>
                    <th scope="col">Price</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Total</th>
                  </tr>
                </thead>
                <tbody className="cart-page-product">
                  {orderObj &&
                    orderObj?.productsArr &&
                    orderObj?.productsArr?.length > 0 &&
                    orderObj?.productsArr.map((item, i) => {
                      return (
                        <tr key={i}>
                          <td>
                            <span className="fw-semibold">#{i + 1}</span>
                          </td>
                        
                          <td>
                            <div className="cart-page-product-title">
                              <img
                                src={generateImageUrl(
                                  item.productId.imageArr[0]?.image
                                )}
                                alt={item.productId.imageArr[0]?.imageAlt}
                              />
                       
                            </div>
                          </td>
                          <td>
                            <div className="cart-page-product-title">
                            <p className="mb-0">{item.name}fffff</p>
                              </div></td>
                          <td>
                            {orderObj?.currencyObj?.symbol}{" "}
                            {item.convertedPrice}
                          </td>
                          <td>{item.quantity}</td>
                          <td>
                            {orderObj?.currencyObj?.symbol}{" "}
                            {parseInt(item.convertedTotalPrice)}
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
              <div className="d-flex align-items-center gap-3 justify-content-between  py-3 my-4">
              <div>
              
              </div>
              <div className="d-flex flex-column gap-2">
                  <p scope="subTotalcol">
                  SubTotal : &nbsp;
                      {orderObj?.currencyObj?.symbol}
                       &nbsp; {orderObj?.subTotalAmount}
                    </p>
                    <p scope="subTotalcol">
                    Shipping :&nbsp;
                  {orderObj?.currencyObj?.symbol}
                      {orderObj?.shippingCharges}
                    </p>
                    <p scope="subTotalcol">
                    Total :  &nbsp;
                  {orderObj?.currencyObj?.symbol}  
                {orderObj?.totalAmount}
                    </p>
              </div>
            </div>
            
            </div>
          {/* <div className="cart-page">
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
          </div> */}
        </div>
      </section>

      <SocialBanner />
    </main>
  );
}

export default ReturnRefund;
