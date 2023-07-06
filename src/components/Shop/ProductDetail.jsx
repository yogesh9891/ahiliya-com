import React, { useEffect, useState } from "react";
import {
  BsFillArrowDownSquareFill,
  BsStar,
  BsStarFill,
  BsStarHalf,
  BsArrowLeft,
  BsArrowLeftCircleFill,
} from "react-icons/bs";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Thumbs, Navigation, Autoplay, Mousewheel } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";
import { getconvertIntoCurrencyPriceWithSymbol } from "../../services/Currency.service";
import { addItemInToLocalCart, getLocalCart } from "../../services/localCart";
import {
  getAllProducts,
  getProductById,
  getProductReviews,
} from "../../services/Product.service";
import { generateImageUrl } from "../../services/url.service";
import {
  AddReview,
  getDecodedToken,
  getToken,
} from "../../services/User.service";
import { addItemQuantityInCart, getCartData } from "../../services/UserCart.service";
import {
  AddToWishlist,
  RemoveItemFromWishlist,
} from "../../services/Wishlist.service";
import { errorToast, successToast } from "../../utils/Toast";
import { images } from "../Utility/Images";
import Instagram from "../Utility/Instagram";
import SocialBanner from "../Utility/SocialBanner";
import Wishlist from "../Utility/Wishlist";
import Modal from "react-modal";
import ReactStars from "react-rating-stars-component";
import { useContext } from "react";
import { CartContext, CartCountContext } from "../../App";
import { Helmet } from "react-helmet";

