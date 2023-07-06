import React, { useEffect, useState } from "react";
import { AiFillCloseSquare } from "react-icons/ai";
import { Link } from "react-router-dom";
import Quantity from "./Utility/Quantity";
import { images } from "./Utility/Images";
import {
  getWishList,
  RemoveItemFromWishlist,
} from "../services/Wishlist.service";
import { generateImageUrl } from "../services/url.service";
import { getDecodedToken } from "../services/User.service";
import { errorToast, successToast } from "../utils/Toast";
import { addItemQuantityInCart } from "../services/UserCart.service";
import ReactPaginate from "react-paginate";

function WishlistTable() {
  // ===================================================================================================================
  const [cartProduct, setcartProduct] = useState([
    {
      name: "Bagh Hand Block Printed Natural Dyed Cotton Fabric",
      img: images.product1,
      price: 350.0,
    },
    {
      name: "Bagh Hand Block Printed Natural Dyed Cotton Fabric",
      img: images.product2,
      price: 300.0,
    },
    {
      name: "Bagh Hand Block Printed Natural Dyed Cotton Fabric",
      img: images.product3,
      price: 255.0,
    },
  ]);

  const [wishlistArr, setWishlistArr] = useState([]);

  const deleteCart = (i) => {
    // console.log(cartProduct, "cart");
    let temp = cartProduct.filter((item, index) => i !== index);
    setcartProduct([...temp]);
    // console.log(temp, i);
  };
  const handleGetWishListedItem = async () => {
    try {
      let { data: res } = await getWishList();
      if (res.data) {
        // console.log(res.data, "wishlist");
        setWishlistArr(res.data);
      }
    } catch (err) {
      errorToast(err);

      // console.error(err);
    }
  };

  const handleDeleteWishListedItem = async (id) => {
    try {
      let decoded = getDecodedToken();

      let obj = {
        productId: id,
        userId: decoded.userId,
      };
      let { data: res } = await RemoveItemFromWishlist(obj);
      if (res.message) {
        successToast(res.message);
        handleGetWishListedItem();
      }
    } catch (err) {
      errorToast(err);
      console.error(err);
    }
  };

  const handleAddToCart = async (id) => {
    try {
      let { data: res } = await addItemQuantityInCart(id);
      if (res.message) {
        successToast(res.message);
      }
    } catch (err) {
      errorToast(err);
    }
  };

  useEffect(() => {
    handleGetWishListedItem();
  }, []);

  // =======================PAGINATION===========================================
  const [itemOffset, setItemOffset] = useState(0);

  // Simulate fetching items from another resources.
  // (This could be items from props; or items loaded in a local state
  // from an API endpoint with useEffect and useState)
  const itemsPerPage = 10;
  const endOffset = itemOffset + itemsPerPage;
  // console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  const currentItems = wishlistArr.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(wishlistArr.length / itemsPerPage);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % wishlistArr.length;
    // console.log(
    //   `User requested page number ${event.selected}, which is offset ${newOffset}`
    // );
    setItemOffset(newOffset);
  };
  // =======================PAGINATION===========================================

  //   ===================================================================================================================
  return (
    <>
      <div className="cart-page">
        {wishlistArr && wishlistArr.length > 0 ? (
          <div className="table-responsive">
            <table className="table table-borderless">
              <thead>
                <tr className="times-roman">
                  <th scope="col">Products</th>
                  <th scope="col">Price</th>
                  {/* <th scope="col">
                Quantity
              </th> */}
                  <th scope="col">Add To Cart</th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody className="cart-page-product">
                {currentItems &&
                  currentItems.length > 0 &&
                  currentItems.map((item, i) => {
                    return (
                      <tr key={i}>
                        <td>
                          <div className="cart-page-product-title">
                            <img
                              src={generateImageUrl(
                                item?.productObj?.imageArr[0]?.image
                              )}
                              alt={item?.productObj?.name}
                            />
                            <p className="mb-0 flex-1">
                              {item?.productObj?.name}
                            </p>
                          </div>
                        </td>
                        <td>
                          <p className="mb-0">
                            Rs.&nbsp;{item?.productObj?.mrp}
                          </p>
                        </td>
                        {/* <td>
                    <Quantity
                      initial={item.quantity}
                      array={cartProduct}
                      setarray={setcartProduct}
                      index={i}
                    />
                  </td> */}
                        <td>
                          <div
                            onClick={() =>
                              handleAddToCart(item?.productObj?._id)
                            }
                            className="btn btn-hover btn-custom btn-green btn-sm"
                          >
                            Add to cart
                          </div>
                        </td>
                        <td>
                          <div
                            className="icon"
                            onClick={() =>
                              handleDeleteWishListedItem(item?.productObj?._id)
                            }
                          >
                            <AiFillCloseSquare />
                          </div>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center">
            <img src={images.empty_wishlist} alt="" />
            <h1 className="my-4">Your Wishlist is Empty!!!</h1>
            <Link
              to="/"
              className="btn btn-green btn-custom btn-hover btn-lg rounded-1"
            >
              Continue Shopping
            </Link>
          </div>
        )}
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

export default WishlistTable;
