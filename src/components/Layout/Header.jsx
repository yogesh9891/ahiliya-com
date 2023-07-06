import React, { useContext, useEffect, useState } from "react";
import Lottie from "lottie-react";
import { AiOutlineShoppingCart, AiOutlineUser } from "react-icons/ai";
import { BsSearch } from "react-icons/bs";
import { FaPhoneAlt } from "react-icons/fa";
import { GoThreeBars } from "react-icons/go";
import { GrMail } from "react-icons/gr";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { AuthoriseContext, CartCountContext } from "../../App";
import { CartContext } from "../../App";

import cart from "../../assets/images/cart.json";
import { getNestedCategories } from "../../services/Category.service";
import { addLocalCartToUser, getCartData } from "../../services/UserCart.service";
import CartBar from "../CartBar";
import { images } from "../Utility/Images";
import Wishlist from "../Utility/Wishlist";
import {
  getCurrency,
  setCurrencyRate,
  getCurrencyRate,
  setCountryFromLocal,
  getCountryFromLocal,
  getCurrencyFromLocal,
  setCurrencyFromLocal,
} from "../../services/Currency.service";
import { generateImageUrl } from "../../services/url.service";
import { wait } from "@testing-library/user-event/dist/utils";
import { getAllProducts } from "../../services/Product.service";
import { useRef } from "react";
import { getSystemSetting } from "../../services/Banner.service";
import { getIp, getIpJson } from "../../services/countryIp";
import { clearLocalCart, getLocalCart } from "../../services/localCart";

