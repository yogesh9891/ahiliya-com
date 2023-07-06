  import React, { useState, useRef, useEffect, useMemo, useContext } from "react";
import { BsSuitHeart, BsSuitHeartFill } from "react-icons/bs";
import {
  Link,
  useLocation,
  useParams,
  useSearchParams,
  useHistory,
} from "react-router-dom";
// import { Link, useHistory } from "react-router-dom";
// import { useHistory } from 'react-router';
import Select from "react-select";

import { getNameById, getNameBySlug } from "../../services/Category.service";
import { getAllProducts } from "../../services/Product.service";
import { generateImageUrl } from "../../services/url.service";
import { getDecodedToken } from "../../services/User.service";
import {
  addItemQuantityInCart,
  getCartData,
} from "../../services/UserCart.service";

import {
  AddToWishlist,
  getWishList,
  RemoveItemFromWishlist,
} from "../../services/Wishlist.service";

import { errorToast, successToast } from "../../utils/Toast";
import { images } from "../Utility/Images";
import Wishlist from "../Utility/Wishlist";
import ShopFilter from "./ShopFilter";
import { getToken } from "../../services/User.service";

import {
  addItemInToLocalCart,
  getLocalCart,
  removeItemFromlocalCart,
} from "../../services/localCart";

import { getconvertIntoCurrencyPriceWithSymbol } from "../../services/Currency.service";
import { CartContext, CartCountContext, ProductFilterContext } from "../../App";
import ReactPaginate from "react-paginate";