function ProductDetail() {
  const params = useParams();
  //  ====================================================================
  const [productArr, setProductArr] = useState([]);
  const [productReviewArr, setProductReviewArr] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [activeThumb, setActiveThumb] = useState(0);
  const [heartFill, setheartFill] = useState(false);
  const [windowWidth, setwindowWidth] = useState(window.innerWidth);
  const [averageReview, setAverageReview] = useState(4);
  const [reviewTotalStar, setReviewTotalStar] = useState(0);
  const [name, setname] = useState("");
  const [rating, setrating] = useState(1);
  const [message, setmessage] = useState("");
  const [productObj, setProductObj] = useState({});
  const [reviewModal, setReviewModal] = useState(false);
  const [imageModal, setimageModal] = useState(false);
  const [imageSrc, setimageSrc] = useState("");
  const [showCartSideBar, setShowCartSideBar] = useContext(CartContext)
  const [price, setprice] = useState(0);
  const [stock, setstock] = useState(0);
  const [selectedVariant, setselectedVariant] = useState("");
  const [variantobj, setvariantobj] = useState({});
  const [categoryId, setcategoryId] = useState("");
  const [carts, setCarts] = useContext(CartCountContext )


  
  const [productBox, setproductBox] = useState([
    {
      name: "Border X19 - Wooden Printing Block",
      price: "$38.00",
      tags: ["new"],
      heartFill: false,
      img: images.newarrival1,
    },
    {
      name: "Border X19 - Wooden Printing Block",
      price: "$38.00",
      tags: ["new"],
      heartFill: false,
      img: images.newarrival2,
    },
    {
      name: "Border X19 - Wooden Printing Block",
      price: "$38.00",
      tags: ["new"],
      heartFill: false,
      img: images.bestseller1,
    },
    {
      name: "Border X19 - Wooden Printing Block",
      price: "$38.00",
      tags: ["new"],
      heartFill: false,
      img: images.bestseller2,
    },
    {
      name: "Border X19 - Wooden Printing Block",
      price: "$38.00",
      tags: ["new"],
      heartFill: false,
      img: images.bestseller3,
    },
    {
      name: "Border X19 - Wooden Printing Block",
      price: "$38.00",
      tags: ["new"],
      heartFill: false,
      img: images.bestseller4,
    },
    {
      name: "Border X19 - Wooden Printing Block",
      price: "$38.00",
      tags: ["new"],
      heartFill: false,
      img: images.bestseller5,
    },
    {
      name: "Border X19 - Wooden Printing Block",
      price: "$38.00",
      tags: ["new"],
      heartFill: false,
      img: images.printingBlock,
    },
    {
      name: "Border X19 - Wooden Printing Block",
      price: "$38.00",
      tags: ["new"],
      heartFill: false,
      img: images.printingblock2,
    },
    {
      name: "Border X19 - Wooden Printing Block",
      price: "$38.00",
      tags: ["new"],
      heartFill: false,
      img: images.printingblock3,
    },
    {
      name: "Border X19 - Wooden Printing Block",
      price: "$38.00",
      tags: ["new"],
      heartFill: false,
      img: images.printingblock4,
    },
  ]);

  const getRating = (accumulator, currentValue, index) => {
    // let content = [];
    // for (let i = 0; i < ratings; i++) {
    //   content.push(  <li key={i}>
    //     <div className="icon">
    //       <BsStarFill />
    //     </div>
    //   </li>);
    // }
    // return content;
    // let totalStar = 0;
    // totalStar = totalStar + ratings;
    // setReviewTotalStar((prev) => {
    //   return prev + ratings;
    // });
    const returns = accumulator.rating + currentValue.rating;
    // console.log(
    //   `accumulator: ${accumulator.rating}, currentValue: ${currentValue.rating}, index: ${index}, returns: ${returns}`
    // );
    return returns;
  };

  const [showImageModal, setshowImageModal] = useState(false);


  useEffect(() => {
    // productReviewArr.map((review) => {
    //   getRating(review.rating);
    // });

    setAverageReview(2);
    let returnValue = 0;
    if (productReviewArr.length > 0 && productReviewArr) {
      returnValue = productReviewArr.reduce(getRating);

      let rating = parseInt(returnValue / productReviewArr.length);
      setAverageReview(rating);
      // console.log(averageReview, "averageReview", productReviewArr.length);
    }
  }, [productReviewArr.length]);

  const fabric_slider = {
    0: {
      slidesPerView: 2,
    },
    576: {
      slidesPerView: 3,
    },
    768: {
      slidesPerView: 3,
    },
    1200: {
      slidesPerView: 4,
    },
    1800: {
      slidesPerView: 5,
    },
  };

  const handleGetCart = async () => {

    // console.log("cart start")
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
      setCarts(response.data.length)
      }
    } catch (err) {
      errorToast(err);
      // console.error(err);
    }
  };

  const handleWishlist = (i) => {
    let temp = productBox.map((item, index) => {
      if (i === index) {
        item.heartFill = !item.heartFill;
      }
      return item;
    });
    setproductBox([...temp]);
  };

  const handleImageModal = (img) => {
    setimageModal(false);
    setimageSrc(img)
    setimageModal(true);
  }

  const handleProductReviews = async (productId) => {
    try {
      let { data: res } = await getProductReviews(
        `productId=${productId}&status=APPROVED`
      );

      if (res.data) {
        // console.log(res.data);
        setProductReviewArr(res.data);
      }
    } catch (err) {
      errorToast(err);

      // console.error(err);
    }
  };

  const handleVaraintProduct = (attribute ,index) =>{
    if(attribute && attribute.name != selectedVariant && attribute.price){
      // console.log(attribute,"attributeattributeattribute")
      setselectedVariant(attribute.name)
      setprice(attribute.price)
      setstock(attribute.currentStock)
      setvariantobj(attribute)
    }
  }

  const handleGetproducts = async () => {
    try {
      let { data: res } = await getProductById(params.id);
      if (res.data) {
        // console.log(res.data);
        setProductObj(res.data);
      }
    } catch (err) {
      errorToast(err);

      // console.error(err);
    }
  };
  const handleGetAllProduct = async (query) => {
    try {
      let { data: res } = await getAllProducts(query);
      if (res.data) {
        // console.log(res.data, "sdfdffds  ");
        setProductArr(res.data.filter(el => el._id != productObj?._id));
      }
    } catch (err) {
      errorToast(err);

      // console.error(err);
    }
  };

  const handleReviewSubmit = async () => {
    if (`${name}` == "") {
      errorToast("please enter name");
      return;
    }

    if (`${rating}` == "") {
      errorToast("please enter rating");
      return;
    }

    if (`${message}` == "") {
      errorToast("please enter message");
      return;
    }
    let decoded = getDecodedToken();

    let obj = {
      name,
      rating,
      message,
      userId: decoded.userId,
      productId: productObj?._id,
    };

    try {
      let { data: res } = await AddReview(obj);
    
      if (res.success) {
        successToast(res.message);
        setname("");
        setrating(1);
        setmessage("");
        window.location.reload();
      }
    } catch (error) {
      // console.log(error);
      errorToast(error);
    }
  };

  const handleAddToWishList = async (id) => {
    try {
      let decoded = getDecodedToken();
      let obj = {
        productId: id,
        userId: decoded.userId,
      };
      let { data: res } = await AddToWishlist(obj);
      if (res.message) {
        successToast(res.message);
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
      }
    } catch (err) {
      errorToast(err);
      // console.error(err);
    }
  };

  const handleAddToCart = async (item) => {
    try {
      let obj = {
        quantity,
        attribute:selectedVariant,
        price,
        stock,
        variantobj
      };

      let response = {};
    //   setShowCartSideBar(false)

      if (getToken() && getToken() != null) {
        let { data: res } = await addItemQuantityInCart(item?._id, obj);
        response = res;
      } else {
        let { data: res } = await addItemInToLocalCart(item, obj);
        response = res;
      }
      if (response.message) {
        successToast(response.message);
        handleGetCart()
        // setShowCartSideBar(true);
      }
    } catch (err) {
      errorToast(err);
    }
  };

  useEffect(() => {
    handleGetproducts();
  }, [params]);

