import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Select from "react-select";
import { ShippingCountryContext } from "../../App";
import {
  addUserAddress,
  getAddress,
  updateAddressById,
} from "../../services/address.service";
import { getLocalCart } from "../../services/localCart";
import { getDecodedToken, getToken, registerUser, setToken } from "../../services/User.service";
import { addAddressInCart, getCartData } from "../../services/UserCart.service";
import { countryList } from "../../utils/country";
import { errorToast, successToast } from "../../utils/Toast";
import OrderSummary from "./OrderSummary";
import { IoArrowBack } from 'react-icons/io5';


function Checkout({ setprocedure, checkoutData }) {
  const options = [
    { value: "popular", label: "Popular" },
    { value: "Date, new to old", label: "Date, new to old" },
    { value: "Price, low to high", label: "Price, low to high" },
  ];

  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [landmark, setLandmark] = useState("");
  const [addressLine1, setAddressLine1] = useState("");
  const [addressLine2, setAddressLine2] = useState("");
  const [country, setCountry] = useState("");
  const [name, setName] = useState("");
  const [lname, setlame] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [pincode, setPincode] = useState("");
  const [phone, setPhone] = useState("");
  const [isDefault, setIsDefault] = useState(false);
  const [contextCounry, setcontextCounry] = useContext(ShippingCountryContext)
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [address, setaddress] = useState([]);
  const [isNewRegister, setisNewRegister] = useState(false);
  const [orderNotes, setorderNotes] = useState("");
  const handleAddAddress = async () => {
    try {
      if (city == "") {
        errorToast("City is mandatory");
        return;
      }
      //   if (state == "") {
      //     errorToast("State is mandatory");
      //     return;
      //   }
      //   if (landmark == "") {
      //     errorToast("Landmark is mandatory");
      //     return;
      //   }
      if (addressLine1 == "") {
        errorToast("Address Line 1 is mandatory");
        return;
      }
      // if (addressLine2 == "") {
      //   errorToast("addressLine2 is mandatory");
      //   return;
      // }
      if (country == "") {
        errorToast("Country is mandatory");
        return;
      }
      if (name == "") {
        errorToast("First Name is mandatory");
        return;
      }
      if (lname == "") {
        errorToast("Last name is mandatory");
        return;
      }
      if (pincode == "") {
        errorToast("Pincode is mandatory");
        return;
      }
      if (phone == "") {
        errorToast("Phone is mandatory");
        return;
      }
      if (phone.length != 10) {
        errorToast("Invalid Phone number is provided");
        return;
      }
      if (email == "") {
        errorToast("Email is mandatory");
        return;
      }

      let decoded = getDecodedToken();

      let obj = {
        city,
        state,
        landmark,
        addressLine1,
        addressLine2,
        country,
        name: `${name} ${lname}`,
        companyName,
        pincode,
        phone,
        email,
        isDefault,
        orderNotes
      };
      if (decoded && decoded.userId) {
        obj.userId = decoded.userId;
        let { data: res } = await addUserAddress(obj);
        if (res.message) {
          successToast(res.message);
          handleGetAddress();
          setnewAddress(false);
        }
      } else {
        localStorage.setItem('cart-address', JSON.stringify(obj))
        setprocedure("shipping");
      }
    } catch (err) {
      errorToast(err);
    }
  };
  const navigate = useNavigate();

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

    } catch (err) {
      errorToast(err);
      // console.error(err);
    }
  }


  const handleGetAddress = async () => {
    try {
      let { data: res } = await getAddress();
      // console.log("sdaffa");
      if (res.data) {
        res.data.length == 0 ? setnewAddress(true) : setnewAddress(false)
        setaddress([
          ...res.data.map((el) => {
            if (el.isDefault === true) {
              return { ...el, checked: true };
            } else {
              return { ...el, checked: false };
            }
          }),
        ]);
      }
    } catch (err) {
      errorToast(err);
    }
  };
  const updateAddress = async (id, obj) => {
    try {
      let { data: res } = await updateAddressById(id, obj);
      // console.log(res);
      if (res.data) {
      }
    } catch (err) {
      errorToast(err);
    }
  };

  const handleShipping = async () => {
    try {
      if (address.some((el) => el.isDefault)) {
        let addressObj = address.find((el) => el.isDefault);
        // console.log({ ...addressObj, addressId: addressObj?._id });
        const { data: res } = await addAddressInCart({
          addressObj: { ...addressObj, addressId: addressObj?._id },
        });
        if (res) {
          setprocedure("shipping");
        }
      } else {
        errorToast({ message: "Please select address" });
      }
    } catch (error) {
      errorToast(error);
    }
  };

  const handleAddressSelection = (index) => {
    let tempArr = [...address.map((el) => ({ ...el, checked: false }))];
    tempArr[index].checked = true;
    if (tempArr[index]) {
      let adressId = tempArr[index]?._id;
      let obj = {
        isDefault: true,
      };
      updateAddress(adressId, obj);
    }
    // console.log(tempArr[index], "selectd ");
    let slectedAddress = tempArr[index];
    if (slectedAddress && slectedAddress.country) {
      setcontextCounry(slectedAddress.country)
    }
    setaddress([...tempArr]);
    handleGetAddress();
  };

  const handleRegister = async () => {
    try {
      let obj = {
        email,
        password,
      };
      let { data: res } = await registerUser(obj);
      // console.log(res, "res");
      if (res.message) {
        successToast(res.message);
        setToken(res.token);
        window.location.reload();
        // alert(res.message)
      }
    } catch (err) {
      errorToast(err);
    }
  };



  const handleLocalAddress = () => {

    let localAddress = localStorage.getItem("cart-address");
    if (localAddress && localAddress != "null") {
      let localAddressObj = JSON.parse(localAddress);
      if (localAddressObj.email) {
        setemail(localAddressObj.email)
      }
      if (localAddressObj.city) {
        setCity(localAddressObj.city)
      }
      if (localAddressObj.addressLine1) {
        setAddressLine1(localAddressObj.addressLine1)
      }
      if (localAddressObj.state) {
        setState(localAddressObj.state)
      }
      if (localAddressObj.country) {
        setCountry(localAddressObj.country)
      }
      if (localAddressObj.phone) {
        setPhone(localAddressObj.phone)
      }
      if (localAddressObj.pincode) {
        setPincode(localAddressObj.pincode)
      }
      if (localAddressObj.orderNotes) {
        setorderNotes(localAddressObj.orderNotes)
      }
      if (localAddressObj.name) {
        let snameArr = localAddressObj.name.split(" ");
        console.log(snameArr)
        setName(snameArr[0])
        setlame(snameArr[1] ? snameArr[1] : '')
      }
      console.log(localAddressObj, "localAddressObjlocalAddressObj")
    }
  }

  useEffect(() => {
    if (getToken()) {
      handleGetAddress();
    } else {
      handleLocalAddress()
    }
    handleGetCart();
    setnewAddress(true)
  }, []);

  useEffect(() => {
    setcontextCounry(country)

  }, [country]);

  const [newAddress, setnewAddress] = useState(false);
  return (
    <div className="checkout-page">
      <div className="container">
        <div className="title-section text-center mb-4">
          <h1 className="heading mb-0">Checkout</h1>

        </div>
        <div className="row gy-4">
          <div className="col-12 col-xl-7">
            <div className="checkout-page-left">
              <form action="#" className="form row">
                <div className="col-12">
                  <div className="d-flex align-items-center justify-content-between">
                    {/* <p className="title">Contact information</p> */}

                    <div className="form-text ps-3">
                      Already have an account?&nbsp;
                      <Link to="/Login" className="green fw-semibold">
                        Log in
                      </Link>
                    </div>
                  </div>
                </div>
                {
                  (!getToken() && (
                    <>
                      {
                        isNewRegister == true && (
                          <>
                            <div className="col-12 col-sm-6 mb-3">
                              <label>
                                Email
                                <input
                                  type="text"
                                  onChange={(e) => setemail(e.target.value)}
                                  value={email}
                                  className="form-control"
                                />
                              </label>
                            </div>
                            <div className="col-12 col-sm-6 mb-3">
                              <label>
                                Password
                                <input
                                  type="text"
                                  onChange={(e) => setpassword(e.target.value)}
                                  value={password}
                                  className="form-control"
                                />
                              </label>
                            </div>
                            <div className="col-12 mt-3">
                              <button
                                type="button"
                                onClick={() => handleRegister()}
                                className="btn btn-hover btn-custom btn-black btn-sm rounded-1 px-4 py-3"
                              >
                                Create Account
                              </button>
                            </div>
                          </>

                        )
                      }

                      <div className="form-check">
                        <div className="form-text mb-3">
                          Don't have an account.Create Account &nbsp;
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value=""
                            checked={isNewRegister}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setisNewRegister(true);
                              } else {
                                setisNewRegister(false);
                              }
                            }}
                          />
                        </div>
                        <label className="form-check-label">


                        </label>
                      </div>
                    </>
                  ))
                }


                <div className="shipping-page-left">
                  <p className="title">{!getToken() ? 'Shipping Address' : 'Address'}</p>
                  <ul className="info mb-0">
                    {address &&
                      address.length > 0 &&
                      address.map((el, index) => {
                        return (
                          <li key={index}>
                            <div className="form-check">
                              <span>
                                <input
                                  id={`address${index}`}
                                  className="form-check-input"
                                  type="radio"
                                  checked={el?.isDefault}
                                  name="billing-address"
                                  onChange={() => handleAddressSelection(index)}
                                />
                                <label
                                  htmlFor={`address${index}`}
                                  className="form-check-label"
                                >
                                  {`${el.addressLine1}, ${el.addressLine2}, ${el.landmark}, ${el.city}, ${el.state}, ${el.country} - ${el.pincode}`}
                                </label>
                              </span>
                            </div>
                            {/* {el.isDefault && (
                              <span className="fw-semibold">(Default)</span>
                            )} */}
                          </li>
                        );
                      })}
                  </ul>
                  {
                    getToken() && (
                      <div className="form-check mt-2">
                        <label className="form-check-label">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value=""
                            checked={newAddress}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setnewAddress(true);
                              } else {
                                setnewAddress(false);
                              }
                            }}
                          />
                          Ship to {address.length > 0 && ('another')} address
                        </label>
                      </div>
                    )
                  }

                </div>
              </form>
              {newAddress && (
                <form className="form row mt-5 md-5">

                  {
                    getToken() && (<div className="col-12">
                      <p className="title fw-semibold">Add new address</p>
                    </div>)
                  }
                  <div className="col-12 mb-3">
                    <label>
                      Country <span className="text-danger">*</span>
                      <select className="form-control" onChange={(e) => setCountry(e.target.value)} value={country}>
                        <option value=""> Please Select Country</option>
                        {
                          countryList && countryList.length > 0 && countryList.map((el, i) => <option key={i} value={el.name.toLowerCase()}>{el.name != 'UK' ? el.name : 'UNITED KINGDOM'}</option>)

                        }
                      </select>
                      {/* <input
                        type="text"
                        onChange={(e) => setCountry(e.target.value)}
                        value={country}
                        className="form-control"
                      /> */}
                    </label>
                  </div>
                  <div className="col-12 col-sm-6 mb-3">
                    <label>
                      First Name <span className="text-danger">*</span>
                      <input
                        type="text"
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                        className="form-control"
                      />
                    </label>
                  </div>
                  <div className="col-12 col-sm-6 mb-3">
                    <label>
                      Last Name <span className="text-danger">*</span>
                      <input
                        type="text"
                        onChange={(e) => setlame(e.target.value)}
                        value={lname}
                        className="form-control"
                      />
                    </label>
                  </div>

                  <div className="col-12 col-sm-6 mb-3">
                    <label>
                      Email <span className="text-danger">*</span>
                      <input
                        type="text"
                        onChange={(e) => setemail(e.target.value)}
                        value={email}
                        className="form-control"
                      />
                    </label>
                  </div>
                  <div className="col-6 mb-0">
                    <label>
                      Phone <span className="text-danger">*</span>
                      <input
                        type="tel"
                        onChange={(e) => setPhone(e.target.value)}
                        maxLength={10}
                        value={phone}
                        className="form-control"
                      />
                    </label>
                  </div>
                  {/* <div className="col-12 col-sm-6 mb-3">
                    <label>
                      Company name(optional)
                      <input
                        type="text"
                        onChange={(e) => setCompanyName(e.target.value)}
                        value={companyName}
                        className="form-control"
                      />
                    </label>
                  </div> */}
                  <div className="col-12 mb-3">
                    <label>
                      Street Address <span className="text-danger">*</span>
                      <input
                        type="text"
                        onChange={(e) => setAddressLine1(e.target.value)}
                        value={addressLine1}
                        className="form-control"
                      />
                    </label>
                  </div>
                  {/* <div className="col-12 mb-3">
                    <label>
                      Apartment, suite, etc. (optional)
                      <input
                        onChange={(e) => setAddressLine2(e.target.value)}
                        value={addressLine2}
                        type="text"
                        className="form-control"
                      />
                    </label>
                  </div> */}
                  <div className="col-6  mb-3">
                    <label>
                      City <span className="text-danger">*</span>
                      <input
                        type="text"
                        onChange={(e) => setCity(e.target.value)}
                        value={city}
                        className="form-control"
                      />
                    </label>
                  </div>

                  <div className="col-6  mb-3">
                    <label>
                      State (Optional)
                      <input
                        onChange={(e) => setState(e.target.value)}
                        value={state}
                        type="text"
                        className="form-control"
                      />
                    </label>
                  </div>


                  <div className="col-6  mb-3">
                    <label>
                      Postal / Zip Code <span className="text-danger">*</span>
                      <input
                        type="text"
                        onChange={(e) => setPincode(e.target.value)}
                        value={pincode}
                        className="form-control"
                      />
                    </label>
                  </div>

                  <div className="col-6 mb-3">
                    <label className="mt-4">
                      Country : {contextCounry.toUpperCase() != 'UK' ? contextCounry.toUpperCase() : 'UNITED KINGDOM'}

                      {/* <input
                        type="text"
                        onChange={(e) => setCountry(e.target.value)}
                        value={country}
                        className="form-control"
                      /> */}
                    </label>
                  </div>
                  {/* <div className="col-6 mb-3">
                    <label>
                      Landmark (Optional)
                      <input
                        onChange={(e) => setLandmark(e.target.value)}
                        value={landmark}
                        type="text"
                        className="form-control"
                      />
                    </label>
                  </div> */}
                  <div className="col-12 mb-3">
                    <label>
                      Order Notes (Optional)
                      <textarea className="form-control" value={orderNotes} onChange={(e) => setorderNotes(e.target.value)} ></textarea>
                    </label>
                  </div>
                  {
                    getToken() && (<div className="col-12 mb-3">
                      <div className="form-check mt-2">
                        <label className="form-check-label">
                          <input
                            checked={isDefault}
                            onChange={() => setIsDefault(!isDefault)}
                            className="form-check-input"
                            type="checkbox"
                            value=""
                          />
                          Set as Default address
                        </label>
                      </div>

                    </div>)
                  }

                  <div className="col-12 mt-3">
                    {
                      getToken() && <button
                        type="button"
                        onClick={() => handleAddAddress()}
                        className="btn btn-hover btn-custom btn-black btn-sm rounded-1 px-4 py-3"
                      >
                        Submit
                      </button>
                    }

                  </div>
                </form>
              )}
              <div className="col-12 mt-3">
                <div className="row">
                  <div className="col-md-6  mt-3">
                    <Link to="/" className="fs-15 green fw-semibold">
                      <IoArrowBack />   Return To Shopping
                    </Link>
                  </div>
                  <div className="col-md-6">
                    <button


                      onClick={() => {
                        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
                        if (getToken()) {
                          handleShipping()
                        } else {
                          handleAddAddress()
                        }
                      }}
                      className="btn btn-hover btn-custom btn-maroon rounded-1 px-4 py-3"
                    >
                      Continue to Shipping
                    </button>
                  </div>
                </div>

              </div>
            </div>
          </div>
          <div className="col-12 col-xl-5">
            <OrderSummary />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
