import React, { useEffect, useState } from "react";
import { FaPhoneAlt } from "react-icons/fa";
import { GrMail } from "react-icons/gr";
import { Link, useLocation } from "react-router-dom";
import { images } from "../Utility/Images";
import { ImLocation } from "react-icons/im";
import { getNestedCategories } from "../../services/Category.service";
import {
  subscribeNewsletter,
} from "../../services/Banner.service";
import { errorToast, successToast } from "../../utils/Toast";

function Footer() {
  const [scrollEvent, setscrollEvent] = useState(false);
  const location = useLocation();
  const [email,setEmail]=useState("")
  window.addEventListener("scroll", () => {
    const scrollValue = document.documentElement.scrollTop;
    if (scrollValue > 150) {
      setscrollEvent(true);
    } else {
      setscrollEvent(false);
    }
  });
  useEffect(() => {
    handleGetAllCategories();
  }, []);

  const [categoryArr, setCategoryArr] = useState([]);

  const handleGetAllCategories = async () => {
    try {
      let { data: res } = await getNestedCategories("level=1");

      if (res.data) {
        // console.log("dsfdsfa", res.data);
        setCategoryArr(res.data);
      }
    } catch (err) {
      console.error(err);
    }
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
        // setModalVisible(false);
      }
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <>
      <footer style={{ background: "#f5e2f3" }}>
        <div className="footer">
          <div className="container-fluid px-lg-5">
            <div className="row">
              <div className="col-12 col-lg-12 col-xxl-3 mb-4 mb-xxl-0">
                <div className="pe-lg-5">
                  <Link className="navbar-brand" to="/">
                    <img src={images.logo2} alt="" className="main-logo mb-2" />
                  </Link>
                  <p className="text-justify">
                    Aahilya Creations is the leading online store for handmade
                    Indian crafts and fabric. We are working as medium between
                    craftsmen, weavers, artisans, local small scale business
                    vendors to International market and encouraging Indian
                    textiles and crafts.
                  </p>
                </div>
              </div>
              <div className="col-12 col-sm-6 mb-4 mb-lg-0 col-lg-3 col-xxl-2">
                <h4>Category </h4>
                {/* {categoryArr.length} */}
                <ul>
                  {categoryArr &&
                    categoryArr.length > 0 &&
                    categoryArr.map((category, i) => (
                      <li key={i}>
                        <Link
                          className="links"
                          to={`/SubCategory/${category.slug}`}
                        >
                          {category.name}
                        </Link>
                      </li>
                    ))}

                  {/* <li>
                    <Link className="links" to="/">
                      The Indian Fabric
                    </Link>
                  </li>
                  <li>
                    <Link className="links" to="/">
                      The Christmas
                    </Link>
                  </li>
                  <li>
                    <Link className="links" to="/">
                      Home Decor Shop
                    </Link>
                  </li>
                  <li>
                    <Link className="links" to="/">
                      Gifts Shop
                    </Link>
                  </li>
                  <li>
                    <Link className="links" to="/">
                      Clothing
                    </Link> 
                  </li>*/}
                </ul>
              </div>
              <div className="col-12 col-sm-6 mb-4 mb-lg-0 col-lg-3 col-xxl-2">
                <h4>Quick Links</h4>
                <ul className="links">
                  <li>
                    <Link className="links" to="/">
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link className="links" to="/About-Us">
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link className="links" to="/FAQ">
                      FAQ
                    </Link>
                  </li>
                  <li>
                    <Link className="links" to="/Blogs">
                      Blog
                    </Link>
                  </li>
                  <li>
                    <Link className="links" to="/Terms-and-Condition">
                      Terms and Condition
                    </Link>
                  </li>
                  <li>
                    <Link className="links" to="/Privacy-Policy">
                    Privacy Policy
                    </Link>
                  </li>
                  <li>
                    <Link className="links" to="/Return-and-Refund-Policy ">
                    Return & Refund Policy
                    </Link>
                  </li>
                  <li>
                    <Link className="links" to="/Shipping-and-Payment-Policy">
                    Shipping & Payment Policy
                    </Link>
                  </li>
                  <li>
                  <a href="https://www.aahilyaholidays.com/"  className="links">Meet Our Artisans</a>
                  </li>
                </ul>
              </div>
              <div className="col-12 mb-4 mb-sm-0 col-sm-6 col-lg-3 col-xxl-2">
                <h4>Contacts us</h4>
                <ul className="links">
                  <li>
                    <a href="tel:+91 9289-370-407">
                      <div className="icon pink">
                        <FaPhoneAlt />
                      </div>
                      <p>+91 9289-370-407</p>
                    </a>
                  </li>
                  <li>
                    <a href="mailto:info@aahilya.com">
                      <div className="icon pink">
                        <GrMail />
                      </div>
                      <p>info@aahilya.com</p>
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://goo.gl/maps/D5hCi5DLFfemVvVJ7"
                      target="_blank"
                      className="align-items-start"
                    >
                      <div className="icon pink">
                        <ImLocation />
                      </div>
                      <div>
                        <h6 className="mb-0">Aahilya Store Location</h6>
                        <p>C125, Sector 1, Rohini, New Delhi, Pin- 110085</p>
                      </div>
                    </a>
                  </li>
                </ul>
              </div>
              <div className="col-12 col-sm-6 col-lg-3 col-xxl-3 mb-0">
                <h4>Sign up &amp; Save</h4>
                <ul>
                  <li>
                    <Link className="links align-items-start gap-2" to="/Login">
                      Sign In / Sign Up
                    </Link>
                  </li>
                  <li>
                    <p className="mb-2">
                      Subscribe to get special offers, free giveaways, and
                      once-in-a-lifetime deals.
                    </p>
                    <form action="#" className="form">
                      <div className="search-form">
                        <div className="form-control">
                          <input type="email" placeholder="Enter your Email"onChange={(e)=>setEmail(e.target.value)} />
                      
                          <div className="icon pink"   onClick={handleSubscribe}
              >
                            <GrMail />
                          </div>
                        </div>
                      </div>
                    </form>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="container-fluid px-lg-5">
          <ul className="text-center d-flex align-items-center justify-content-start justify-content-md-center gap-1 gap-md-2 mb-2 overflow-hidden">
            <li>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                role="img"
                viewBox="0 0 38 24"
                width="38"
                height="24"
                aria-labelledby="pi-american_express"
              >
                <title id="pi-american_express">American Express</title>
                <g fill="none">
                  <path
                    fill="#000"
                    d="M35,0 L3,0 C1.3,0 0,1.3 0,3 L0,21 C0,22.7 1.4,24 3,24 L35,24 C36.7,24 38,22.7 38,21 L38,3 C38,1.3 36.6,0 35,0 Z"
                    opacity=".07"
                  ></path>
                  <path
                    fill="#006FCF"
                    d="M35,1 C36.1,1 37,1.9 37,3 L37,21 C37,22.1 36.1,23 35,23 L3,23 C1.9,23 1,22.1 1,21 L1,3 C1,1.9 1.9,1 3,1 L35,1"
                  ></path>
                  <path
                    fill="#FFF"
                    d="M8.971,10.268 L9.745,12.144 L8.203,12.144 L8.971,10.268 Z M25.046,10.346 L22.069,10.346 L22.069,11.173 L24.998,11.173 L24.998,12.412 L22.075,12.412 L22.075,13.334 L25.052,13.334 L25.052,14.073 L27.129,11.828 L25.052,9.488 L25.046,10.346 L25.046,10.346 Z M10.983,8.006 L14.978,8.006 L15.865,9.941 L16.687,8 L27.057,8 L28.135,9.19 L29.25,8 L34.013,8 L30.494,11.852 L33.977,15.68 L29.143,15.68 L28.065,14.49 L26.94,15.68 L10.03,15.68 L9.536,14.49 L8.406,14.49 L7.911,15.68 L4,15.68 L7.286,8 L10.716,8 L10.983,8.006 Z M19.646,9.084 L17.407,9.084 L15.907,12.62 L14.282,9.084 L12.06,9.084 L12.06,13.894 L10,9.084 L8.007,9.084 L5.625,14.596 L7.18,14.596 L7.674,13.406 L10.27,13.406 L10.764,14.596 L13.484,14.596 L13.484,10.661 L15.235,14.602 L16.425,14.602 L18.165,10.673 L18.165,14.603 L19.623,14.603 L19.647,9.083 L19.646,9.084 Z M28.986,11.852 L31.517,9.084 L29.695,9.084 L28.094,10.81 L26.546,9.084 L20.652,9.084 L20.652,14.602 L26.462,14.602 L28.076,12.864 L29.624,14.602 L31.499,14.602 L28.987,11.852 L28.986,11.852 Z"
                  ></path>
                </g>
              </svg>
            </li>

            <li>
              <svg
                viewBox="0 0 38 24"
                width="38"
                height="24"
                role="img"
                aria-labelledby="pi-discover"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title id="pi-discover">Discover</title>
                <path
                  fill="#000"
                  opacity=".07"
                  d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3z"
                ></path>
                <path
                  d="M35 1c1.1 0 2 .9 2 2v18c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V3c0-1.1.9-2 2-2h32z"
                  fill="#fff"
                ></path>
                <path
                  d="M3.57 7.16H2v5.5h1.57c.83 0 1.43-.2 1.96-.63.63-.52 1-1.3 1-2.11-.01-1.63-1.22-2.76-2.96-2.76zm1.26 4.14c-.34.3-.77.44-1.47.44h-.29V8.1h.29c.69 0 1.11.12 1.47.44.37.33.59.84.59 1.37 0 .53-.22 1.06-.59 1.39zm2.19-4.14h1.07v5.5H7.02v-5.5zm3.69 2.11c-.64-.24-.83-.4-.83-.69 0-.35.34-.61.8-.61.32 0 .59.13.86.45l.56-.73c-.46-.4-1.01-.61-1.62-.61-.97 0-1.72.68-1.72 1.58 0 .76.35 1.15 1.35 1.51.42.15.63.25.74.31.21.14.32.34.32.57 0 .45-.35.78-.83.78-.51 0-.92-.26-1.17-.73l-.69.67c.49.73 1.09 1.05 1.9 1.05 1.11 0 1.9-.74 1.9-1.81.02-.89-.35-1.29-1.57-1.74zm1.92.65c0 1.62 1.27 2.87 2.9 2.87.46 0 .86-.09 1.34-.32v-1.26c-.43.43-.81.6-1.29.6-1.08 0-1.85-.78-1.85-1.9 0-1.06.79-1.89 1.8-1.89.51 0 .9.18 1.34.62V7.38c-.47-.24-.86-.34-1.32-.34-1.61 0-2.92 1.28-2.92 2.88zm12.76.94l-1.47-3.7h-1.17l2.33 5.64h.58l2.37-5.64h-1.16l-1.48 3.7zm3.13 1.8h3.04v-.93h-1.97v-1.48h1.9v-.93h-1.9V8.1h1.97v-.94h-3.04v5.5zm7.29-3.87c0-1.03-.71-1.62-1.95-1.62h-1.59v5.5h1.07v-2.21h.14l1.48 2.21h1.32l-1.73-2.32c.81-.17 1.26-.72 1.26-1.56zm-2.16.91h-.31V8.03h.33c.67 0 1.03.28 1.03.82 0 .55-.36.85-1.05.85z"
                  fill="#231F20"
                ></path>
                <path
                  d="M20.16 12.86a2.931 2.931 0 100-5.862 2.931 2.931 0 000 5.862z"
                  fill="url(#pi-paint0_linear)"
                ></path>
                <path
                  opacity=".65"
                  d="M20.16 12.86a2.931 2.931 0 100-5.862 2.931 2.931 0 000 5.862z"
                  fill="url(#pi-paint1_linear)"
                ></path>
                <path
                  d="M36.57 7.506c0-.1-.07-.15-.18-.15h-.16v.48h.12v-.19l.14.19h.14l-.16-.2c.06-.01.1-.06.1-.13zm-.2.07h-.02v-.13h.02c.06 0 .09.02.09.06 0 .05-.03.07-.09.07z"
                  fill="#231F20"
                ></path>
                <path
                  d="M36.41 7.176c-.23 0-.42.19-.42.42 0 .23.19.42.42.42.23 0 .42-.19.42-.42 0-.23-.19-.42-.42-.42zm0 .77c-.18 0-.34-.15-.34-.35 0-.19.15-.35.34-.35.18 0 .33.16.33.35 0 .19-.15.35-.33.35z"
                  fill="#231F20"
                ></path>
                <path
                  d="M37 12.984S27.09 19.873 8.976 23h26.023a2 2 0 002-1.984l.024-3.02L37 12.985z"
                  fill="#F48120"
                ></path>
                <defs>
                  <linearGradient
                    id="pi-paint0_linear"
                    x1="21.657"
                    y1="12.275"
                    x2="19.632"
                    y2="9.104"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#F89F20"></stop>
                    <stop offset=".25" stopColor="#F79A20"></stop>
                    <stop offset=".533" stopColor="#F68D20"></stop>
                    <stop offset=".62" stopColor="#F58720"></stop>
                    <stop offset=".723" stopColor="#F48120"></stop>
                    <stop offset="1" stopColor="#F37521"></stop>
                  </linearGradient>
                  <linearGradient
                    id="pi-paint1_linear"
                    x1="21.338"
                    y1="12.232"
                    x2="18.378"
                    y2="6.446"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#F58720"></stop>
                    <stop offset=".359" stopColor="#E16F27"></stop>
                    <stop offset=".703" stopColor="#D4602C"></stop>
                    <stop offset=".982" stopColor="#D05B2E"></stop>
                  </linearGradient>
                </defs>
              </svg>
            </li>

            <li>
              <svg
                width="38"
                height="24"
                role="img"
                aria-labelledby="pi-jcb"
                viewBox="0 0 38 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title id="pi-jcb">JCB</title>
                <g fill="none" fillRule="evenodd">
                  <g fillRule="nonzero">
                    <path
                      d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3z"
                      fill="#000"
                      opacity=".07"
                    ></path>
                    <path
                      d="M35 1c1.1 0 2 .9 2 2v18c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V3c0-1.1.9-2 2-2h32"
                      fill="#FFF"
                    ></path>
                  </g>
                  <path
                    d="M11.5 5H15v11.5a2.5 2.5 0 0 1-2.5 2.5H9V7.5A2.5 2.5 0 0 1 11.5 5z"
                    fill="#006EBC"
                  ></path>
                  <path
                    d="M18.5 5H22v11.5a2.5 2.5 0 0 1-2.5 2.5H16V7.5A2.5 2.5 0 0 1 18.5 5z"
                    fill="#F00036"
                  ></path>
                  <path
                    d="M25.5 5H29v11.5a2.5 2.5 0 0 1-2.5 2.5H23V7.5A2.5 2.5 0 0 1 25.5 5z"
                    fill="#2AB419"
                  ></path>
                  <path
                    d="M10.755 14.5c-1.06 0-2.122-.304-2.656-.987l.78-.676c.068 1.133 3.545 1.24 3.545-.19V9.5h1.802v3.147c0 .728-.574 1.322-1.573 1.632-.466.144-1.365.221-1.898.221zm8.116 0c-.674 0-1.388-.107-1.965-.366-.948-.425-1.312-1.206-1.3-2.199.012-1.014.436-1.782 1.468-2.165 1.319-.49 3.343-.261 3.926.27v.972c-.572-.521-1.958-.898-2.919-.46-.494.226-.737.917-.744 1.448-.006.56.245 1.252.744 1.497.953.467 2.39.04 2.919-.441v1.01c-.358.255-1.253.434-2.129.434zm8.679-2.587c.37-.235.582-.567.582-1.005 0-.438-.116-.687-.348-.939-.206-.207-.58-.469-1.238-.469H23v5h3.546c.696 0 1.097-.23 1.315-.415.283-.25.426-.53.426-.96 0-.431-.155-.908-.737-1.212zm-1.906-.281h-1.428v-1.444h1.495c.956 0 .944 1.444-.067 1.444zm.288 2.157h-1.716v-1.513h1.716c.986 0 1.083 1.513 0 1.513z"
                    fill="#FFF"
                    fillRule="nonzero"
                  ></path>
                </g>
              </svg>
            </li>

            <li>
              <svg
                viewBox="0 0 38 24"
                xmlns="http://www.w3.org/2000/svg"
                role="img"
                width="38"
                height="24"
                aria-labelledby="pi-master"
              >
                <title id="pi-master">Mastercard</title>
                <path
                  opacity=".07"
                  d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3z"
                ></path>
                <path
                  fill="#fff"
                  d="M35 1c1.1 0 2 .9 2 2v18c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V3c0-1.1.9-2 2-2h32"
                ></path>
                <circle fill="#EB001B" cx="15" cy="12" r="7"></circle>
                <circle fill="#F79E1B" cx="23" cy="12" r="7"></circle>
                <path
                  fill="#FF5F00"
                  d="M22 12c0-2.4-1.2-4.5-3-5.7-1.8 1.3-3 3.4-3 5.7s1.2 4.5 3 5.7c1.8-1.2 3-3.3 3-5.7z"
                ></path>
              </svg>
            </li>

            <li>
              <svg
                viewBox="0 0 38 24"
                xmlns="http://www.w3.org/2000/svg"
                data-name="Layer 1"
                width="38"
                height="24"
                role="img"
                aria-labelledby="pi-netbanking"
              >
                <title id="pi-netbanking">NetBanking</title>
                <rect
                  x=".5"
                  y=".5"
                  width="37"
                  height="23"
                  rx="3"
                  ry="3"
                  fill="#fff"
                  stroke="#000"
                  strokeOpacity=".07"
                ></rect>
                <path d="M19 4.5l-7.5 5.63h15L19 4.5zm6.56 13.13H12.44a.94.94 0 0 0-.94.94v.93h15v-.94a.94.94 0 0 0-.94-.93zm-5.62-6.57h1.88v5.63h-1.88zm3.75 0h1.88v5.63h-1.88zm-7.5 0h1.88v5.63h-1.88zm-3.75 0h1.88v5.63h-1.88z"></path>
              </svg>
            </li>

            <li>
              <svg
                viewBox="0 0 38 24"
                xmlns="http://www.w3.org/2000/svg"
                width="38"
                height="24"
                role="img"
                aria-labelledby="pi-paypal"
              >
                <title id="pi-paypal">PayPal</title>
                <path
                  opacity=".07"
                  d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3z"
                ></path>
                <path
                  fill="#fff"
                  d="M35 1c1.1 0 2 .9 2 2v18c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V3c0-1.1.9-2 2-2h32"
                ></path>
                <path
                  fill="#003087"
                  d="M23.9 8.3c.2-1 0-1.7-.6-2.3-.6-.7-1.7-1-3.1-1h-4.1c-.3 0-.5.2-.6.5L14 15.6c0 .2.1.4.3.4H17l.4-3.4 1.8-2.2 4.7-2.1z"
                ></path>
                <path
                  fill="#3086C8"
                  d="M23.9 8.3l-.2.2c-.5 2.8-2.2 3.8-4.6 3.8H18c-.3 0-.5.2-.6.5l-.6 3.9-.2 1c0 .2.1.4.3.4H19c.3 0 .5-.2.5-.4v-.1l.4-2.4v-.1c0-.2.3-.4.5-.4h.3c2.1 0 3.7-.8 4.1-3.2.2-1 .1-1.8-.4-2.4-.1-.5-.3-.7-.5-.8z"
                ></path>
                <path
                  fill="#012169"
                  d="M23.3 8.1c-.1-.1-.2-.1-.3-.1-.1 0-.2 0-.3-.1-.3-.1-.7-.1-1.1-.1h-3c-.1 0-.2 0-.2.1-.2.1-.3.2-.3.4l-.7 4.4v.1c0-.3.3-.5.6-.5h1.3c2.5 0 4.1-1 4.6-3.8v-.2c-.1-.1-.3-.2-.5-.2h-.1z"
                ></path>
              </svg>
            </li>
            <li>
              <svg
                viewBox="0 0 38 24"
                xmlns="http://www.w3.org/2000/svg"
                data-name="Layer 1"
                width="38"
                height="24"
                role="img"
                aria-labelledby="pi-paytm"
              >
                <title id="pi-paytm">Paytm</title>
                <rect
                  x=".5"
                  y=".5"
                  width="37"
                  height="23"
                  rx="3"
                  ry="3"
                  fill="#fff"
                  stroke="#000"
                  strokeOpacity=".07"
                ></rect>
                <path
                  d="M14.17 13.32v2.6a.87.87 0 0 1-.74.91h-2.7a1.83 1.83 0 0 1-2-1.9 14.66 14.66 0 0 1 .06-2.08 1.81 1.81 0 0 1 1.69-1.54h1.19a.31.31 0 0 0 .34-.41.33.33 0 0 0-.23-.41H10c-.38 0-.46-.08-.46-.47V8.91a.3.3 0 0 1 .25-.35h2.39a1.87 1.87 0 0 1 1.92 2.1c.08.91.07 1.79.07 2.66zm-3.32 1.34a.34.34 0 0 0 .31.36h.61a.33.33 0 0 0 .36-.35v-1.13c0-.3-.16-.36-.72-.36s-.53.1-.56.37v1.11zm9.58-2.73v2.81a2 2 0 0 1-1.85 2.15h-2.45c-.34 0-.42-.07-.42-.42v-1.26a.3.3 0 0 1 .29-.35h2a.32.32 0 0 0 .36-.34.33.33 0 0 0-.31-.35h-1a1.94 1.94 0 0 1-2-1.86V9a.32.32 0 0 1 .26-.37h1.34c.34 0 .42.1.42.45v2.6c0 .45.1.54.55.54h.05c.62 0 .67-.05.67-.66V9a.36.36 0 0 1 .45-.5H20a.36.36 0 0 1 .42.42c.01 1.08.01 2.02.01 3.01zM4.57 14.48v1.94c0 .46-.06.51-.52.51H2.87a.3.3 0 0 1-.36-.36V9a.28.28 0 0 1 .22-.32H6.2a1.66 1.66 0 0 1 1.62 1.61 17.62 17.62 0 0 1 0 2.49 1.74 1.74 0 0 1-1.73 1.74H4.57zm0-2.08h.86a.32.32 0 0 0 .32-.31V11a.32.32 0 0 0-.28-.35h-.88v1.74z"
                  fill="#22346c"
                ></path>
                <path
                  d="M28.94 9a2.2 2.2 0 0 1 2.86.1 7.28 7.28 0 0 1 1.15-.51 2.08 2.08 0 0 1 2.56 2v5.83c0 .36-.09.45-.45.45h-1.15a.35.35 0 0 1-.42-.42v-5.24a.6.6 0 0 0-.79-.64.55.55 0 0 0-.49.58v5.4a.31.31 0 0 1-.25.36h-1.43a.3.3 0 0 1-.35-.31v-5.43a.48.48 0 0 0-.29-.55 1.38 1.38 0 0 0-.71 0 .48.48 0 0 0-.26.53v5.21c0 .48-.06.55-.56.55h-1c-.36 0-.42-.08-.42-.44V9c0-.42.06-.47.46-.47h1.09a.42.42 0 0 1 .45.47zm-5.43 1.64h-.77a.33.33 0 0 1-.41-.4V9a.31.31 0 0 1 .25-.36h.1a2 2 0 0 0 1.74-1 2 2 0 0 1 .58-.57c.24-.16.42 0 .44.27v1.27h.7a.36.36 0 0 1 .42.42v1.22a.35.35 0 0 1-.42.42h-.66v5.83c0 .42-.07.48-.47.49h-1.09a.34.34 0 0 1-.42-.42c.01-1.87.01-5.78.01-5.92z"
                  fill="#24b8eb"
                ></path>
              </svg>
            </li>

            <li>
              <svg
                viewBox="0 0 38 24"
                xmlns="http://www.w3.org/2000/svg"
                data-name="Layer 1"
                width="38"
                height="24"
                role="img"
                aria-labelledby="pi-payzapp"
              >
                <title id="pi-payzapp">PayZapp</title>
                <rect
                  x=".5"
                  y=".5"
                  width="37"
                  height="23"
                  rx="3"
                  ry="3"
                  fill="#fff"
                  stroke="#000"
                  strokeOpacity=".07"
                ></rect>
                <path
                  d="M18.3 4.92H12v6.37h2.45V7.4h3.85V4.92zm1.4 0V7.4h3.86v3.89H26V4.92h-6.3zm3.85 7.78v3.9H19.7v2.47H26v-6.36h-2.45zm-9.1 3.9v-3.89H12v6.36h6.3V16.6h-3.85z"
                  fill="#ed232a"
                ></path>
                <path d="M16.91 9.88h4.19v4.24H17z" fill="#004c8f"></path>
              </svg>
            </li>

            <li>
              <svg
                viewBox="0 0 38 24"
                xmlns="http://www.w3.org/2000/svg"
                width="38"
                height="24"
                role="img"
                aria-labelledby="pi-rupay"
              >
                <title id="pi-rupay">RuPay</title>
                <g fill="none" fillRule="evenodd">
                  <rect
                    strokeOpacity=".07"
                    stroke="#000"
                    fill="#FFF"
                    x=".5"
                    y=".5"
                    width="37"
                    height="23"
                    rx="3"
                  ></rect>
                  <path fill="#097A44" d="M32 15.77l2-7.41 2 3.82z"></path>
                  <path fill="#F46F20" d="M30.76 15.79l2-7.4 2 3.82z"></path>
                  <path
                    d="M20.67 8.2a2 2 0 0 0-1.56-.56h-3l-1.95 6.81h1.75l.66-2.31h1.23a3.4 3.4 0 0 0 1.9-.5 2.93 2.93 0 0 0 1.12-1.72 1.77 1.77 0 0 0-.15-1.72zm-3.21.94h1.12a.76.76 0 0 1 .55.15c.11.11.07.35 0 .53a1.08 1.08 0 0 1-.4.62 1.21 1.21 0 0 1-.7.2H17l.46-1.5zM9.14 9a1.64 1.64 0 0 0-.2-.61 1.3 1.3 0 0 0-.58-.53 2.75 2.75 0 0 0-1.08-.18H4l-2 6.75h1.73l.72-2.52H5.7c.47 0 .58.1.6.13.02.03.09.15 0 .65l-.16.6a3.35 3.35 0 0 0-.11.59v.55h1.79l.12-.43-.11-.08s-.07-.05-.06-.2c.027-.19.07-.377.13-.56l.1-.42a2.14 2.14 0 0 0 .1-1.11.88.88 0 0 0-.26-.41 2 2 0 0 0 .68-.54 2.79 2.79 0 0 0 .53-1c.07-.22.101-.45.09-.68zm-1.86.83a.84.84 0 0 1-.5.6 1.79 1.79 0 0 1-.64.09H4.86l.38-1.33h1.43a1.1 1.1 0 0 1 .53.09c.05 0 .21.07.08.5v.05zm4.9 2.17a2.11 2.11 0 0 1-.3.67 1 1 0 0 1-.87.43c-.34 0-.36-.14-.38-.2a1.24 1.24 0 0 1 .07-.52l.89-3.11H9.9l-.86 3a3 3 0 0 0-.15 1.32c.08.42.4.91 1.41.91.247.004.493-.03.73-.1a2.51 2.51 0 0 0 .6-.29l-.08.3h1.62l1.47-5.13H13L12.18 12zm12.93 1.1l.63-2.18c.24-.83-.07-1.21-.37-1.39A2.75 2.75 0 0 0 24 9.2a2.87 2.87 0 0 0-2 .68 2.75 2.75 0 0 0-.69 1.1l-.09.26h1.61v-.11a1.15 1.15 0 0 1 .25-.37.84.84 0 0 1 .56-.17.89.89 0 0 1 .46.08v.18c0 .06 0 .15-.25.23a2.13 2.13 0 0 1-.48.1l-.44.05a4 4 0 0 0-1.25.32c-.57.271-.99.78-1.15 1.39a1.25 1.25 0 0 0 .17 1.22c.289.307.7.468 1.12.44a2.43 2.43 0 0 0 1.07-.25l.4-.23v.33H25l.13-.48-.13-.07a.61.61 0 0 1 0-.22c0-.25.07-.43.11-.58zm-2.92-.1a.62.62 0 0 1 .34-.4 2.17 2.17 0 0 1 .57-.15l.29-.05.3-.07v.07a1.24 1.24 0 0 1-.51.75 1.44 1.44 0 0 1-.72.21.34.34 0 0 1-.25-.08.55.55 0 0 1-.02-.28zm7.91-3.68l-1.69 3v-3h-1.8l.39 5.13-.12.19a.8.8 0 0 1-.23.25.64.64 0 0 1-.24.08h-.68l-.39 1.37h.83a2 2 0 0 0 1.29-.34 9.55 9.55 0 0 0 1.27-1.71l3.17-5-1.8.03z"
                    fill="#302F82"
                  ></path>
                </g>
              </svg>
            </li>

            <li>
              <svg
                viewBox="0 0 38 24"
                xmlns="http://www.w3.org/2000/svg"
                role="img"
                width="38"
                height="24"
                aria-labelledby="pi-visa"
              >
                <title id="pi-visa">Visa</title>
                <path
                  opacity=".07"
                  d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3z"
                ></path>
                <path
                  fill="#fff"
                  d="M35 1c1.1 0 2 .9 2 2v18c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V3c0-1.1.9-2 2-2h32"
                ></path>
                <path
                  d="M28.3 10.1H28c-.4 1-.7 1.5-1 3h1.9c-.3-1.5-.3-2.2-.6-3zm2.9 5.9h-1.7c-.1 0-.1 0-.2-.1l-.2-.9-.1-.2h-2.4c-.1 0-.2 0-.2.2l-.3.9c0 .1-.1.1-.1.1h-2.1l.2-.5L27 8.7c0-.5.3-.7.8-.7h1.5c.1 0 .2 0 .2.2l1.4 6.5c.1.4.2.7.2 1.1.1.1.1.1.1.2zm-13.4-.3l.4-1.8c.1 0 .2.1.2.1.7.3 1.4.5 2.1.4.2 0 .5-.1.7-.2.5-.2.5-.7.1-1.1-.2-.2-.5-.3-.8-.5-.4-.2-.8-.4-1.1-.7-1.2-1-.8-2.4-.1-3.1.6-.4.9-.8 1.7-.8 1.2 0 2.5 0 3.1.2h.1c-.1.6-.2 1.1-.4 1.7-.5-.2-1-.4-1.5-.4-.3 0-.6 0-.9.1-.2 0-.3.1-.4.2-.2.2-.2.5 0 .7l.5.4c.4.2.8.4 1.1.6.5.3 1 .8 1.1 1.4.2.9-.1 1.7-.9 2.3-.5.4-.7.6-1.4.6-1.4 0-2.5.1-3.4-.2-.1.2-.1.2-.2.1zm-3.5.3c.1-.7.1-.7.2-1 .5-2.2 1-4.5 1.4-6.7.1-.2.1-.3.3-.3H18c-.2 1.2-.4 2.1-.7 3.2-.3 1.5-.6 3-1 4.5 0 .2-.1.2-.3.2M5 8.2c0-.1.2-.2.3-.2h3.4c.5 0 .9.3 1 .8l.9 4.4c0 .1 0 .1.1.2 0-.1.1-.1.1-.1l2.1-5.1c-.1-.1 0-.2.1-.2h2.1c0 .1 0 .1-.1.2l-3.1 7.3c-.1.2-.1.3-.2.4-.1.1-.3 0-.5 0H9.7c-.1 0-.2 0-.2-.2L7.9 9.5c-.2-.2-.5-.5-.9-.6-.6-.3-1.7-.5-1.9-.5L5 8.2z"
                  fill="#142688"
                ></path>
              </svg>
            </li>
          </ul>
          <div className="copyright">
            <p>
              Copyright &copy; 2022 Aahilya Creations 
              {/*- Designed by <Link to="ebslon.com"> Ebslon Infotech</Link> */}
            </p>
          </div>
        </div>
      </footer>
{
 location !=""  && location.pathname === '/' && (
  <section
        className={
          scrollEvent
            ? "fixed-social opacity-100 visible"
            : "fixed-social opacity-0 invisible"
        }
      >
        <ul>
          <li>
            <a href="https://www.facebook.com/AahilyaCreations/">
              <img src={images.fb} alt=""   target="_blank" />
            </a>
          </li>
          <li>
            <a href="https://www.instagram.com/invites/contact/?i=1jnmq8xyv6oix&utm_content=iiytj2h">
              <img src={images.insta} alt=""   target="_blank" />
            </a>
          </li>
          <li>
            <a href="https://www.youtube.com/channel/UC_pvPqzJ6hQJ7adUiG82HkA">
              <img src={images.YouTube} alt=""   target="_blank" />
            </a>
          </li>
          <li>
            <a
              href="https://api.whatsapp.com/send?phone=919289370407"
              target="_blank"
            >
              <img src={images.whatsapp} alt="" />
            </a>
          </li>
        </ul>
      </section>
 )
}
    
    </>
  );
}

export default Footer;
