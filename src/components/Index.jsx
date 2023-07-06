import React, { useEffect, useState } from "react";
import { Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";
import { images } from "./Utility/Images";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { RiDoubleQuotesR } from "react-icons/ri";
import { ImStarEmpty, ImStarFull, ImStarHalf } from "react-icons/im";
import Instagram from "./Utility/Instagram";
import { getDecodedToken } from "../services/User.service";
// import Modal from "bootstrap/js/dist/modal";
import Wishlist from "./Utility/Wishlist";
// ==========================================================================================
import { getAllCategories } from "../services/Category.service";
import { generateImageUrl } from "../services/url.service";
import { getGallery } from "../services/Gallery.service";
import { getAllProducts } from "../services/Product.service";
import { addItemQuantityInCart, getCartData } from "../services/UserCart.service";
import { errorToast, successToast } from "../utils/Toast";
import { getconvertIntoCurrencyPriceWithSymbol } from "../services/Currency.service";
import {
AddToWishlist,
getWishList,
RemoveItemFromWishlist,
} from "../services/Wishlist.service";
import { getToken } from "../services/User.service";
import { addItemInToLocalCart, getLocalCart } from "../services/localCart";

import {
  getAllBanners,
  getAlltestimonials,
  getNewsLetterApi,
  getSystemSetting,
  subscribeNewsletter,
} from "../services/Banner.service";
import Modal from "react-modal";
import { useContext } from "react";
import { CartContext, CartCountContext } from "../App";
import { getIp } from "../services/countryIp";

function Index() {
  // ==========================================================================================
  const navigate = useNavigate();
  const [wishlistArr, setWishlistArr] = useState([]);
  const [productsArr, setProductsArr] = useState([]);
  const [galleryArr, setGalleryArr] = useState([]);
  const [bannerArr, setBannerArr] = useState([]);
  const [testimonailArr, settestimonialArr] = useState([]);
  const [categoryArr, setCategoryArr] = useState([]);
  const [newLetterObj, setnewLetterObj] = useState("");
  const location = useLocation();
  const [systemSetting, setsystemSetting] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [discountModal, setDiscountModal] = useState(false);
  const [testimonial, settestimonial] = useState({
    name: "",
    description: "",
  });
  const [testimonialModal, settestimonialModal] = useState(false);
  const [showCartSideBar, setShowCartSideBar] = useContext(CartContext)
  const [carts, setCarts] = useContext(CartCountContext )


  const [email, setemail] = useState("");
  // let
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
  const clients_slider = {
    0: {
      slidesPerView: 1,
    },
    768: {
      slidesPerView: 2,
      spaceBetween: 10,
    },
    992: {
      slidesPerView: 3,
      spaceBetween: 10,
    },
    1200: {
      slidesPerView: 3,
    },
    1600: {
      slidesPerView: 4,
    },
  };

  const handleGetAllCategories = async () => {
    try {
      let { data: res } = await getAllCategories(
        `level=1&products=true&returnCategories=['Wooden Printing Blocks','Fabric Store']`
      );
      if (res.data) {
        // console.log(res.data, "categoryArr");
        setCategoryArr(res.data);
      }
    } catch (err) {
      console.error(err);
    }
  };
  const checkItemInWishList = (product_id) => {
    const temp = wishlistArr.some((item) => item.productId === product_id);
    return temp
  }
  const handleGetWishListedItem = async () => {
    try {
      let { data: res } = await getWishList();
      if (res.data) {
        // console.log(res.data, "wishlist");
        setWishlistArr(res.data);
      }
    } catch (err) {
      errorToast(err);

      console.error(err);
    }
  };
  const handleAddToWishList = async (id) => {
    try {
      let decoded = getDecodedToken();

      // console.log(decoded,"decodeddecodeddecodeddecoded")
      if(!decoded){
        return
      }
      let obj = {
        productId: id,
        userId: decoded.userId,
      };
    
      let { data: res } = await AddToWishlist(obj);
      if (res.message) {
        successToast(res.message);
        // handleGetproducts(page)
      }
    } catch (err) {
      errorToast(err);
      // console.error(err);
    }
  };

  const handleDeleteWishListedItem = async (id) => {
    try {
      let decoded = getDecodedToken();
      if(!decoded){
        return
      }
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
      console.error(err);
    }
  };

  const newsletterGet = async () => {
    try {
      let { data: res } = await getNewsLetterApi("type=competitionTemplate");
      if (res.data) {
        // console.log(res.data, "categoryArr");
        if (res.data.length > 0) {
          setnewLetterObj(res.data[0]);
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleGetIp = async () => {
    try {
      let response = await getIp();
      // console.log(response,"IPIPIPPPPP")
    
    } catch (err) {
      console.error(err);
    }
  };

  const handlegetSystemSetting = async () => {
    try {
      let { data: res } = await getSystemSetting();
      if (res.data && res.data.length > 0) {
        setsystemSetting(res.data[0]);

        let syse = res.data[0];
        const checkDiscountModal = localStorage.getItem("discountModal");

        if(checkDiscountModal != syse.discountBanner ){
          localStorage.setItem("discountModal",syse.discountBanner);
          // setDiscountModal(true)
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleGetGallery = async () => {
    try {
      let { data: res } = await getGallery();
      if (res.data) {
        setGalleryArr(res.data);
      }
    } catch (err) {
      console.error(err);
    }
  };
  const handleGetBanner = async () => {
    try {
      let { data: res } = await getAllBanners("status=true");
      if (res.data) {
        setBannerArr(res.data);
      }
    } catch (err) {
      console.error(err);
    }
  };
  const handleGetproducts = async () => {
    try {
      let { data: res } = await getAllProducts("limit=30");
      if (res.data) {
        setProductsArr(res.data.filter((el)=>parseInt(el.stock) > 0));
      }
    } catch (err) {
      console.error(err);
    }
  };
  const handleGettestimonials = async () => {
    try {
      let { data: res } = await getAlltestimonials("status=APPROVED");
      if (res.data) {
        // console.log(res.data);
        settestimonialArr(res.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleSetTestimonial = async (item) => {
    settestimonial({
      name: item.name,
      description: item?.comment,
    });
    settestimonialModal(true);
  };

  const handleSubscribe = async () => {
    try {
      if (`${email}` == "") {
        errorToast("Plase fill email");
        return;
      }
      let obj = {
        email,
      };
      let { data: res } = await subscribeNewsletter(obj);
      if (res.message) {
        successToast(res.message);
        setModalVisible(false);
      }
    } catch (err) {
      console.error(err);
    }
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
      console.error(err);
    }
  };


  
  useEffect(() => {
    handleGetBanner();
    handleGetAllCategories();
    handleGetGallery();
    handleGetproducts();
    handleGettestimonials();
    newsletterGet();
    handlegetSystemSetting();
  }, []);

  const handleAddToCart = async (item) => {
    try {
      let response = {};
    //   setShowCartSideBar(false)
      if (getToken() && getToken() != null) {
        let { data: res } = await addItemQuantityInCart(item._id);
        response = res;
      } else {
        if (!item._id) {
          item._id = item?.productId;
        }
        let { data: res } = await addItemInToLocalCart(item);
        response = res;
      }
      successToast(response.message);
      handleGetCart()
    //   setShowCartSideBar(true)
    } catch (err) {
      errorToast(err);
    }
  };

  const handleCategory = () => {

 
    let setData={
      x: 0,
       y:0,
   
      }
     //  localStorage.setItem("page", page[1]);
      localStorage.setItem("scrollData",JSON.stringify(setData))
      navigate(`/Products/new-arrivals`);
  };

  useEffect(() => {
    setloader(true);
    // setTimeout(() => {
    //   setloader(true);
    // }, 3000);
    // console.log(location, "location", newLetterObj);
    const checkModal = localStorage.getItem("modalShown");
    const checkDiscountModal = localStorage.getItem("discountModal");
    // console.log(checkModal, "checkModal");
    if (`${location.pathname}` == "/" && !checkModal) {
      setTimeout(() => {
        setModalVisible(true);
        localStorage.setItem("modalShown", "true");
      }, 5000);

    }
    if (`${location.pathname}` == "/" && !checkDiscountModal) {
      // setTimeout(() => {
      //   setDiscountModal(true);
      //   localStorage.setItem("discountModal", true);
      // }, 5000);
    
    }
    return () => setModalVisible(false);
  }, [location.pathname]);

  const [loader, setloader] = useState(false);
  // ==========================================================================================
  return (
    <main>
      <section className="main-slider">
        <Swiper
          slidesPerView={1}
          spaceBetween={0}
          speed={2000}
          loop
          autoplay={true}
          modules={[Autoplay]}
        >
          {!bannerArr || bannerArr.length == 0 ? (
            <>
              {/* <SwiperSlide
                style={{ backgroundImage: `url(${images.slide1})` }}
                className="h-100"
              >
                <div className="container h-100">
                  <div className="main-slider-inner">
                    <div className="main-slider-box col-12 col-md-9 col-lg-7 col-xl-6 col-xxl-5">
                      <div className="title-section">
                        <h1 className="heading">Aahilya</h1>
                        <p>
                          Clean from the roots of the fibers, to the tips of the
                          fabrics
                        </p>
                      </div>
                    </div>
                    <Link to="/" className="btn btn-green btn-hover">
                      SHOP NOW
                    </Link>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide
                style={{ backgroundImage: `url(${images.slide2})` }}
                className="h-100"
              >
                <div className="container h-100">
                  <div className="main-slider-inner">
                    <div className="main-slider-box col-12 col-md-9 col-lg-7 col-xl-6 col-xxl-5">
                      <div className="title-section">
                        <h1 className="heading">Aahilya</h1>
                        <p>
                          Clean from the roots of the fibers, to the tips of the
                          fabrics
                        </p>
                      </div>
                    </div>
                    <Link to="/" className="btn btn-green btn-hover">
                      SHOP NOW
                    </Link>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide
                style={{ backgroundImage: `url(${images.slide3})` }}
                className="h-100"
              >
                <div className="container h-100">
                  <div className="main-slider-inner">
                    <div className="main-slider-box col-12 col-md-9 col-lg-7 col-xl-6 col-xxl-5">
                      <div className="title-section">
                        <h1 className="heading">Aahilya</h1>
                        <p>
                          Clean from the roots of the fibers, to the tips of the
                          fabrics
                        </p>
                      </div>
                    </div>
                    <Link to="/" className="btn btn-green btn-hover">
                      SHOP NOW
                    </Link>
                  </div>
                </div>
              </SwiperSlide> */}
            </>
          ) : (
            bannerArr.map((banner, i) => (
              <SwiperSlide
                // style={{
                //   backgroundImage: `url(${generateImageUrl(banner?.image)})`,
                // }}
                className="h-100 pointer"
                key={i}
              >
             <a target='_blank' href={banner.url}>
                  <img
                    src={generateImageUrl(banner?.image)}
                    alt=""
                    className="img"
                  />
                </a>
                {/* <div className="container h-100">
                  <div className="main-slider-inner">
                    <div className="main-slider-box col-12 col-md-9 col-lg-7 col-xl-6 col-xxl-5">
                      <div className="title-section">
                        <h1 className="heading">{banner.name}</h1>
                        <p>{banner?.description}</p>
                      </div>
                    </div>
                    <Link
                      to={`${banner.url}`}
                      className="btn btn-green btn-hover"
                    >
                      SHOP NOW
                    </Link>
                  </div>
                </div> */}
              </SwiperSlide>
            ))
          )}
        </Swiper>
      </section>

      <section className="ptb-50 mb-50 category pink-bg category-section" >
        <div className="container-fluid px-lg-5">
          <div className="title-section text-center mb-4">
            <h1 className="heading heading-decor">Our Categories</h1>
          </div>
          <ul className="d-flex">
            {categoryArr &&
              categoryArr.length > 0 &&
              categoryArr.map((el, index) => {
                return (
                  <li key={index}>
                    <Link to={`/SubCategory/${el.slug}`} className="text-center">
                      <div className="image">
                        <img src={generateImageUrl(el.categoryImage)} alt="" />
                      </div>
                      <h5 className="poppin mt-3">{el.name}</h5>
                    </Link>
                  </li>
                );
              })}
          </ul>
        </div>
        <div className="design">
          <img src={images.tape_measure} alt="" />
        </div>
        <div className="design2">
          <img src={images.scissors} alt="" />
        </div>
      </section>

      <section className="mb-50 printing-blocks">
        <div className="container-fluid px-lg-5">
          <div className="title-section text-center mb-4">
            <h1 className="heading heading-decor mb-0">New Arrivals</h1>

            <Link
             to="/Products/new-arrivals"
              className="btn btn-black btn-custom btn-hover rounded-1 "
            >
              View More
            </Link>
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
            {productsArr &&
              productsArr.length > 0 &&
              productsArr
                .map((el, index) => {
                  return (
                    <SwiperSlide key={index}>
                      <div className="printing-blocks-box new-arrival">
                      <div className="image">
                                {el?.imageArr &&
                                  el?.imageArr.length &&
                                  el?.imageArr[0]?.image && (
                                    <Link to={`/Product-Detail/${el?.slug}`}>
                                      <img
                                        src={
                                          el?.imageArr[0]?.image
                                            ? generateImageUrl(
                                                el?.imageArr[0]?.image
                                              )
                                            : ""
                                        }
                                        alt=""
                                      />
                                    </Link>
                                  )}
                              </div>
                              {el?.tags && (
                                <ul className="product-box-tags">
                                  {el?.tags
                                    ?.split(",")
                                    .filter((el, i) => i < 3)
                                    .map((el, tagIndex) => {
                                      return <li key={tagIndex}>{el}</li>;
                                    })}
                                </ul>
                              )}
                             {
                                 el.attributesArr && el.attributesArr.some(el =>el.price != "") ? (<span></span>): (<ul className="product-box-tags">
                                { el.stock<=0 &&  <li style={{backgroundColor:"red"}}>Out Of Stock</li>}
                                 </ul>
                              
                           ) }
                                

                              <ul className="product-box-wishlist">
                                <li>
                                  <Wishlist
                                    heartFill={
                                      checkItemInWishList(el._id)
                                    }
                                    clickEvent={() => {
                                      if (checkItemInWishList(el._id)) {
                                        
                                        handleGetWishListedItem(el?._id);
                                      } else {
                                        handleAddToWishList(el?._id);
                                      }
                                      // console.log(
                                      //   el?.isWishlisted,
                                      //   "item?.isWishlisted"
                                      // );
                                    }}
                                    className="green pointer"
                                  />
                                </li>
                              </ul>
                              <h4  className="poppin">
                          <Link
                            to={`/Product-Detail/${el?.slug}`}
                            className="text-dark"
                          >
                            {el?.name} 
                          </Link>
                        </h4>
                        <div className="d-flex justify-content-between align-items-center px-lg-4 px-2">
                        <h5 className="poppin">
                          {
                                  el.attributesArr && el.attributesArr.some(item =>item.price != "") ? (getconvertIntoCurrencyPriceWithSymbol(el.attributesArr.find(item =>item.price != "").price) )  : getconvertIntoCurrencyPriceWithSymbol(
                                    el?.mrp
                                  )
                                }

                            {el?.stockType && el?.stockType !=""
                        ? `/${el?.stockType}`
                        : null}
                          </h5>
                          {
                             el.attributesArr && el.attributesArr.some(item =>item.price != "") ? <Link  to={`/Product-Detail/${el?.slug}`} className="btn btn-hover btn-custom btn-green btn-sm">View</Link> :   <div
                             onClick={() => handleAddToCart(el)}
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

      {/* <section
        className="mb-50 ptb-50 printing-blocks"
        style={{ background: "#ffeef8" }}
      >
        <div className="container-fluid px-lg-5">
          <div className="title-section text-center mb-4">
            <h1 className="heading heading-decor mb-0">
              Wooden Printing Blocks
            </h1>

            <Link
              to="/Products"
              className="btn btn-black btn-custom btn-hover rounded-1 "
            >
              View More
            </Link>
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
            {productsArr &&
              productsArr.length > 0 &&
              productsArr.sort().map((el, index) => {
                return (
                  <SwiperSlide key={index}>
                    <div className="printing-blocks-box">
                      <div className="image">
                        <Link to={`/Product-Detail/${el?.name}`}>
                          <img
                            src={generateImageUrl(el?.imageArr[0]?.image)}
                            alt=""
                          />
                        </Link>
                      </div>
                      <h4 className="poppin">
                        <Link
                          to={`/Product-Detail/${el?.name}`}
                          className="text-dark"
                        >
                          {el?.name}
                        </Link>
                      </h4>
                      <div className="d-flex justify-content-between align-items-center px-lg-4 px-2">
                        <h5 className="poppin">
                          {getconvertIntoCurrencyPriceWithSymbol(el?.mrp)}
                        </h5>
                        <div
                          onClick={() => handleAddToCart(el)}
                          className="btn btn-hover btn-custom btn-green btn-sm"
                        >
                          Add to cart
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                );
              })}
          </Swiper>
        </div>
      </section>

      <section className="mb-50 printing-blocks">
        <div className="container-fluid px-lg-5">
          <div className="title-section text-center mb-4">
            <h1 className="heading heading-decor mb-0">Fabric Store</h1>

            <Link
              to="/Products"
              className="btn btn-black btn-custom btn-hover rounded-1 "
            >
              View More
            </Link>
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
            {productsArr &&
              productsArr.length > 0 &&
              productsArr.reverse().map((el, index) => {
                return (
                  <SwiperSlide key={index}>
                    <div className="printing-blocks-box fabric-store">
                      <div className="image">
                        <Link to={`/Product-Detail/${el?.name}`}>
                          <img
                            src={generateImageUrl(el?.imageArr[0]?.image)}
                            alt=""
                          />
                        </Link>
                      </div>
                      <h4 className="poppin">
                        <Link
                          to={`/Product-Detail/${el?.name}`}
                          className="text-dark"
                        >
                          {el?.name}
                        </Link>
                      </h4>
                      <div className="d-flex justify-content-between align-items-center px-lg-4 px-2">
                        <h5 className="poppin">
                          {getconvertIntoCurrencyPriceWithSymbol(el?.mrp)}
                        </h5>
                        <div
                          onClick={() => handleAddToCart(el)}
                          className="btn btn-hover btn-custom btn-green btn-sm"
                        >
                          Add to cart
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                );
              })}
          </Swiper>
        </div>
      </section> */}

      {categoryArr &&
        categoryArr.length > 0 &&
        categoryArr.slice(0, 2).map((elx, i) => {
          return (
            <section
              key={elx._id}
              className={`mb-50 printing-blocks ${i % 2 === 0 ? "ptb-50" : ""}`}
              style={i % 2 === 0 ? { background: "#ffeef8" } : {}}
            >
              <div className="container-fluid px-lg-5">
                <div className="title-section text-center mb-4">
                  <h1 className="heading heading-decor mb-0">{elx?.name}</h1>

                  <Link
                    to={`/SubCategory/${elx.slug}`}
                    className="btn btn-black btn-custom btn-hover rounded-1 "
                  >
                    View More
                  </Link>
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
                  {elx.productArr &&
                    elx.productArr.length > 0 &&
                    elx.productArr.map((el, index) => {
                      return (
                        <SwiperSlide key={index}>
                          <div className="printing-blocks-box">
                          <div className="image">
                                {el?.imageArr &&
                                  el?.imageArr.length &&
                                  el?.imageArr[0]?.image && (
                                    <Link to={`/Product-Detail/${el?.slug}`}>
                                      <img
                                        src={
                                          el?.imageArr[0]?.image
                                            ? generateImageUrl(
                                                el?.imageArr[0]?.image
                                              )
                                            : ""
                                        }
                                        alt=""
                                      />
                                    </Link>
                                  )}
                              </div>
                              {el?.tags && (
                                <ul className="product-box-tags">
                                  {el?.tags
                                    ?.split(",")
                                    .filter((el, i) => i < 3)
                                    .map((el, tagIndex) => {
                                      return <li key={tagIndex}>{el}</li>;
                                    })}
                                </ul>
                              )}
                               {
                                 el.attributesArr && el.attributesArr.some(el =>el.price != "") ? (<span></span>): (<ul className="product-box-tags">
                                { el.stock<=0 &&  <li style={{backgroundColor:"red"}}>Out Of Stock</li>}
                                 </ul>
                              
                           ) }
                             
                                

                              <ul className="product-box-wishlist">
                                <li>
                                  <Wishlist
                                    heartFill={
                                      checkItemInWishList(el._id)
                                    }
                                    clickEvent={() => {
                                      if (checkItemInWishList(el._id)) {
                                        
                                        handleGetWishListedItem(el?._id);
                                      } else {
                                        handleAddToWishList(el?._id);
                                      }
                                      console.log(
                                        el?.isWishlisted,
                                        "item?.isWishlisted"
                                      );
                                    }}
                                    className="green pointer"
                                  />
                                </li>
                              </ul>
                              <h4 className="poppin">
                              <Link
                                to={`/Product-Detail/${el?.slug}`}
                                className="text-dark"
                              >
                                {el?.name}
                              </Link>
                            </h4>
                            <div className="d-flex justify-content-between align-items-center px-lg-4 px-2">
                              <h5 className="poppin">
                                {getconvertIntoCurrencyPriceWithSymbol(el?.mrp)}
                                {el?.stockType && el?.stockType !=""  ? `/${el?.stockType}`
                                : null}
                              </h5>
                              <div
                                onClick={() => handleAddToCart(el)}
                                className="btn btn-hover btn-custom btn-green btn-sm"
                              >
                                Add to cart
                              </div>
                            </div>
                            </div>
                       
                          
                        </SwiperSlide>
                      );
                    })}
                </Swiper>
              </div>
            </section>
          );
        })}

      <section className="mb-50 shop-category">
        <div className="container-fluid px-xxl-5">
          <div className="row gx-0">
            <div className="col-12 col-lg-5">
              {systemSetting?.homedecor1 && systemSetting?.homedecor1.image ? (
                <Link to={`${systemSetting?.homedecor1?.link}`}>
                  <div className="shop-category-left">
                    <div className="image position-relative">
                           <img src={images.homedecor} alt="" />
                      <h3>Home Decor</h3>
                    </div>
                  </div>
                </Link>
              ) : (
                <Link to="/SubCategory/home-decor">
                  <div className="shop-category-left">
                    <div className="image position-relative">
                      <img src={images.homedecor} alt="" />
                      <h3>Home Decor</h3>
                    </div>
                  </div>
                </Link>
              )}
            </div>
            <div className="col-12 col-lg-7 row gy-3 gy-md-2 m-0">
              <div className="col-12 col-sm-6">
                {systemSetting?.homedecor2 &&
                systemSetting?.homedecor2.image ? (
                  <Link to={`${systemSetting?.homedecor2?.link}`}>
                    <div className="shop-category-right">
                      <div className="image">
                        <img
                          src={generateImageUrl(
                            systemSetting?.homedecor2?.image
                          )}
                          alt=""
                        />
                      </div>
                      <h3>Table Runners</h3>
                    </div>
                  </Link>
                ) : (
                  <Link to="/">
                    <div className="shop-category-right">
                      <div className="image">
                        <img src={images.table} alt="" />
                      </div>
                      <h3>Table Runners</h3>
                    </div>
                  </Link>
                )}
              </div>
              <div className="col-12 col-sm-6">
                {systemSetting?.homedecor3 &&
                systemSetting?.homedecor3.image ? (
                  <Link to="/">
                    <div className="shop-category-right">
                      <div className="image">
                        <img
                          src={generateImageUrl(
                            systemSetting?.homedecor3?.image
                          )}
                          alt=""
                        />
                      </div>
                      <h3>Rugs</h3>
                    </div>
                  </Link>
                ) : (
                  <Link to="/">
                    <div className="shop-category-right">
                      <div className="image">
                        <img src={images.rugs} alt="" />
                      </div>
                      <h3>Rugs</h3>
                    </div>
                  </Link>
                )}
              </div>
              <div className="col-12 col-sm-6">
                {systemSetting?.homedecor4 &&
                systemSetting?.homedecor4.image ? (
                  <Link to="/">
                    <div className="shop-category-right">
                      <div className="image">
                        <img
                          src={generateImageUrl(
                            systemSetting?.homedecor4?.image
                          )}
                          alt=""
                        />
                      </div>
                      <h3>Cushions</h3>
                    </div>
                  </Link>
                ) : (
                  <Link to="/">
                    <div className="shop-category-right">
                      <div className="image">
                        <img src={images.cushions} alt="" />
                      </div>
                      <h3>Cushions</h3>
                    </div>
                  </Link>
                )}
              </div>
              <div className="col-12 col-sm-6">
                {systemSetting?.homedecor5 &&
                systemSetting?.homedecor5.image ? (
                  <Link to="/">
                    <div className="shop-category-right">
                      <div className="image">
                        <img
                          src={generateImageUrl(
                            systemSetting?.homedecor5?.image
                          )}
                          alt=""
                        />
                      </div>
                      <h3>Wall Hangings</h3>
                    </div>
                  </Link>
                ) : (
                  <Link to="/">
                    <div className="shop-category-right">
                      <div className="image">
                        <img src={images.wallhanging} alt="" />
                      </div>
                      <h3>Wall Hangings</h3>
                    </div>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        className="mb-50 join-banner"
        style={{ backgroundColor: "#ffeef8" }}
      >
        <div className="container-fluid description">
          <div className="title-section">
            <h1 className="heading">Join The Aahilya Family</h1>
          </div>
          <p className="des">
            Welcome to our world of art and craft. Join our mailing list and be
            the first to know about our new collections, exclusive offers and
            perks!
          </p>
          <p className="fw-semibold mt-4 mb-0 des_new">
            Subscribe to get our latest special offers and updates.
          </p>
          <form action="/" className="col-lg-5">
            <div className="form-control subscribe-form border-0">
              <input
                type="email"
                className="bg-transparent border-0 w-100"
                value={email}
                onChange={(e) => setemail(e.target.value)}
              />
              <button
                type="button"
                className="btn btn-custom btn-hover btn-green"
                onClick={handleSubscribe}
              >
                SUBMIT
              </button>
            </div>
          </form>
        </div>
      </section>

      <section className="mb-50">
        <div className="container-fluid px-lg-5">
          <div className="title-section text-center mb-4">
            <h1 className="heading heading-decor mb-0">Client's Review</h1>
            <Link
              to="/Feedback"
              className="btn btn-black btn-custom btn-hover rounded-1 "
            >
              View More
            </Link>
          </div>
          <Swiper
            slidesPerView={4}
            spaceBetween={0}
            speed={2000}
            loop
            autoplay={{ pauseOnMouseEnter: true, disableOnInteraction: false }}
            modules={[Autoplay]}
            className="h-100"
            breakpoints={clients_slider}
          >
            {testimonailArr &&
              testimonailArr.length > 0 &&
              testimonailArr.map((testtimonial, i) => (
                <SwiperSlide key={i}>
                  <div className="testimonials text-center">
                    <div className="quote">
                      <RiDoubleQuotesR />
                    </div>
                    <h5 className="poppin mb-2 pink">{testtimonial?.name}</h5>
                    <ul className="review-stars mt-1 mb-2">
                      <li>
                        <ImStarFull />
                      </li>
                      <li>
                        <ImStarFull />
                      </li>
                      <li>
                        <ImStarFull />
                      </li>
                      <li>
                        <ImStarHalf />
                      </li>
                      <li>
                        <ImStarEmpty />
                      </li>
                    </ul>
                    <p>
                      {testtimonial?.comment.substring(0, 200)}... <br />
                      <Link
                        to="#"
                        className="pink fw-semibold"
                        onClick={() => handleSetTestimonial(testtimonial)}
                      >
                        Read More
                      </Link>
                    </p>
                  </div>
                </SwiperSlide>
              ))}
          </Swiper>
        </div>
      </section>

      <section className="mb-50 gallery">
        <div className="container-fluid">
          <div className="title-section text-center mb-4">
            <h1 className="heading heading-decor mb-0">Our Gallery</h1>
            <Link
              to="/Gallery"
              className="btn btn-black btn-custom btn-hover rounded-1"
            >
              View More
            </Link>
          </div>
          <div className="row g-0">
            <div className="col-12 col-lg-4">
              <div className="gallery-page-inner gallery-big-img">
                <div className="image">
                  <img
                    src={generateImageUrl(galleryArr[0]?.imageUrl)}
                    alt=""
                    className="img-cover w-100"
                  />
                </div>
              </div>
            </div>
            <div className="col-12 col-lg-8 row g-0">
              <div className="col-6 col-sm-6 col-md-4">
                <div className="gallery-page-inner gallery-img">
                  <div className="image">
                    <img
                      src={generateImageUrl(galleryArr[1]?.imageUrl)}
                      alt=""
                      className="img-cover w-100"
                    />
                  </div>
                </div>
              </div>
              <div className="col-6 col-sm-6 col-md-4">
                <div className="gallery-page-inner gallery-img">
                  <div className="image">
                    <img
                      src={generateImageUrl(galleryArr[2]?.imageUrl)}
                      alt=""
                      className="img-cover w-100"
                    />
                  </div>
                </div>
              </div>
              <div className="col-6 col-sm-6 col-md-4">
                <div className="gallery-page-inner gallery-img">
                  <div className="image">
                    <img
                      src={generateImageUrl(galleryArr[3]?.imageUrl)}
                      alt=""
                      className="img-cover w-100"
                    />
                  </div>
                </div>
              </div>
              <div className="col-6 col-sm-6 col-md-4">
                <div className="gallery-page-inner gallery-img">
                  <div className="image">
                    <img
                      src={generateImageUrl(galleryArr[4]?.imageUrl)}
                      alt=""
                      className="img-cover w-100"
                    />
                  </div>
                </div>
              </div>
              <div className="col-6 col-sm-6 col-md-4">
                <div className="gallery-page-inner gallery-img">
                  <div className="image">
                    <img
                      src={generateImageUrl(galleryArr[5]?.imageUrl)}
                      alt=""
                      className="img-cover w-100"
                    />
                  </div>
                </div>
              </div>
              <div className="col-6 col-sm-6 col-md-4">
                <div className="gallery-page-inner gallery-img">
                  <div className="image">
                    <img
                      src={generateImageUrl(galleryArr[6]?.imageUrl)}
                      alt=""
                      className="img-cover w-100"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Instagram />

      <section
        className={loader ? "preloader opacity-0 invisible" : "preloader"}
      >
        <div className="preloader-inner">
          <div className="loader-logo">
            <img
              src={images.loader}
              alt="Aahilya - Connecting Artisan With You"
            />
          </div>
        </div>
      </section>

      <section
        className="three-box py-4"
        style={{ background: "#f5e2f3", borderBottom: "1px dashed #00000030" }}
      >
        <div className="container-fluid px-lg-5">
          <ul className="d-flex justify-content-evenly flex-wrap gap-3">
            <li className="text-center">
              <div className="icon">
                <img
                  src={images.icon1}
                  alt=""
                  height="60px"
                  className="img-contain w-auto"
                />
              </div>
              <h3 className="times-roman mb-0">Hand Made</h3>
            </li>
            <li className="text-center">
              <div className="icon">
                <img
                  src={images.icon5}
                  alt=""
                  height="60px"
                  className="img-contain w-auto"
                />
              </div>
              <h3 className="times-roman mb-0">
                <Link to="https://www.aahilyaholidays.com/">
                  Shipping Worldwide
                </Link>
              </h3>
            </li>
            <li className="text-center">
              <div className="icon">
                <img
                  src={images.icon2}
                  alt=""
                  height="60px"
                  className="img-contain w-auto"
                />
              </div>
              <h3 className="times-roman mb-0">Eco-Friendly</h3>
            </li>
            <li className="text-center">
              <div className="icon">
                <img
                  src={images.icon4}
                  alt=""
                  height="60px"
                  className="img-contain w-auto"
                />
              </div>
              <h3 className="times-roman mb-0">
                <a href="https://www.aahilyaholidays.com/">Meet Our Artisans</a>
              </h3>
            </li>
            <li className="text-center">
              <div className="icon">
                <img
                  src={images.icon3}
                  alt=""
                  height="60px"
                  className="img-contain w-auto"
                />
              </div>
              <h3 className="times-roman mb-0">Fair Trade</h3>
            </li>
          </ul>
        </div>
      </section>

      {/* ===================================SALE MODAL================================================================= */}
      <Modal
        isOpen={modalVisible}
        onRequestClose={() => setModalVisible(false)}
        className="custom-modal"
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
            onClick={() => setModalVisible(false)}
          ></button>
          <div className="row align-items-center">
            <div className="col-12 col-xl-6">
              <div className="home-popup-content">
                <h5 className="poppin green">{newLetterObj?.title}</h5>
                <p>{newLetterObj?.description}</p>
                <form action="#" className="form">
                  <div className="gap-2 shadow-none subscribe-form border-0 mb-0">
                    <input
                      type="email"
                      className="form-control flex-1 bg-light py-2 px-3"
                      placeholder="Enter Your Email"
                      value={email}
                      onChange={(e) => setemail(e.target.value)}
                    />
                    <Link
                      to=""
                      className="btn btn-custom btn-hover btn-green py-2 btn-sm rounded-0 mt-2"
                      onClick={handleSubscribe}
                    >
                      SUBMIT
                    </Link>
                  </div>
                  <div className="form-text">
                    We promise to only send you good things!
                    <span className="emoji fs-5">👍</span>
                  </div>
                </form>
                {/* <div className="row mt-3">
                  {newLetterObj?.imageArr &&
                    newLetterObj?.imageArr.length > 0 &&
                    newLetterObj?.imageArr.map((image, i) => (
                      <div className="col-6" key={i}>
                        <div className="overflow-hidden">
                          <img
                            src={generateImageUrl(image.image)}
                            alt=""
                            className="w-100 img-cover"
                          />
                        </div>
                      </div>
                    ))}
                </div> */}
              </div>
            </div>
            <div className="col-12 d-none d-xl-block col-xl-6">
                 {newLetterObj?.imageArr &&
                    newLetterObj?.imageArr.length > 0 && (
                      <img
                      src={generateImageUrl(newLetterObj?.imageArr[0].image)}
                      alt=""
                      className="w-100 img-cover home-popup-img"
                    />
                    )
                  }
              {/* <img
                src={images.home_popup}
                alt=""
                className="w-100 img-cover home-popup-img"
              /> */}
            </div>
          </div>
        </div>
      </Modal>

      {/* ====================================DISCOUNT MODAL================================================================ */}

      <Modal
        isOpen={discountModal}
        onRequestClose={() => setDiscountModal(false)}
        className="custom-modal bg-transparent"
        bodyOpenClassName="custom-modal-body"
        overlayClassName="custom-modal-overlay"
        htmlOpenClassName="custom-modal-html"
        portalClassName="custom-modal-parent"
        contentLabel="Example Modal"
      >
        <div className="popup-modal discount-modal">
          <button
            type="button"
            className="btn-close pointer"
            onClick={() => setDiscountModal(false)}
          ></button>
          <img src={localStorage.getItem("discountModal")} alt='' />
        </div>
      </Modal>
      {/* =====================================TESTIMONIAL MODAL=============================================================== */}

      <Modal
        isOpen={testimonialModal}
        onRequestClose={() => settestimonialModal(false)}
        className="custom-modal"
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
            onClick={() => settestimonialModal(false)}
          ></button>
          <div className="row align-items-center">
            <div className="col-12">
              <div className="home-popup-content">
                <h5 className="poppin green">{testimonial?.name}</h5>
                <p className="fs-15">{testimonial?.description}</p>
              </div>
            </div>
          </div>
        </div>
      </Modal>
      {/* ==================================================================================================== */}
    </main>
  );
}

export default Index;