function Header({ auth }) {
  // ============================================================================

  const search_id = useRef(null)
  const [showSearch, setshowSearch] = useState(false);
  const [search, setSearch] = useState("");
  const [heartFill, setheartFill] = useState(false);
  const [showCart, setshowCart] = useState(false);
  const [runningCart, setrunningCart] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [systemSetting, setsystemSetting] = useState("");
  const [carts, setCarts] = useContext(CartCountContext);
  const [selectedOption, setSelectedOption] = useState({});
  const [currenc, setCurrenc] = useState("");
  const [selectIsOpen, setSelectIsOpen] = useState(false);
  const [placeholderText, setplaceholderText] = useState("placeholderText");
  const [windowWidth, setwindowWidth] = useState(window.innerWidth);
  const [scrollPos, setScrollPos] = useState(0);
  const [currencyArr, setCurrencyArr] = useState([]);
  const [productSearchArr, setSearchProductArr] = useState([]);
  const [category, setcategory] = useState([
    {
      name: "Wooden printing blocks",
      path: "/SubCategory",
      children: [
        {
          name: "Birds and animals",
          path: "/Products",
        },
        {
          name: "Box sets",
          path: "/Products",
        },
        {
          name: "Border, tiles & geometrical  blocks",
          path: "/Products",
        },
        {
          name: "Ethnic designs",
          path: "/Products",
        },
        {
          name: "Botanical ",
          path: "/Products",
        },
        {
          name: "Sea world",
          path: "/Products",
        },
        {
          name: "City life",
          path: "/Products",
        },
        {
          name: "Festive blocks",
          path: "/Products",
        },
        {
          name: "Scrip blocks",
          path: "/Products",
        },
        {
          name: " Insects, reptiles and bugs ",
          path: "/Products",
        },
        {
          name: " Fruits and vegetables ",
          path: "/Products",
        },
        {
          name: " Kids blocks",
          path: "/Products",
        },
        {
          name: " Crockery",
          path: "/Products",
        },
        {
          name: " Tea light blocks",
          path: "/Products",
        },
      ],
    },
    {
      name: "Fabric ",
      path: "/SubCategory",
      children: [
        {
          name: "Indigo and Bagru ",
          path: "/Products",
        },
        {
          name: "Sanganeri Block printed",
          path: "/Products",
        },
        {
          name: "Hand Screen printed ",
          path: "/Products",
        },
        {
          name: "Ikat",
          path: "/Products",
        },
        {
          name: "Khadi",
          path: "/Products",
        },
        {
          name: "Silk ",
          path: "/Products",
        },
        {
          name: "Kantha",
          path: "/Products",
        },
        {
          name: "Chanderi ",
          path: "/Products",
        },
        {
          name: "Kids fabric ",
          path: "/Products",
        },
        {
          name: " Fabric patches",
          path: "/Products",
        },
      ],
    },
    {
      name: "Home Decor ",
      path: "/SubCategory",
      children: [
        {
          name: "Quilts",
          path: "/Products",
        },
        {
          name: "Table runner ",
          path: "/Products",
        },
        {
          name: "Towels",
          path: "/Products",
        },
        {
          name: "Rugs",
          path: "/Products",
        },
        {
          name: "Bed sheets",
          path: "/Products",
        },
        {
          name: "Cushion covers",
          path: "/Products",
        },
      ],
    },
    {
      name: "Clothing ",
      path: "/SubCategory",
      children: [
        {
          name: "Kaftans",
          path: "/Products",
        },
        {
          name: "Bathrobes",
          path: "/Products",
        },
        {
          name: "Dresses  ",
          path: "/Products",
        },
        {
          name: "Stoles",
          path: "/Products",
        },
        {
          name: "Pants ",
          path: "/Products",
        },
        {
          name: "Night suits",
          path: "/Products",
        },
      ],
    },
    {
      name: "Paper & journals ",
      path: "/SubCategory",
      children: [
        {
          name: "Handmade papers ",
          path: "/Products",
        },
        {
          name: "Journals",
          path: "/Products",
        },
        {
          name: "Handmade boxes ",
          path: "/Products",
        },
        {
          name: "Cards",
          path: "/Products",
        },
      ],
    },
    {
      name: "Bags & Accessories ",
      path: "/SubCategory",
      children: [
        {
          name: "Bags",
          path: "/Products",
        },
        {
          name: "Utility pouches",
          path: "/Products",
        },
        {
          name: "Wallets",
          path: "/Products",
        },
        {
          name: "Document/ Travel Folder ",
          path: "/Products",
        },
        {
          name: "Coin pouch",
          path: "/Products",
        },
        {
          name: "Card holder ",
          path: "/Products",
        },
        {
          name: "Necklaces ",
          path: "/Products",
        },
        {
          name: "Combos ",
          path: "/Products",
        },
        {
          name: "Laptop bags",
          path: "/Products",
        },
      ],
    },
    {
      name: "Christmas",
      path: "/SubCategory",
      children: [
        {
          name: "Wooden printing blocks",
          path: "/Products",
        },
        {
          name: "Fabric",
          path: "/Products",
        },
        {
          name: "Gift combos ",
          path: "/Products",
        },
        {
          name: "Christmas ornaments",
          path: "/Products",
        },
      ],
    },
    {
      name: "Bulk Order",
      path: "/SubCategory",
      children: [
        {
          name: "Tote bags",
          path: "/Products",
        },
        {
          name: "Drawstring bags",
          path: "/Products",
        },
        {
          name: "Customised wooden printing Blocks ",
          path: "/Products",
        },
        {
          name: "Cotton stoles",
          path: "/Products",
        },
        {
          name: "Cotton potli bags",
          path: "/Products",
        },
        {
          name: "Tea towels",
          path: "/Products",
        },
        {
          name: "Table runners",
          path: "/Products",
        },
        {
          name: "Customised block printed fabric",
          path: "/Products",
        },
      ],
    },
  ]);

  const [categoryArr, setCategoryArr] = useState([]);
  const [showCartSideBar, setShowCartSideBar] = useContext(CartContext)

  const handleGetAllCategories = async () => {
    try {
      let { data: res } = await getNestedCategories("noImage=true");
      if (res.data) {
        setCategoryArr(res.data);
        // console.log(carts, "carts context headr");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handlegetSystemSetting = async () => {
    try {
      let { data: res } = await getSystemSetting();
      if (res.data && res.data.length > 0) {
        setsystemSetting(res.data[0]);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleGetIp = async () => {
    try {
  
      if(!getCountryFromLocal()){
        let {data:res} = await getIpJson();
        let country  = res.country_name;
        let currency  = res.currency;
        setCurrencyFromLocal(currency)
        setCountryFromLocal(country)
        setCurrenc(currency)
        // setCurrencyFromLocal('USD')
        // setCountryFromLocal('USA')
        // console.log("IPIPIPPPPP".res.data)
        // console.log(res,"IPIPIPPPPP")
        // setCountryFromLocal(response)
      } else {
        setCurrenc(getCountryFromLocal)

      }

    } catch (err) {
      console.error(err);
    }
  };


  const handleSearchProduct = async () => {
    try {
      let { data: res } = await getAllProducts(`q=${search}&limit=5000`);
      if (res.data) {
        // console.log(res.data, "productSearchArrproductSearchArr");
        setSearchProductArr(res.data);
      }
    } catch (err) {
      console.error(err);
    }
  };
  
  
  useEffect(() => {
    // console.log(search, "fdfadsfds");
    if (search) {
      handleSearchProduct();
    }
  }, [search]);


  const handleGetAllCurrency = async (currency) => {
    try {
      let defaultvalue = {
        code: "GBP",
        image: images.gbp,
        convertRate: 0.011,
        symbol: "£",
      };
      // console.log(getCurrencyRate(), "jkhiiuhouiphoijoijp");
      let { data: res } = await getCurrency("status=true");
      if (res.data) {
        let inrvalue = {
          code: "INR",
          image: images.inr,
          convertRate: 1,
          symbol: "₹",
        };
        res.data.push(inrvalue);
   
        if (!getCurrencyRate()) {
          // console.log(getCurrencyRate(), "getCurrencyRate");
        // console.log(currency, "currency");

          if(currency){
            let currencyObj = res.data.find((el) =>`${el.code.trim()}`.toLowerCase() == `${currency.trim()}`.toLowerCase())
            if(currencyObj) {
              defaultvalue = {
                code: currencyObj.code,
                image: currencyObj.image,
                convertRate: currencyObj.convertRate,
                symbol: currencyObj.symbol,
              };
            setCurrencyRate(defaultvalue);
            setSelectedOption(defaultvalue)

            // console.log(currencyObj,"currencyObjcurrencyObj")

            } else {
              setCurrencyFromLocal(defaultvalue.code)
              setCurrencyRate(defaultvalue);
              setSelectedOption(defaultvalue)
            }
          } else {

            // console.log(defaultvalue,"defaultvaluedefaultvaluedefaultvaluedefaultvaluedefaultvaluedefaultvalue")
            setCurrencyFromLocal(defaultvalue.code)
            setCurrencyRate(defaultvalue);
            setSelectedOption(defaultvalue)
          }
         
        } else {
          let tempObj = getCurrencyRate();
          tempObj = JSON.parse(tempObj);
        
          setSelectedOption(tempObj);
        }
        setCurrencyArr(res.data);
      } else {

        setCurrencyFromLocal(defaultvalue.code)
        setCurrencyRate(defaultvalue);
        setSelectedOption(defaultvalue)

      }
    } catch (err) {
      console.error(err);
    }
  };

  const setlocalCurrency = () => {
    let defaultvalue = {
      code: "USD",
      image: images.usd,
      convertRate: 0.12,
      symbol: "$",
    };
    setSelectedOption(defaultvalue);
  };
  useEffect(() => {
    handleGetIp();
    handleGetAllCategories();
    handlegetSystemSetting();
    handleLocalToLoginUser();
 
  }, []);

  useEffect(() => {
    if(currenc){
        handleGetAllCurrency(currenc);
    }
  }, [currenc]);

  useEffect(() => {
    // console.log(windowWidth, scrollPos, "pos");
    // console.log(windowWidth, scrollPos, "pos1");

    if (windowWidth < 1200) {
      setshowSearch(false);
    }
  }, []);

  const handleLocalToLoginUser = async () => {
    let { data: respon } = await getLocalCart();
    if(respon.data){
      let { data: rescart }=  await addLocalCartToUser(respon);
      setCarts(rescart.length)
      clearLocalCart();
       
    }
  }

  window.addEventListener("scroll", () => {
    setScrollPos(document.documentElement.scrollTop);
  });

  const [Currency, setCurrency] = useState([
    {
      label: "USD",
      value: 1,
      active: false,
      img: images.usd,
    },
    {
      label: "INR",
      value: 2,
      active: false,
      img: images.inr,
    },
    {
      label: "EUR",
      value: 3,
      active: false,
      img: images.eur,
    },
    {
      label: "AUD",
      value: 4,
      active: false,
      img: images.aud,
    },
    {
      label: "AED",
      value: 5,
      active: false,
      img: images.aed,
    },
    {
      label: "GBP",
      value: 6,
      active: false,
      img: images.gbp,
    },
  ]);
  const handleSetSelectedOption = (obj) => {
    setCurrencyRate(obj);

    // console.log(obj, "obj");
    setSelectedOption({
      code: obj.code,
      image: obj.image,
      convertRate: obj.convertRate,
      symbol: obj.symbol,
    });
    setSelectIsOpen(!selectIsOpen);
    window.location.reload(false);
  };

  const handleDropDownIsOpen = () => {
    return setSelectIsOpen(!selectIsOpen);
  };

  const handleCategory = (path) => {

    navigate(`/SubCategory/${path}`);
    let setData={
      x: 0,
       y:0,
   
      }
     //  localStorage.setItem("page", page[1]);
      localStorage.setItem("scrollData",JSON.stringify(setData))
  };

  useEffect(() => {
    // console.log(" Ffrom Header cart cartArr1", showCart);
  }, [showCart]);

  useEffect(() => {
    if (showSearch) {
      search_id.current.focus();
    }
    // console.log(showSearch, "showSearch",document.querySelector("#search_id"));
  }, [showSearch]);

  // ============================================================================


  const handlesearch = (slug) => {
    setshowSearch(false)
    setSearch("")
    setSearchProductArr([])

    console.log(`/Product-Detail/${slug}`,"slugslugslug")
    navigate(`/Product-Detail/${slug}`);
  }
  const handleSetPageOffSet = () => {
    let setData={
    x:  window.pageXOffset,
     y: window.pageYOffset,
 
    }
   //  localStorage.setItem("page", page[1]);
    localStorage.setItem("scrollData",JSON.stringify(setData))
    
   };
  return (
    <header>
      <div className="topbar purple-bg futura py-0">
        <div className="container-fluid">
          <ul>
            <li>
              <span className="text-white">
                <FaPhoneAlt />
              </span>
              <p>
                <a href="tel:+91 9289-370-407">+91 9289-370-407</a>
              </p>
            </li>
            <li className="flex-1">
              <marquee width="150%" direction="left">
                <p> {systemSetting?.headerMarquee ? systemSetting?.headerMarquee :'Participate in our wooden block printing competition'}</p>
              </marquee>
            </li>
            <li>
              <span className="text-white">
                <GrMail />
              </span>
              <p>
                <a href="mailto:info@aahilya.com">info@aahilya.com</a>
              </p>
            </li>
          </ul>
        </div>
      </div>
      <div className="middlebar text-white">
        <div className="container-fluid">
          <div className="middlebar-inner">
            <Link className="navbar-brand" to="/">
              <img src={images.logo2} alt="" className="main-logo" />
            </Link>
            <ul>
              <li>
                <div className="d-flex align-items-center gap-2 gap-sm-3 position-relative">
                  <div
                    onFocus={() => setshowSearch(true)}
                    onBlur={() => {setshowSearch(false) }}
                  >
                    <div
                      className="icon pointer"
                      onClick={() => setshowSearch(!showSearch)}
                    >
                      <BsSearch />
                    </div>
                    <form
                      action="#"
                      className={`form search-form ${
                        showSearch ? "show-search" : ""
                      }`}
                    >
                      <label>Search</label>
                      <input
                        type="search"
                        placeholder="Search here"
                        className="form-control"
                        ref={search_id}
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                      />

                      <ul className="search-form-list">
                        {productSearchArr &&
                          productSearchArr.length > 0 &&
                          productSearchArr.map((el, i) => (
                            <li key={i} style={{cursor: "pointer"}}>
                              <span
                            onClick={()=>{handlesearch(el?.slug)}}
                                className="text-dark"
                              >
                                {el?.name}
                              </span>
                            </li>
                          ))}
                      </ul>
                    </form>
                  </div>
                  {auth ? (
                    <>
                      <Link to="/Wishlist">
                        <Wishlist
                          heartFill={heartFill}
                          clickEvent={() => {
                            setheartFill(!heartFill);
                            setrunningCart(false);
                          }}
                        />
                      </Link>
                      <Link to="/Account">
                        <div className="icon">
                          <AiOutlineUser />
                        </div>
                      </Link>
                      <button
                        className='navbar-toggler icon'
                        type="button"
                        data-bs-toggle="offcanvas"
                        data-bs-target="#cart-offcanvas"
                        aria-controls="cart-offcanvas"
                        onClick={() => {
                         
                          setheartFill(false);
                          setshowCart(true);
                          setShowCartSideBar(true)
                          setTimeout(() => {
                            setrunningCart(false);
                          }, 5000);
                        }}
                      >
                          <AiOutlineShoppingCart style={{fontSize:30}} />
                          <span className="fs-15 green fw-semibold">
                          ({carts?carts:'0'})
                        </span>
                      </button>
                    </>
                  ) : (
                    <>
                      <Link to="/Login">
                        <Wishlist
                          heartFill={heartFill}
                          clickEvent={() => {
                            setheartFill(false);
                            setrunningCart(false);
                          }}
                        />
                      </Link>
                      <Link to="/Login">
                        <div className="icon">
                          <AiOutlineUser />
                        </div>
                      </Link>
                      <button
                        className="navbar-toggler icon position-relative"
                        type="button"
                        data-bs-toggle="offcanvas"
                        data-bs-target="#cart-offcanvas"
                        aria-controls="cart-offcanvas"
                        onClick={() => {
                          setshowCart(true);
                          setShowCartSideBar(true)

                          setTimeout(() => {
                            setrunningCart(false);
                          }, 5000);
                        }}
                      >
                        <AiOutlineShoppingCart />
                        {/* <span class="position-absolute top-0 start-100 translate-middle badge green-bg">
                          {carts?.length}+
                        </span> */}
                        <span className="fs-15 green fw-semibold">
                          ({carts?carts:'0'})
                        </span>
                      </button>
                    </>
                  )}
                </div>
              </li>
              <li className="d-block d-xl-none">
                <button
                  className="navbar-toggler"
                  type="button"
                  data-bs-toggle="offcanvas"
                  data-bs-target="#offcanvasNavbar"
                  aria-controls="offcanvasNavbar"
                >
                  <span className="navbar-toggler-icon">
                    <GoThreeBars />
                  </span>
                </button>
              </li>
              {windowWidth > 1200 && (
                <li>
                  {!auth && (
                    <Link
                      className="btn btn-green btn-custom btn-hover btn-sm"
                      to="/Login"
                    >
                      SIGN IN / SIGN UP
                    </Link>
                  )}
                </li>
              )}
              <li>
                <div className="custum-select">
                  <div className="header-select-style btn btn-custom btn-sm">
                    <div
                      onClick={() => handleDropDownIsOpen()}
                      className="d-flex align-items-center"
                    >
                      <div className="custum-select-text">
                        <p className="mb-0">
                          {selectedOption
                            ? selectedOption?.code
                            : placeholderText && placeholderText !== ""
                            ? placeholderText
                            : "Please Select an Option"}
                        </p>
                        <img
                          src={`${selectedOption.image}`.includes('usa')? selectedOption.image:`${selectedOption.image}`.includes('base64')?selectedOption.image: generateImageUrl(selectedOption.image)
                          }
                          alt=""
                          className="flag"
                        />
                      </div>
                      <img src={images.down_arrow} className="down-arrow" />
                    </div>
                  </div>
                  {selectIsOpen && (
                    <ul className="custum-select-menu">
                      {currencyArr && currencyArr.length > 0 ? (
                        currencyArr.map((el, index) => {
                          return (
                            <li
                              key={index}
                              onClick={() => handleSetSelectedOption(el)}
                              className={el.active ? "active" : ""}
                            >
                              <p className="mb-0">{el.code}</p>
                              <img
                                src={
                                  el.image?.includes('base64')
                                    ? el.image
                                    : generateImageUrl(el.image)
                                }
                                alt=""
                                className="flag"
                              />
                            </li>
                          );
                        })
                      ) : (
                        <div>No options found</div>
                      )}
                    </ul>
                  )}
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <nav className="navbar bottom-bar navbar-expand-xl sticky-top">
        <div className="container-fluid">
          <div
            className="offcanvas offcanvas-end"
            tabIndex="-1"
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
          >
            <div className="offcanvas-header">
              <Link className="navbar-brand" to="/">
                <img src={images.logo2} alt="" className="main-logo" />
              </Link>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              ></button>
            </div>
            <div className="offcanvas-body">
              <ul className="navbar-nav justify-content-center futura flex-grow-1">
                {scrollPos > 120 && (
                  <li className="d-flex align-items-center">
                    <Link className="navbar-brand" to="/">
                      <img src={images.logo2} alt="" className="main-logo" />
                    </Link>
                  </li>
                )}
                <li className="nav-item">
                  <Link className="nav-link" to="/">
                    Home
                  </Link>
                </li>
                {/* {console.log(categoryArr,"12categoryArr")} */}
                {categoryArr &&
                  categoryArr.length > 0 &&
                  categoryArr.map((item, i) => {
                    if (
                      item.subCategoryArr === undefined ||
                      item.subCategoryArr.length == 0
                    ) {
                      return (
                        <li className="nav-item" key={i}>
                          <Link
                            className="nav-link"
                            to={`/SubCategory/${item.slug}`}
                            onClick={()=>{
                              
                            }}
                          >
                            {item.name}
                          </Link>
                        </li>
                      );
                    } else {
                      return (
                        <li className="nav-item dropdown" key={i}>
                          <Link
                            className="nav-link"
                            to={`/SubCategory/${item.slug}`}
                            role="button"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                            onClick={() => handleCategory(item.slug)}
                          >
                            {item.name}
                          </Link>
                          <ul className="dropdown-menu">
                            {item.subCategoryArr.map((child, Index) => {
                              return (
                                <li key={Index}>
                                  <Link
                                    className="dropdown-item"
                                    to={`/Products/${child.slug}`}
                                    onClick={()=>handleSetPageOffSet()}
                                  >
                                    {child.name}
                                  </Link>
                                </li>
                              );
                            })}
                          </ul>
                        </li>
                      );
                    }
                  })}

                {windowWidth < 1200 && (
                  <>
                    {!auth && (
                      <li className="nav-item">
                        <Link
                          className="btn btn-green btn-custom btn-hover btn-sm"
                          to="/"
                        >
                          SIGN IN / SIGN UP
                        </Link>
                      </li>
                    )}
                  </>
                )}
              </ul>
            </div>
          </div>
        </div>
      </nav>
      <CartBar setshowCart={setshowCart} showCart={showCart} />
    </header>
  );
}

export default Header;