//   useEffect(() => {
//     if(categoryId) {
//         handleGetAllProduct(`categoryId=${categoryId}&limit=10`)
//     }
//   }, [categoryId]);

  useEffect(() => {
    if (productObj) {
      handleProductReviews(productObj?._id);
      setprice(productObj.mrp)
      setstock(productObj.stock)
      if(productObj?.categoryArr && productObj?.categoryArr.length > 0 ){
        setcategoryId(productObj.categoryArr[0].categoryId)
        let cat = productObj.categoryArr[0].categoryId;
        handleGetAllProduct(`categoryId=${cat}&limit=10`)
      } 
      if(productObj.attributesArr && productObj.attributesArr.length > 0 ){
        let firstVari = productObj.attributesArr.find(el => el.price && el.currentStock);

        if(firstVari && firstVari.price > 0){
            setprice(firstVari.price)
            setstock(firstVari.currentStock)
            setselectedVariant(firstVari.name)
              setvariantobj(firstVari)

        }
      } 
    }
  }, [productObj]);
  const navigate = useNavigate();

  const miniImages = {
    0: {
      slidesPerView: 3,
    },
    576: {
      slidesPerView: 4,
    },
  };

  //  ====================================================================
  return (
    <main>

        {
          productObj && (
            <Helmet>
              {
                 productObj.metaTitle && (
            <title>{productObj.metaTitle}</title>

                 )
              }
            {
                 productObj.metaDescription && (
                  <meta
                  name="description"
                  content={`${productObj.metaDescription}`}
                /> 
                 )
              }
           

            {
                 productObj.metaKeyword && (
                  <meta
                  name="keywords"
                  content={`${productObj.metaKeyword}`}
                />
                 )
              }
         

          </Helmet>
          )
        }
       
      <section className="product-detail mb-50">
        <div
          className={`${windowWidth > 992 ? "container-fluid" : "container"}`}
        >
          <div className="my-3">
            <button
              onClick={() => navigate(-1)}
              role="button"
              className="btn btn-green btn-custom btn-sm   btn-hover rounded-1 px-4"
            >
              <BsArrowLeftCircleFill />
              &nbsp; Back
            </button>
          </div>
          <div className="row gy-4">
            <div className="col-12 col-lg-6 col-xxl-5">
              <div className="product-detail-left">
                <div className="product-detail-picture">
                  <Swiper
                    onSwiper={setActiveThumb}
                    watchSlidesProgress
                    // loop
                    direction={
                      windowWidth < 767
                        ? "horizontal"
                        : windowWidth > 767 && windowWidth < 992
                        ? "vertical"
                        : windowWidth > 992 && windowWidth < 1200
                        ? "horizontal"
                        : windowWidth > 1200
                        ? "vertical"
                        : "horizontal"
                    }
                    spaceBetween={10}
                    slidesPerView={4}
                    mousewheel
                    modules={[Navigation, Thumbs, Mousewheel]}
                    className="product-detail-slider-thumbs flex-1"
                    breakpoints={miniImages}
                  >
                    {productObj &&
                      productObj?.imageArr &&
                      productObj?.imageArr.map((item, index) => {
                        return (
                          <SwiperSlide key={index}>
                            <div className="mini-images">
                              <img
                                src={generateImageUrl(item.image)}
                                alt="product images"
                              />
                            </div>
                          </SwiperSlide>
                        );
                      })}
                  </Swiper>
                  <Swiper
                    loop={true}
                    spaceBetween={10}
                    navigation
                    modules={[Navigation, Thumbs]}
                    grabCursor
                    thumbs={{ swiper: activeThumb }}
                    className="product-detail-slider"
                  >
                    {productObj &&
                      productObj?.imageArr &&
                      productObj?.imageArr.map((item, index) => {
                        return (
                          <SwiperSlide key={index}>
                            <div className="big-image" style={{height:450,cursor:"pointer"}} onClick={()=>handleImageModal(generateImageUrl(item.image))}>
                              <img
                                src={generateImageUrl(item.image)}
                                alt="product images"
                              />
                            </div>
                          </SwiperSlide>
                        );
                      })}
                  </Swiper>
                </div>
                <ul className="product-box-wishlist">
                  <li>
                    <Wishlist
                      heartFill={productObj.isWishlisted ? true : false}
                      heartColor="text-dark"
                      clickEvent={() =>
                        productObj.isWishlisted
                          ? handleDeleteWishListedItem(productObj._id)
                          : handleAddToWishList(productObj._id)
                      }
                      className="pointer"
                    />
                  </li>
                  <li>
                    <a href="#more-products">
                      <img src={images.card_games} alt="" />
                    </a>
                  </li>
                </ul>
                {/* <div className="product-detail-desp mt-4">
                  <p
                    dangerouslySetInnerHTML={{
                      __html: productObj?.description,
                    }}
                  />
                </div> */}
              </div>
            </div>
            <div className="col-12 col-lg-6 col-xxl-7">
              <div className="product-detail-right">
                <div className="row">
                  <div className="col-12 col-md-8">
                    <h4 className="product-detail-title mb-1">
                      {productObj?.name}
                    </h4>
                    <h5 className="product-detail-price mb-0 poppin">
                      {getconvertIntoCurrencyPriceWithSymbol(price)}
                      {productObj?.stockType && productObj?.stockType !=""
                        ? `/${productObj?.stockType}`
                        : null}
                    </h5>
                    <p className="text-muted fs-15 mb-1">
                      (inclusive of all taxes)
                    </p>
                    <ul className="product-detail-tags">
                      <li>
                        <p>SKU&nbsp;:&nbsp;{productObj.sku}</p>
                      </li>
                      <li>
                        <p>
                          Availability&nbsp;:&nbsp;
                          {stock > 0 ? (
                            <span className="text-success fw-semibold">
                              In stock
                            </span>
                          ) : (
                            <span className="text-danger fw-semibold">
                              Out of stock
                            </span>
                          )}
                        </p>
                      </li>
                      {productObj.stock > 0 ? (
                        <li>
                          <p>
                            Stock&nbsp;:&nbsp;
                            <span className="fw-semibold text-success">
                              {stock}{" "}
                              {productObj?.stockType
                                ? ` ${productObj?.stockType}`
                                : null}{" "}
                              left
                            </span>
                          </p>
                        </li>
                      ) : null}

                      <li>
                        <p>
                       
                          {productObj?.productType != ""
                                ? `   Size :  ${productObj?.productType}`
                                :<>Size:<span className="fw-semibold text-success">
                                {productObj.product_dimension_length > 0 
                                  ? productObj.product_dimension_length
                                  : ""}
                                  {productObj.product_dimension_length > 0  && productObj.product_dimension_height > 0
                                  ?  "X"
                                  : ""}
                                {productObj.product_dimension_height > 0
                                  ? productObj.product_dimension_height 
                                  : ""}
    
                                  {productObj.product_dimension_height > 0  && productObj.product_dimension_width > 0
                                  ?  "X"
                                  : ""}
                                {productObj.product_dimension_width > 0
                                  ? productObj.product_dimension_width
                                  : ""}
                                {productObj?.dimensionHeightType
                                  ? ` ${productObj?.dimensionHeightType}`
                                  : null}
                              </span></> }{" "}
                          {/* <span className="fw-semibold text-success">
                            {productObj.product_dimension_length > 0 
                              ? productObj.product_dimension_length
                              : ""}
                              {productObj.product_dimension_length > 0  && productObj.product_dimension_height > 0
                              ?  "X"
                              : ""}
                            {productObj.product_dimension_height > 0
                              ? productObj.product_dimension_height 
                              : ""}

                              {productObj.product_dimension_height > 0  && productObj.product_dimension_width > 0
                              ?  "X"
                              : ""}
                            {productObj.product_dimension_width > 0
                              ? productObj.product_dimension_width
                              : ""}
                            {productObj?.dimensionHeightType
                              ? ` ${productObj?.dimensionHeightType}`
                              : null}
                          </span> */}
                        </p>
                      </li>

                      <p className="d-flex my-2">
                          {
                          productObj.attributesArr && productObj.attributesArr.map((attt, index) => <li><p className={`btn btn-hover ${selectedVariant == attt.name ? 'btn-green' : 'btn-secondary'}  rounded-1 ms-2`}  onClick={()=>{handleVaraintProduct(attt,index)}} >{attt.name}</p></li>)
                         }       
                      </p>

                      {/* {productObj.product_dimension_length > 0 ? (
                      <li>
                        <p>
                          Length &nbsp;:&nbsp;
                          <span className="fw-semibold text-success">
                           {productObj.product_dimension_length} {productObj?.dimensionHeightType ? ` ${productObj?.dimensionHeightType}`:null} 
                          </span>
                        </p>
                      </li>
                      ):null} 
                       {productObj.product_dimension_width > 0 ? (
                      <li>
                        <p>
                        Width &nbsp;:&nbsp;
                          <span className="fw-semibold text-success">
                           {productObj.product_dimension_width} {productObj?.dimensionHeightType ? ` ${productObj?.dimensionHeightType}`:null} 
                          </span>
                        </p>
                      </li>
                      ):null}  */}
                      {/* {productObj.product_dimension_weight > 0 ? (
                      <li>
                        <p>
                          Weight &nbsp;:&nbsp;
                          <span className="fw-semibold text-success">
                           {productObj.product_dimension_weight} {productObj?.dimensionHeightType ? ` ${productObj?.dimensionHeightType}`:null} 
                          </span>
                        </p>
                      </li>
                      ):null}  */}
                    </ul>
                  </div>
                  <div className="col-12 col-md-4">
                    <ul className="review-star">
                      <li>
                        <div className="icon">
                          <BsStarFill />
                        </div>
                      </li>
                      <li>
                        <div className="icon">
                          <BsStarFill />
                        </div>
                      </li>
                      <li>
                        <div className="icon">
                          <BsStarFill />
                        </div>
                      </li>
                      <li>
                        <div className="icon">
                          <BsStarFill />
                        </div>
                      </li>
                      <li>
                        <div className="icon">
                          <BsStarHalf />
                        </div>
                      </li>
                    </ul>
                    {
                      productObj.sizeChart && (
                        <p  className="mt-3">
                        <a href={generateImageUrl(productObj.sizeChart)} target="_blank">Click Here For Size Chart</a>

                    </p> 
                      )
                    }
                    
                  </div>
                </div>

                <ul className="product-detail-links">
                  <li>
                    <div className="handle-quantity product-quantity-2">
                      <div className="product-quantity m-0">
                        <div
                          className="plus-minus"
                          onClick={() =>
                            setQuantity((item) => (item > 1 ? item - 1 : item))
                          }
                        >
                          -
                        </div>
                        <div className="show-quantity">{quantity}</div>
                        <div
                          className="plus-minus"
                          onClick={() =>
                            setQuantity((item) => {
                              if (stock <= item) {
                                return item;
                              } else {
                                // console.log(productObj.stock, "ssaio", item);
                                return item + 1;
                              }

                              // if(item >= quantity){
                              //   return item
                              // } else {
                              //   return  item+1
                              // }
                            })
                          }
                        >
                          +
                        </div>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div
                      onClick={() => handleAddToCart(productObj)}
                      className="btn btn-hover btn-custom btn-green rounded-1"
                    >
                      Add to cart
                    </div>
                  </li>
                </ul>
                {/* <div className="product-detail-share">
                  <p>Set of 3 pcs Handcarved Wooden Printing Blocks Weight: 180 grams</p>
                </div> */}
                <div id="product-detail-box">
                  <ul className="nav nav-pills" id="pills-tab" role="tablist">
                    <li className="nav-item" role="presentation">
                      <button
                        className="nav-link active"
                        id="product-headingFive-tab"
                        data-bs-toggle="pill"
                        data-bs-target="#product-headingFive"
                        type="button"
                        role="tab"
                        aria-controls="product-headingFive"
                        aria-selected="false"
                      >
                        Specifications
                        <div className="icon">
                          <BsFillArrowDownSquareFill />
                        </div>
                      </button>
                    </li>
                    <li className="nav-item" role="presentation">
                      <button
                        className="nav-link "
                        id="product-headingOne-tab"
                        data-bs-toggle="pill"
                        data-bs-target="#product-headingOne"
                        type="button"
                        role="tab"
                        aria-controls="product-headingOne"
                        aria-selected="true"
                      >
                        Description
                        <div className="icon">
                          <BsFillArrowDownSquareFill />
                        </div>
                      </button>
                    </li>
                    <li className="nav-item" role="presentation">
                      <button
                        className="nav-link"
                        id="product-headingTwo-tab"
                        data-bs-toggle="pill"
                        data-bs-target="#product-headingTwo"
                        type="button"
                        role="tab"
                        aria-controls="product-headingTwo"
                        aria-selected="false"
                      >
                        Craft
                        <div className="icon">
                          <BsFillArrowDownSquareFill />
                        </div>
                      </button>
                    </li>
                    <li className="nav-item" role="presentation">
                      <button
                        className="nav-link"
                        id="product-headingThree-tab"
                        data-bs-toggle="pill"
                        data-bs-target="#product-headingThree"
                        type="button"
                        role="tab"
                        aria-controls="product-headingThree"
                        aria-selected="false"
                      >
                        Artisan
                        <div className="icon">
                          <BsFillArrowDownSquareFill />
                        </div>
                      </button>
                    </li>
                    <li className="nav-item" role="presentation">
                      <button
                        className="nav-link"
                        id="product-headingFour-tab"
                        data-bs-toggle="pill"
                        data-bs-target="#product-headingFour"
                        type="button"
                        role="tab"
                        aria-controls="product-headingFour"
                        aria-selected="false"
                      >
                        Review
                        <div className="icon">
                          <BsFillArrowDownSquareFill />
                        </div>
                      </button>
                    </li>
                  </ul>
                  <div className="tab-content" id="pills-tabContent">
                    <div
                      className="tab-pane fade "
                      id="product-headingOne"
                      role="tabpanel"
                      aria-labelledby="product-headingOne-tab"
                      tabIndex="0"
                    >
                      <div className="product-detail-box-item">
                        <div
                          className="product-detail-desp"
                          dangerouslySetInnerHTML={{
                            __html: productObj?.description,
                          }}
                        ></div>
                      </div>
                    </div>
                    <div
                      className="tab-pane fade"
                      id="product-headingTwo"
                      role="tabpanel"
                      aria-labelledby="product-headingTwo-tab"
                      tabIndex="0"
                    >
                      <div className="product-detail-box-item">
                        <div
                          className="product-detail-desp"
                          dangerouslySetInnerHTML={{
                            __html: productObj?.craft,
                          }}
                        ></div>
                      </div>
                    </div>
                    <div
                      className="tab-pane fade"
                      id="product-headingThree"
                      role="tabpanel"
                      aria-labelledby="product-headingThree-tab"
                      tabIndex="0"
                    >
                      <div className="product-detail-box-item">
                        <div
                          className="product-detail-desp"
                          dangerouslySetInnerHTML={{
                            __html: productObj?.artisan,
                          }}
                        ></div>
                      </div>
                    </div>
                    <div
                      className="tab-pane fade"
                      id="product-headingFour"
                      role="tabpanel"
                      aria-labelledby="product-headingFour-tab"
                      tabIndex="0"
                    >
                      <div className="product-detail-box-item">
                        <div className="product-detail-desp">
                          <div className="text-end">
                            {getToken() && (
                              <button
                                type="button"
                                onClick={() => setReviewModal(true)}
                                className="btn btn-hover btn-custom btn-green btn-sm"
                              >
                                Write a Review
                              </button>
                            )}
                          </div>
                          <ul className="product-detail-review">
                            {productReviewArr.length > 0 ? (
                              productReviewArr.map((review, i) => (
                                <li key={i}>
                                  <p className="mb-0">{review?.message}</p>
                                  <p>{review?.name}</p>
                                  <div className="d-flex align-items-center justify-content-between">
                                    <ReactStars
                                      count={5}
                                      edit={false}
                                      size={20}
                                      value={review.rating}
                                      activeColor="#ffd700"
                                    />
                                    {/* <ul className="review-star">
                                      {
                                        getRating(review.rating)
                                      }
                                      {/* <li>
                                        <div className="icon">
                                          <BsStarFill />
                                        </div>
                                      </li>
                                      <li>
                                        <div className="icon">
                                          <BsStarFill />
                                        </div>
                                      </li>
                                      <li>
                                        <div className="icon">
                                          <BsStarFill />
                                        </div>
                                      </li>
                                      <li>
                                        <div className="icon">
                                          <BsStarHalf />
                                        </div>
                                      </li>
                                      <li>
                                        <div className="icon">
                                          <BsStar />
                                        </div>
                                      </li>
                                    </ul> */}
                                    <h6 className="poppin"> {review?.name}</h6>
                                  </div>
                                </li>
                              ))
                            ) : (
                              <h4>No Reviews</h4>
                            )}

                            {/* <li>
                              <p className="mb-0">
                                I liked the stole that I purchased from Itokri.
                                Very happy to receive a nice scented soap as a
                                gift.
                              </p>
                              <p>Best wishes for your venture.</p>
                              <div className="d-flex align-items-center justify-content-between">
                                <ul className="review-star">
                                  <li>
                                    <div className="icon">
                                      <BsStarFill />
                                    </div>
                                  </li>
                                  <li>
                                    <div className="icon">
                                      <BsStarFill />
                                    </div>
                                  </li>
                                  <li>
                                    <div className="icon">
                                      <BsStarFill />
                                    </div>
                                  </li>
                                  <li>
                                    <div className="icon">
                                      <BsStarHalf />
                                    </div>
                                  </li>
                                  <li>
                                    <div className="icon">
                                      <BsStar />
                                    </div>
                                  </li>
                                </ul>
                                <h6 className="poppin">Anita Joshi</h6>
                              </div>
                            </li>
                            <li>
                              <p className="mb-0">
                                I liked the stole that I purchased from Itokri.
                                Very happy to receive a nice scented soap as a
                                gift.
                              </p>
                              <p>Best wishes for your venture.</p>
                              <div className="d-flex align-items-center justify-content-between">
                                <ul className="review-star">
                                  <li>
                                    <div className="icon">
                                      <BsStarFill />
                                    </div>
                                  </li>
                                  <li>
                                    <div className="icon">
                                      <BsStarFill />
                                    </div>
                                  </li>
                                  <li>
                                    <div className="icon">
                                      <BsStarFill />
                                    </div>
                                  </li>
                                  <li>
                                    <div className="icon">
                                      <BsStarHalf />
                                    </div>
                                  </li>
                                  <li>
                                    <div className="icon">
                                      <BsStar />
                                    </div>
                                  </li>
                                </ul>
                                <h6 className="poppin">Anita Joshi</h6>
                              </div>
                            </li> */}
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div
                      className="tab-pane fade show active"
                      id="product-headingFive"
                      role="tabpanel"
                      aria-labelledby="product-headingFive-tab"
                      tabIndex="0"
                    >
                      <div className="product-detail-box-item">
                        <div
                          className="product-detail-desp"
                          dangerouslySetInnerHTML={{
                            __html: productObj?.specification,
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>

                <ul className="product-detail-offer row gx-2 gx-md-4 gy-3">
                  {/* <li className="col-12 col-md-6 col-lg-3">
                    <img src={images.dispatch} alt="" />
                    <h6 className="poppin">
                      Dispatches within {productObj.ships_in_days}
                    </h6>
                  </li> */}
                  <li className="col-4 col-lg-6 col-xl-4">
                    <img src={images.secure} alt="" />
                    <h6 className="poppin">Secure Payment</h6>
                  </li>
                  <li className="col-4 col-lg-6 col-xl-4">
                    <img src={images.gift} alt="" />
                    <h6 className="poppin">Packed with lots of love!</h6>
                  </li>
                  <li className="col-4 col-lg-6 col-xl-4">
                    <button
                      type="button"
                      onClick={() => setReviewModal(true)}
                      className="border-0 bg-white"
                    >
                      <img src={images.rating} alt="" />
                      <h6 className="poppin">Write a Review</h6>
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="printing-blocks mb-50" id="more-products">
        <div className="container-fluid px-lg-5">
          <div className="title-section text-center mb-4">
            <h2 className="heading heading-decor mb-0 fw-normal">
              Similar Products
            </h2>
          </div>
          <Swiper
            slidesPerView={5}
            spaceBetween={15}
            speed={2000}
            loop
            autoplay={{ pauseOnMouseEnter: true, disableOnInteraction: false }}
            modules={[Autoplay]}
            className="h-100"
            breakpoints={fabric_slider}
          >
            {productArr &&
              productArr.length > 0 &&
              productArr.map((item, i) => {
                return (
                  <SwiperSlide key={i}>
                    <div className="printing-blocks-box product-box">
                      <div className="position-relative">
                        <div className="image">
                          <Link to={`/Product-Detail/${item.slug}`}>
                            <img
                              src={generateImageUrl(item?.imageArr[0]?.image)}
                              alt=""
                            />
                          </Link>
                        </div>
                        <ul className="product-box-tags">
                          {item.tags &&
                            item.tags
                              .split(",")
                              .filter((el, i) => i < 3)
                              .map((item, i) => {
                                return <li key={i}>{item}</li>;
                              })}
                        </ul>
                        <ul className="product-box-wishlist">
                          <li>
                            <Wishlist
                              heartFill={item?.isWishlisted ? true : false}
                              clickEvent={() =>
                                item?.isWishlisted
                                  ? handleDeleteWishListedItem(item._id)
                                  : handleAddToWishList(item._id)
                              }
                              className="green pointer"
                            />
                          </li>
                        </ul>
                      </div>
                      <h4 className="poppin">
                        <Link
                          to={`/Product-Detail/${item.slug}`}
                          className="text-dark"
                        >
                          {item.name}
                        </Link>
                      </h4>
                      <div className="d-flex justify-content-between align-items-center px-4">
                        <h5 className="poppin">
                        {
                                  item.attributesArr && item.attributesArr.some(el =>el.price != "") ? (getconvertIntoCurrencyPriceWithSymbol(item.attributesArr.find(el =>el.price != "").price)) : getconvertIntoCurrencyPriceWithSymbol(
                                    item?.mrp
                                  )
                                }
                        </h5>
                        {
                             item.attributesArr && item.attributesArr.some(el =>el.price != "") ? <Link    to={`/Product-Detail/${item?.slug}`} className="btn btn-hover btn-custom btn-green btn-sm">View</Link> :   <div
                             onClick={() => handleAddToCart(item)}
                             className="btn btn-hover btn-custom btn-green btn-sm"
                           >
                             Add to cart
                           </div>
                          }
                      </div>
                    </div>
                  </SwiperSlide>
                );
              })}
          </Swiper>
        </div>
      </section>

      <SocialBanner />
      <Modal
        isOpen={showImageModal}
        onRequestClose={() => setshowImageModal(false)}
        className="custom-modal default"
        bodyOpenClassName="custom-modal-body"
        overlayClassName="custom-modal-overlay"
        htmlOpenClassName="custom-modal-html"
        portalClassName="custom-modal-parent"
        contentLabel="Example Modal"
      >
        <div className="popup-modal">
          <button
            type="button"
            className="btn-close pointer"
            onClick={() => setshowImageModal(false)}
          ></button>
          <div className="row align-items-center">
            <div className="col-12">
            <div  style={{height:'90vh'}}>
            <div className="row g-3">
                  <img src={imageSrc}  alt="Image Not Found" className="img-fluid"/>
            </div>
          </div>
            </div>
          </div>
        </div>
      </Modal>    
      <Modal
        isOpen={reviewModal}
        onRequestClose={() => setReviewModal(false)}
        className="custom-modal default"
        bodyOpenClassName="custom-modal-body"
        overlayClassName="custom-modal-overlay"
        htmlOpenClassName="custom-modal-html"
        portalClassName="custom-modal-parent"
        contentLabel="Example Modal"
      >
        <div className="popup-modal">
          <button
            type="button"
            className="btn-close pointer"
            onClick={() => setReviewModal(false)}
          ></button>
          <div className="row align-items-center">
            <div className="col-12">
              <div className="home-popup-content">
                <h4>
                  Add Your Review Here&nbsp;
                  <span className="emoji" role="img">
                    😍
                  </span>
                </h4>
                <form action="/" className="form row">
                  {/* <div className="col-12 mb-2">
                        <ul className="review-star">
                          <li>
                            <div className="icon">
                              <BsStarFill />
                            </div>
                          </li>
                          <li>
                            <div className="icon">
                              <BsStarFill />
                            </div>
                          </li>
                          <li>
                            <div className="icon">
                              <BsStarFill />
                            </div>
                          </li>
                          <li>
                            <div className="icon">
                              <BsStarHalf />
                            </div>
                          </li>
                          <li>
                            <div className="icon">
                              <BsStar />
                            </div>
                          </li>
                        </ul>
                      </div> */}
                  <div className="col-12 mb-2">
                    <label>
                      Rating
                      <select
                        className="form-control bg-ligh"
                        value={rating}
                        onChange={(e) => {
                          setrating(e.target.value);
                        }}
                      >
                        <option value="1">1 ⭐</option>
                        <option value="2">2 ⭐⭐</option>
                        <option value="3">3 ⭐⭐⭐</option>
                        <option value="4">4 ⭐⭐⭐⭐</option>
                        <option value="5">5 ⭐⭐⭐⭐⭐</option>
                      </select>
                    </label>
                  </div>
                  <div className="col-12 mb-2">
                    <label>
                      Name
                      <input
                        type="text"
                        className="form-control bg-light"
                        value={name}
                        onChange={(e) => {
                          setname(e.target.value);
                        }}
                      />
                    </label>
                  </div>
                  <div className="col-12 mb-2">
                    <label>
                      Comment
                      <textarea
                        value={message}
                        onChange={(e) => {
                          setmessage(e.target.value);
                        }}
                        className="form-control bg-light"
                        rows="3"
                      ></textarea>
                    </label>
                  </div>
                  <div className="col-12">
                    <button
                      type="button"
                      className="btn btn-hover btn-custom btn-green btn-lg btn-sm rounded-1 px-4 py-2"
                      onClick={() => {
                        handleReviewSubmit();
                      }}
                    >
                      SUBMIT
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </Modal>
      <Modal
        isOpen={imageModal}
        onRequestClose={() => setimageModal(false)}
        className="custom-modal default"
        bodyOpenClassName="custom-modal-body"
        overlayClassName="custom-modal-overlay"
        htmlOpenClassName="custom-modal-html"
        portalClassName="custom-modal-parent"
        contentLabel="Example Modal"
      >
        <div className="popup-modal">
          <button
            type="button"
            className="btn-close pointer"
            onClick={() => setimageModal(false)}
          ></button>
          <div className="row align-items-center">
            <div className="col-12">
                      <img src={imageSrc} className="img-fluid" />
            </div>
          </div>
        </div>
      </Modal>
    </main>
  );
}

export default ProductDetail;
