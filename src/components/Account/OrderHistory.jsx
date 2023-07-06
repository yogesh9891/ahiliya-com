import React, { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { FaEye } from "react-icons/fa";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";
import { getOrderByUserId } from "../../services/order.service";
import { generateImageUrl } from "../../services/url.service";
import { errorToast } from "../../utils/Toast";
import { images } from "../Utility/Images";
import Quantity from "../Utility/Quantity";
import { getOrderIdSequence } from "../../utils/country";

function OrderHistory() {
  // ===================================================================================================================

  const [ordersArr, setOrdersArr] = useState([]);

  const getOrders = async () => {
    try {
      const { data: res } = await getOrderByUserId();
      if (res) {
        // console.log(res.data);
        setOrdersArr(res.data);
      }
    } catch (error) {
      // console.error(error);
      errorToast(error);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  const [cartProduct, setcartProduct] = useState([
    {
      name: "Bagh Hand Block Printed Natural Dyed Cotton Fabric",
      img: images.product1,
      price: 350.0,
      quantity: 1,
      status: "placed",
    },
    {
      name: "Bagh Hand Block Printed Natural Dyed Cotton Fabric",
      img: images.product2,
      price: 300.0,
      quantity: 4,
      status: "Ready to ship",
    },
    {
      name: "Bagh Hand Block Printed Natural Dyed Cotton Fabric",
      img: images.product3,
      price: 255.0,
      quantity: 6,
      status: "Cancelled",
    },
  ]);
  const [total, settotal] = useState(0);
  const deleteCart = (i) => {
    // console.log(cartProduct, "cart");
    let temp = cartProduct.filter((item, index) => i !== index);
    setcartProduct([...temp]);
    // console.log(temp, i);
  };

  useEffect(() => {
    let price = 0;
    for (let i = 0; i < cartProduct.length; i++) {
      price += cartProduct[i].price;
    }
    // console.log(price, "total");
    settotal(price);
  }, [cartProduct]);

  // =======================PAGINATION===========================================
  const [itemOffset, setItemOffset] = useState(0);

  // Simulate fetching items from another resources.
  // (This could be items from props; or items loaded in a local state
  // from an API endpoint with useEffect and useState)
  const itemsPerPage = 5;
  const endOffset = itemOffset + itemsPerPage;
  // console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  const currentItems = ordersArr.slice(itemOffset, endOffset);

  const pageCount = Math.ceil(ordersArr.length / itemsPerPage);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % ordersArr.length;
    // console.log(
    //   `User requested page number ${event.selected}, which is offset ${newOffset}`
    // );
    setItemOffset(newOffset);
  };
  // =======================PAGINATION===========================================

  //   ===================================================================================================================
  return (
    <>
      <div className="cart-page mb-50">
        <div className="table-responsive">
          <table className="table table-borderless">
            <thead>
              <tr className="times-roman">
                <th scope="col">ID</th>
                <th scope="col">Products</th>
                <th scope="col">Price</th>
                <th scope="col">Quantity</th>
                <th scope="col">Status</th>
                <th scope="col">View</th>
              </tr>
            </thead>
            <tbody className="cart-page-product">
              {currentItems &&
                currentItems?.length > 0 &&
                currentItems?.map((item, i) => {
                  return (
                    <tr key={i}>
                      <td>
                        <span className="fw-semibold">{item.orderId ? '#'+getOrderIdSequence(item.orderId) : ''}</span>
                      </td>
                      <td>
                        {/* <p> {JSON.stringify(item?.productsArr[0].productId?.imageArr[0]?.image, null, 2)}</p> */}
                        <div className="cart-page-product-title">
                          {/* <img
                            src={generateImageUrl(
                              item?.productsArr[0].productId?.imageArr[0]?.image
                            )}
                            alt={
                              item?.productsArr[0]?.productId?.imageArr[0]
                                ?.imageAlt
                            }
                          /> */}{ item?.addressObj?.name }
                        </div>
                      </td>
                      <td>
                        <p>
                          {item?.currencyObj?.symbol}&nbsp;
                          {item?.convertedTotalAmount}
                        </p>
                      </td>
                      <td>
                        {item?.productsArr?.reduce(
                          (acc, el) => acc + el.quantity,
                          0
                        )}
                      </td>
                      <td>
                        
                          {item.orderStatus}
                      </td>
                      <td>
                        <div className="actions">
                          <Link
                            to={`/ViewOrder?orderId=${item._id}`}
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
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>

      <div className="product-pagination mb-50">
        <ReactPaginate
          breakLabel="..."
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel="< previous"
          renderOnZeroPageCount={null}
        />
      </div>
    </>
  );
}

export default OrderHistory;

// || (item.status === "Cancelled" && "btn-danger") || (item.status === "Ready to ship" && "btn-warning")