function Products() {
  // const history = useHistory()
  const params = useParams();
  const location = useLocation();
  const [categoryObj, setCategoryObj] = useState({});
  let lastProductRef = useRef();
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useContext(ProductFilterContext);
  const [page, setPage] = useState(1);
  const [showFilters, setshowFilters] = useState(false);
  const [productsArr, setProductsArr] = useState([]);
  const [mainProductArr, setMainProductArr] = useState([]);
  const [currentCategory, setCurrentCategory] = useState("");
  const [wishlistArr, setWishlistArr] = useState([]);
  const [isintialLoad, setisintialLoad] = useState(false);
  const [categoryId, setcategoryId] = useState("");
  const [showCartSideBar, setShowCartSideBar] = useContext(CartContext);
  const [carts, setCarts] = useContext(CartCountContext);
  const [pageCount, setPageCount] = useState("");

  const [filterBySort, setFilterBySort] = useState("");
  const [filterBycategoryArr, setFilterBycategoryArr] = useState([]);
  const [filterByPriceRangeObj, setFilterByPriceRangeObj] = useState({});

  const handleGetproducts = async () => {
    let query = `limit=100&page=${page}`;

    if (params.id != "new-arrivals") {
      // if (searchParams.get("bestSeller") == true) {
      //   alert("hey")
      // }
      let { data: res } = await getNameBySlug(params.id);
      // if (res.data) {
      // console.log(res.data?._id, "res.data?._id234234");
      if (categoryId || categoryObj?._id || res.data?._id) {
        query = `categoryId=${
          categoryObj?._id
            ? categoryObj?._id
            : categoryId
            ? categoryId
            : res.data?._id
        }&limit=20&page=${page}`;
      }
    } else {
      query = `limit=100&page=${page}`;
    }

    if (searchParams.get("bestSeller")) {
      // alert("Asd")
      query = `${query}&bestSeller=true`;
    }

    if (filterBySort && filterBySort != "") {
      query = `${query}&filterBySort=${filterBySort}`;
    }
    if (filterBycategoryArr && filterBycategoryArr.length > 0) {
      // console.log(filterBycategoryArr, "====filterBycategoryArr===");
      let filterCategroy = filterBycategoryArr
        .filter((el) => el.level == 2)
        .map((el) => el._id);
      // console.log(filterCategroy, "====filterCategroyfilterCategroy");
      query = `${query}&filterBycategoryArr=${filterCategroy}`;
    }
    console.log(filterByPriceRangeObj,"filterByPriceRangeObj egt")
    if (filterByPriceRangeObj?.end) {
      query = `${query}&filterByPriceRangeStart=${filterByPriceRangeObj?.start}&filterByPriceRangeEnd=${filterByPriceRangeObj?.end}`;
    }

    console.log(query, " query-==--=");
    // console.log(JSON.stringify(query), " =====query-==--=");

    try {
      if (query) {
        // console.log(query, " params query23429");
        let { data: res } = await getAllProducts(query);
        console.log(res, "********res");

        if (res.success) {
          setPageCount(res?.totalPages);
          // setPage((previ) => previ + 1);
          // setProducts(res.data)
          // setMainProductArr([...mainProductArr, ...res.data]);
          // console.log(res.data.length,"res.data.length")
          if (res.data.length>=0) {
            setProductsArr(res.data);
            setMainProductArr(res.data);
          }
        }
      }
    } catch (err) {
      errorToast(err);
      // console.error(err, "hadlegetproduct23");
    }
  };

  useEffect(() => {
    console.log("-----------------", filterByPriceRangeObj);
    handleGetproducts();
  }, [filterBySort, filterBycategoryArr, filterByPriceRangeObj]);


  useEffect(() => {
    console.log(page, "params page");
    handleGetproducts();
  }, [categoryId, page]);

  useEffect(() => {
    if (isNaN(page) == true) {
      setPage(1);
    }
  }, [page]);

  const handleGetNameById = async () => {
    try {
      // console.log(params.id, "'params2 categoryId2----'");

      let { data: res } = await getNameBySlug(params.id);
      // setProductsArr([]);
      if (res.data) {
        // console.log(res.data?._id,"paramsget categoryId2");
        setCategoryObj(res.data);
        setcategoryId(res.data?._id);
        // setPage(0);
        // setPage(1);
        // console.log("params _iside")
      }
    } catch (err) {
      errorToast(err);
      // console.error(err);
    }
  };

  const handleAddToWishList = async (id) => {
    try {
      let decoded = getDecodedToken();

      // console.log(decoded, "decodeddecodeddecodeddecoded");
      if (!decoded) {
        return;
      }
      let obj = {
        productId: id,
        userId: decoded.userId,
      };

      let { data: res } = await AddToWishlist(obj);
      if (res.message) {
        successToast(res.message);

        handleGetWishListedItem();
      }
    } catch (err) {
      errorToast(err);
      // console.error(err);
    }
  };

  const handleDeleteWishListedItem = async (id) => {
    try {
      console.log("==========2handleDeleteWishListedItem");
      let decoded = getDecodedToken();
      if (!decoded) {
        return;
      }
      let obj = {
        productId: id,
        userId: decoded.userId,
      };
      let { data: res } = await RemoveItemFromWishlist(obj);
      if (res.message) {
        successToast(res.message);
        handleGetproducts();
        handleGetWishListedItem();
      }
    } catch (err) {
      errorToast(err);
      // console.error(err);
    }
  };

  const handleGetCart = async () => {
    console.log("cart start");
    try {
      let response = "";
      if (getToken() && getToken() != null) {
        let { data: res } = await getCartData();
        response = res;
      } else {
        let { data: res } = await getLocalCart();
        // console.log(res, "cart");

        response = res;
      }
      if (response.data) {
        setCarts(response.data.length);
        handleGetproducts();
      }
    } catch (err) {
      errorToast(err);
      console.error(err);
    }
  };
  const handleAddToCart = async (item) => {
    try {
      let response = {};
      // setShowCartSideBar(false);
      if (getToken() && getToken() != null) {
        let { data: res } = await addItemQuantityInCart(item?._id);
        response = res;
      } else {
        let { data: res } = await addItemInToLocalCart(item);
        response = res;
      }
      if (response.message) {
        successToast(response.message);
        handleGetCart();
        // setShowCartSideBar(true);
      }
    } catch (err) {
      errorToast(err);
    }
  };

  const options = useMemo(() => {
    return {
      root: null,
      rootMargin: "0px",
      threshold: 0.2,
    };
  }, []);

  const callbackFunction = (entries) => {
    // console.log(entries, "   inside  entries 3423");
    // const [entry] = entries;
    // // console.log("if1112----------2");

    // if (
    //   entry.isIntersecting &&
    //   isintialLoad == false &&
    //   params.id == "new-arrivals"
    // ) {
    //   // console.log(" inside if111 entries22222222");
    //   handleGetproducts();
    //   setisintialLoad(true);
    // } else if (
    //   entry.isIntersecting &&
    //   isintialLoad == false &&
    //   params.id != "new-arrivals"
    // ) {
    //   // console.log(" inside if entries entries");
    //   handleGetproducts();
    //   setisintialLoad(true);
    // } else if (
    //   entry.isIntersecting &&
    //   isintialLoad == true &&
    //   params.id == "new-arrivals"
    // ) {
    //   // console.log("inside else if  entries");
    // } else if (
    //   entry.isIntersecting &&
    //   isintialLoad == true &&
    //   params.id != "new-arrivals"
    // ) {
    //   // console.log("inside else if");
    // } else if (entry.isIntersecting) {
    //   // console.log("inside else4 entries");
    //   handleGetproducts();
    // }
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

  const checkItemInWishList = (product_id) => {
    const temp = wishlistArr.some((item) => item.productId === product_id);
    return temp;
  };

  useEffect(() => {
    if (params.id != "new-arrivals") {
      // console.log(params, "params234-=-");
      handleGetNameById();
      if (getToken()) {
        handleGetWishListedItem();
      }
    }
  }, [params]);

  useEffect(() => {
    // console.log(lastProductRef," Intersectionrver(callbkFunction, options);");
    // console.log(page," pagepagepagepage options);");
    // let observer = new IntersectionObserver(callbackFunction, options);
    // const currentTarget = lastProductRef.current;
    // // console.log(observer, "observerobserverobserver");
    // if (currentTarget) {
    //   observer.observe(currentTarget);
    // }
    // return () => {
    //   if (currentTarget) {
    //     observer.unobserve(currentTarget);
    //   }
    // };
  }, [lastProductRef, page]);

  const handleFilterProducts = (value) => {
    try {
      console.log(value, "value get ");
      // let tempProductArr = mainProductArr;

      if (value?.sortBy && value?.sortBy != "") {
        setFilterBySort(value?.sortBy);
      }
      if (value?.categoryArr && value?.categoryArr?.length > 0) {
        setFilterBycategoryArr(value?.categoryArr);
      }

      if (value.priceRangeObj&&value?.priceRangeObj?.end) {
        setFilterByPriceRangeObj(value.priceRangeObj);
      }else{
        setFilterByPriceRangeObj({});
      }
      // if (value.sortBy && value.sortBy != "") {
      //   if (value.sortBy == "Date, new to old") {
      //     tempProductArr = tempProductArr.sort(
      //       (a, b) =>
      //         new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      //     );
      //   } else if (value.sortBy == "Date, old to new") {
      //     tempProductArr = tempProductArr.sort(
      //       (a, b) =>
      //         new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      //     );
      //   }
      //    else if (value.sortBy == "Price, low to high") {
      //     tempProductArr = tempProductArr.sort((a, b) => a.mrp - b.mrp);
      //   }
      //    else if (value.sortBy == "Price, high to low") {
      //     tempProductArr = tempProductArr.sort((a, b) => b.mrp - a.mrp);
      //   }

      // }
      //  else if (value.categoryArr && value.categoryArr.length > 0) {
      //   tempProductArr = tempProductArr.filter((el) =>
      //     value.categoryArr.some((ele) =>
      //       el.categoryArr.some((elx) => elx.categoryId == ele._id)
      //     )
      //   );
      // }

      // else if (value.priceRangeArr && value.priceRangeArr.length > 0) {
      //   tempProductArr = tempProductArr.filter((el) => {
      //     if (
      //       value.priceRangeArr.some(
      //         (ele) => el.mrp >= ele.start && el.mrp <= ele.end
      //       )
      //     ) {
      //       return true;
      //     } else {
      //       return false;
      //     }
      //   });
      // } else {
      //   tempProductArr = mainProductArr;
      // }
      // setProductsArr([...tempProductArr]);
    } catch (err) {
      errorToast(err);
    }
  };

  useEffect(() => {
    let page = window?.location?.href?.split("page=");

    localStorage.setItem("page", page[1]);
    setPage(parseInt(page[1]));
  }, [window.location.href]);

  // =======================PAGINATION===========================================
  const [itemOffset, setItemOffset] = useState(0);

  // Simulate fetching items from another resources.
  // (This could be items from props; or items loaded in a local state
  // from an API endpoint with useEffect and useState)
  const itemsPerPage = 20;
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = productsArr.slice(itemOffset, endOffset);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    // // event?.preventDefault()
    // window.location.href = `${location.pathname}?page=${
    //   parseInt(event.selected) + 1
    // }`;
    // setPage(parseInt(event.selected) + 1);
    // const newOffset = (event.selected * itemsPerPage) % productsArr.length;

    // setItemOffset(newOffset);


    // event.preventDefault();
    const newPage = parseInt(event.selected) + 1;
    setPage(newPage);
    const newOffset = (event.selected * itemsPerPage) % productsArr.length;
    setItemOffset(newOffset);
    const newUrl = `${location.pathname}?page=${newPage}`;
    window.history.pushState({ path: newUrl }, '', newUrl);
  };

  const handleSetPageOffSet = () => {
    let setData = {
      x: window.pageXOffset,
      y: window.pageYOffset - 300,
    };
    //  localStorage.setItem("page", page[1]);
    localStorage.setItem("scrollData", JSON.stringify(setData));
  };

  // =======================PAGINATION===========================================

  return (
    <main>
      <section className="product-page mb-50 mt-5" id="product-go-up">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="product-page-right">
                <div className="product-page-heading">
                  <div>
                    {params.id != "NO" && (
                      <h4 className="green poppin mb-0">
                        {categoryObj.name ? categoryObj.name : "New Arrivals"}
                      </h4>
                    )}
                    {/* <a
                    href="#product-description"
                    className="fs-15 fw-semibold text-dark"
                  >
                    Click here for description
                    <span className="emoji" role="img" aria-label="go-down">
                      👇
                    </span>
                  </a> */}
                  </div>
                  <div>
                    {/* {isIntersecting ? "true" : "false"} */}
                    <button
                      className="navbar-toggler btn btn-black btn-custom btn-hover text-white"
                      type="button"
                      data-bs-toggle="offcanvas"
                      data-bs-target="#shop-filter-offcanvas"
                      aria-controls="shop-filter-offcanvas"
                      onClick={() => setshowFilters(!showFilters)}
                    >
                      {/* <span className="navbar-toggler-icon"></span> */}
                      Filters
                    </button>
                  </div>
                </div>
                {console.log(currentItems, "currentItems09")}
                <div className="row gy-4 gy-xxl-5">
                  {currentItems && currentItems.length > 0 ? (
                    currentItems.map((item, i) => {
                      return (
                        <div
                          className="col-6 col-sm-4 col-md-4 col-xl-3"
                          key={i}
                        >
                          <div className="printing-blocks-box product-box">
                            <div className="position-relative">
                              <div className="image">
                                {item?.imageArr &&
                                  item?.imageArr.length &&
                                  item?.imageArr[0]?.image && (
                                    <Link
                                      to={`/Product-Detail/${item?.slug}`}
                                      onClick={() => handleSetPageOffSet()}
                                    >
                                      <img
                                        src={
                                          item?.imageArr[0]?.image
                                            ? generateImageUrl(
                                                item?.imageArr[0]?.image
                                              )
                                            : ""
                                        }
                                        alt=""
                                      />
                                    </Link>
                                  )}
                              </div>
                              {item?.tags && (
                                <ul className="product-box-tags">
                                  {item?.tags
                                    ?.split(",")
                                    .filter((el, i) => i < 3)
                                    .map((item, tagIndex) => {
                                      return <li key={tagIndex}>{item}</li>;
                                    })}
                                </ul>
                              )}
                              {item.attributesArr &&
                              item.attributesArr.some(
                                (el) => el.price != ""
                              ) ? (
                                <span></span>
                              ) : (
                                <ul className="product-box-tags">
                                  {item.stock <= 0 && (
                                    <li style={{ backgroundColor: "red" }}>
                                      Out Of Stock
                                    </li>
                                  )}
                                </ul>
                              )}

                              <ul className="product-box-wishlist">
                                <li>
                                  <Wishlist
                                    heartFill={checkItemInWishList(item._id)}
                                    clickEvent={() => {
                                      if (checkItemInWishList(item._id)) {
                                        handleDeleteWishListedItem(item?._id);
                                      } else {
                                        handleAddToWishList(item?._id);
                                      }
                                      // console.log(
                                      //   item?.isWishlisted,
                                      //   "item?.isWishlisted"
                                      // );
                                    }}
                                    className="green pointer"
                                  />
                                </li>
                              </ul>
                            </div>
                            <h4 className="poppin">
                              <Link
                                to={`/Product-Detail/${item?.slug}`}
                                className="text-dark"
                              >
                                {item?.name}
                              </Link>
                            </h4>
                            <div className="d-flex justify-content-between align-items-center px-4">
                              <h5 className="poppin">
                                {item.attributesArr &&
                                item.attributesArr.some((el) => el.price != "")
                                  ? getconvertIntoCurrencyPriceWithSymbol(
                                      item.attributesArr.find(
                                        (el) => el.price != ""
                                      ).price
                                    )
                                  : getconvertIntoCurrencyPriceWithSymbol(
                                      item?.mrp
                                    )}
                                {/* {getconvertIntoCurrencyPriceWithSymbol(
                                  item?.mrp
                                )} */}
                                {item?.stockType && item?.stockType != ""
                                  ? `/${item?.stockType}`
                                  : null}
                              </h5>
                              {item.attributesArr &&
                              item.attributesArr.some(
                                (el) => el.price != ""
                              ) ? (
                                <Link
                                  to={`/Product-Detail/${item?.slug}`}
                                  className="btn btn-hover btn-custom btn-green btn-sm"
                                >
                                  View
                                </Link>
                              ) : (
                                <div
                                  onClick={() => handleAddToCart(item)}
                                  className="btn btn-hover btn-custom btn-green btn-sm"
                                >
                                  Add to cart
                                </div>
                              )}
                              {/* <div
                                onClick={() => handleAddToCart(item)}
                                className="btn btn-hover btn-custom btn-green btn-sm"
                              >
                                Add to cart
                              </div> */}
                            </div>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <h4 className="poppin">
                      <div className="text-dark">
                        {currentItems.length != 0 ? "Loading" : ""}
                      </div>
                    </h4>
                  )}
                </div>
                <div ref={lastProductRef}></div>
              </div>
            </div>
          </div>
        </div>
        <div
          className="offcanvas offcanvas-end "
          tabIndex="-1"
          id="shop-filter-offcanvas"
          aria-labelledby="shop-filter-offcanvasLabel"
        >
          <div className="offcanvas-body">
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
              // onClick={() => setshowFilters(false)}
            ></button>
            <ShopFilter filterObj={(val) => handleFilterProducts(val)} />
          </div>
        </div>
      </section>
      {/* {console.log(pageCount,"page  pageCount")} */}
      {/* {console.log(page,"page  page")} */}
      <section className="product-pagination mb-50">
        <div className="container">
          <ReactPaginate
            breakLabel="..."
            nextLabel="next >"
            onPageChange={ (e)=> handlePageClick(e)}
            pageRangeDisplayed={5}
            pageCount={pageCount}
            previousLabel="< previous"
            forcePage={isNaN(page) === true ? 1 : page - 1}
            renderOnZeroPageCount={null}
          />
        </div>
      </section>

      {/* <section id="product-description" className="mb-50">
        <div className="container">
          <h4 className="fw-bold">
            The Beauty Of Madhya Pradesh Converted Into Bagh Print Fabrics
          </h4>
          <p>
            Bagh block print fabric or Bagh block print cloth is an Indian
            handicraft obtained by a traditional printing method with natural
            colours practised in the city Bagh, Dhar district in Madhya Pradesh.
            It is said that Muslim khatris started bagh print upon migration
            from Manawar to Bagh. Geometric designs and the imaginative use of
            black and red colours, and the intelligent use of the river make it
            a unique art form. Block print cloth is used to obtain bright
            colours and helps bring different shades in the same colour. We
            bring you the best variety of Bagh print fabric online with no
            shrinkage, transparency of the material, and delivery in no time at
            your doorstep. Also, check beautiful Kota Doria crafts.
          </p>
          <h4 className="fw-bold">Buy Bagh Block Print Crafts Online</h4>
          <p>
            Check out the mesmerizing, traditional Bagh Print sarees online that
            will make heads turn at every event. You could also explore and buy
            Bagh Print stoles and scarves online to match your outfit. But are
            you looking for the best Bagh dress material online? Your search
            ends at iTokri. Get designer suits and dresses made of these
            authentic Bagh dress materials and level up your suits and Indian
            dresses with these best Bagh Print dupattas. Also, explore the
            exquisite collection of the beautiful Bagh crafts of India and give
            your clothing and house a little traditional touch. If you are
            looking for some rakhi set combos for all your lovely brothers at
            home, you can explore the collection of premium rakhi along with
            rakhi gifts for your brother, which could add richness and enhance
            your rakhi day. Check out the rakhi gifts for your sister. If you
            want o make her smile when she ties her rakhi for you!
          </p>
          <p>
            This diwali why not give a sweet surprise to your loved ones by
            gifting them something special and make them how special they are.
            you can buy beautiful diwali gifts from itokri. You can even get a
            wide range of diwali corporate gifts if you are planning to give it
            to your staffs. Giving lovely diwali gift hampers to your beloved
            ones is a wonderful way to show your love. iTokri also has gifts
            below 1000 which is not heavy on your wallet during festive seasons
            too.
          </p>
          <a href="#product-go-up" className="text-dark fw-bold">
            Go Up
            <span className="emoji" role="img" aria-label="go-up">
              👆
            </span>
          </a>
        </div>
      </section> */}
    </main>
  );
}

export default Products;
