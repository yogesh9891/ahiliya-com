import moment from "moment";
import React, { useEffect, useState } from "react";
import {
  Link,
  useSearchParams,
  useParams,
  useLocation,
} from "react-router-dom";
import { getOrderById } from "../../services/order.service";
import { generateImageUrl } from "../../services/url.service";
import { errorToast } from "../../utils/Toast";
import { images } from "../Utility/Images";
import PageBanner from "../Utility/PageBanner";
import SocialBanner from "../Utility/SocialBanner";
import { getOrderIdSequence } from "../../utils/country";
function ViewOrder() {
  const [searchParams, setSearchParams] = useSearchParams("");

  const [orderObj, setOrderObj] = useState({});
  const params = useParams();
  const location = useLocation();
  const getOrderDetails = async () => {
    try {
      const { data: res } = await getOrderById(searchParams.get("orderId"));
      if (res) {
        console.log(res.data, "order get");
        setOrderObj(res.data);
      }
    } catch (error) {
      errorToast(error);
    }
  };
  useEffect(() => {
    console.log(location?.search?.split("=")[1], "get locationlocation");
  }, [location]);

  useEffect(() => {
    getOrderDetails();
  }, []);

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
        title={`Order ${orderObj.orderId ? '#'+getOrderIdSequence(orderObj.orderId) : ''}`}
        text={`Order Status : ${orderObj?.orderStatus}`}
      />

      <section className="mb-50 account-page-right">
        <div className="container">
          <h5 className="title poppin">Order {orderObj.orderId ? '#'+getOrderIdSequence(orderObj.orderId) : ''}</h5>
          <div className="profile-page">
            <p className="fw-semibold mb-4">Order Information</p>
            <ul className="profile-info row gy-3">
              <li className="col-12 col-md-6">
                <span>Phone:</span>&nbsp;{orderObj?.addressObj?.phone}
              </li>
              <li className="col-12 col-md-6">
                <span>Email:</span>&nbsp;{orderObj?.addressObj?.email}
              </li>
              <li className="col-12 col-md-6">
                <span>Date:</span>&nbsp;
                {moment(orderObj?.createdAt).format("DD-MM-YYYY")}
              </li>
              <li className="col-12 col-md-6">
                <span>Payment Method:</span>&nbsp;{orderObj?.orderType}
              </li>
            </ul>
            <div className="d-flex align-items-center gap-3 justify-content-between border-top border-bottom py-3 my-4">
              <div>
                <p className="mb-0 fw-semibold">Billing Address</p>
                <ul className="profile-info row gy-3">
                  <li>
                    <span>Address:</span>&nbsp;
                    {orderObj?.addressObj?.addressLine1},
                    {orderObj?.addressObj?.addressLine2},
                    {orderObj?.addressObj?.city},{orderObj?.addressObj?.state}-
                    {orderObj?.addressObj?.pincode}
                  </li>
                </ul>
              </div>
              <div className="d-flex flex-column gap-2">
                <Link
                  // to={`/ReturnRefund`}
                  to={`/ReturnRefund?orderId=${
                    location?.search?.split("=")[1]
                  }`}
                  className="btn btn-hover btn-custom btn-green text-uppercase btn-sm py-2 px-4 btn-sm"
                >
                 Return / Rasie a Dispute
                </Link>
             
              </div>
            </div>
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
                            <p className="mb-0">{item.name}</p>
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
          </div>
        </div>
      </section>

      <SocialBanner className="border-0" />
    </main>
  );
}

export default ViewOrder;
