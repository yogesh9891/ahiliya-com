import React, { useState } from "react";
import { FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";
import { getOrderById, getOrderByUserId } from "../../services/order.service";
import { generateImageUrl } from "../../services/url.service";
import { errorToast } from "../../utils/Toast";

function TrackOrder() {

  const [orderId, setorderId] = useState("")
  const [order, setorder] = useState("")

 const handleChange = () => {
  if(`${orderId}` == ''){
    errorToast(
      "Please Fill Order Id"
    )
    return
    
  }

  getOrderDetails(orderId);
 }


 const getOrderDetails = async (id) => {
  try {
    const { data: res } = await getOrderById(id);
    if (res) {
      // console.log(res.data, "order")
      setorder(res.data);
    }
  } catch (error) {
    errorToast(error);
  }
};


  return (
    <div className="track-order col-12 col-md-6 my-4">
      <form action="/TrackOrder" className="row form">
        <div className="col-12 mb-2">
          <label className="mb-2">
            <p className="fw-semibold text-dark mb-1">
              Enter Order ID or Tracking Number
            </p>
            <input type="text" className="form-control" value={orderId} onChange={(e)=>{setorderId(e.target.value)}} />
          </label>
        </div>
        <div className="col-12">
          <button
            type="button"
            className="btn btn-hover btn-custom btn-green text-uppercase btn-sm py-2 px-4"

            onClick={()=>handleChange()}
          >
            Track
          </button>
          <div>
          <table className="table table-borderless">
          <thead>
            <tr className="times-roman">
              <th scope="col">ID</th>
              <th scope="col">Products</th>
              <th scope="col">Price</th>
              <th scope="col">Quantity</th>
              <th scope="col">Status</th>
              <th scope="col">Tracking Details</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody className="cart-page-product">
            {order &&
              order !="" &&
         
                 (
                  <tr > 
                          <td>
                      <p>
                        {order?._id}
                      </p>
                    </td>
                    <td>
                      {/* <p> {JSON.stringify(item?.productsArr[0].productId?.imageArr[0]?.image, null, 2)}</p> */}
                      <div className="cart-page-product-title">
                        <img
                          src={generateImageUrl(
                            order?.productsArr[0].productId?.imageArr[0]?.image
                          )}
                          alt={
                            order?.productsArr[0]?.productId?.imageArr[0]
                              ?.imageAlt
                          }

                          style={{width:130,height:130}}
                        />
                        {order.name && <p className="mb-0">{order.name}</p>}
                      </div>
                    </td>
                    <td>
                      <p>
                        {order?.currencyObj?.symbol}&nbsp;
                        {order?.convertedTotalAmount}
                      </p>
                    </td>
                    <td>
                      {order?.productsArr?.reduce(
                        (acc, el) => acc + el.quantity,
                        0
                      )}
                    </td>
                    <td>
                      <p
                    
                        className={`btn btn-custom btn-hover  btn-sm  text-white btn-green`}
                      >
                        {order.orderStatus}
                      </p>
                    </td>
                    <td>{order?.trackingId}</td>
                    <td>
                      <div className="actions">
                        <Link
                          to={`/ViewOrder?orderId=${order._id}`}
                          className="icon"
                        >
                          <FaEye />
                        </Link>
                        {/* <div className="icon" onClick={() => deleteCart(i)}>
                        <AiOutlineClose />
                      </div> */}
                      </div>
                    </td>
                  </tr>
                )
                    }
          </tbody>
        </table>
      </div>
        </div>
      </form>
    </div>
  );
}

export default TrackOrder;
