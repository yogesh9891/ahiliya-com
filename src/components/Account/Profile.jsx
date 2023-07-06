import React, { useEffect, useState } from "react";
import { MdEdit } from "react-icons/md";
import { AiOutlineClose } from "react-icons/ai";
import Select from "react-select";
import { errorToast, successToast } from "../../utils/Toast";
import { addUserAddress, deleteAddressById, getAddress, updateAddressById } from "../../services/address.service";
import { getDecodedToken, getUserById } from "../../services/User.service";
import { countryList } from "../../utils/country";

function Profile() {
  const [userObj, setUserObj] = useState({});
  const [isEditActive, setIsEditActive] = useState(false);
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [landmark, setLandmark] = useState("");
  const [addressLine1, setAddressLine1] = useState("");
  const [addressLine2, setAddressLine2] = useState("");
  const [country, setCountry] = useState("");
  const [name, setName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [pincode, setPincode] = useState("");
  const [phone, setPhone] = useState("");
  const [isDefault, setIsDefault] = useState(false);


  const [selectedAddress, setSelectedAddress] = useState({});

  const [address, setaddress] = useState([]);
  const [newAddress, setnewAddress] = useState(false);
  const options = [
    { value: "popular", label: "Popular" },
    { value: "Date, new to old", label: "Date, new to old" },
    { value: "Price, low to high", label: "Price, low to high" },
  ];
  const deleteAddress = (i) => {
    let temp = address.filter((item, index) => !(i === index));
    setaddress([...temp]);
  };


  const handleGetAddress = async () => {
    try {
      let { data: res } = await getAddress();
      // console.log(res)
      if (res.data) {
        setaddress(res.data)
      }
    }
    catch (err) {
      errorToast(err)
    }
  }


  const handleGetProfileData = async () => {
    try {
      let { data: res } = await getUserById();
      if (res.data) {
        setUserObj(res.data)
      }
      // console.log(res, "getUserById")
    }
    catch (err) {
      errorToast(err)
    }
  }


  const handleDeleteAddress = async (id) => {
    try {
      let { data: res } = await deleteAddressById(id);
      // console.log(res.message)
      if (res.message) {
        successToast(res.message)
        handleGetAddress()
      }
      // console.log(res, "getUserById")
    }
    catch (err) {
      errorToast(err)
    }
  }


  const handleAddAddress = async () => {
    try {

      if (city == "") {
        errorToast("City is mandatory");
        return;
      }
      if (state == "") {
        errorToast("State is mandatory");
        return;
      }
      if (landmark == "") {
        errorToast("Landmark is mandatory");
        return;
      }
      if (addressLine1 == "") {
        errorToast("Address Line 1 is mandatory");
        return;
      }
      if (addressLine2 == "") {
        errorToast("addressLine2 is mandatory");
        return;
      }
      if (country == "") {
        errorToast("Country is mandatory");
        return;
      }
      if (name == "") {
        errorToast("Name is mandatory");
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
      let decoded = getDecodedToken()


      let obj = {
        userId: decoded.userId,
        city,
        state,
        landmark,
        addressLine1,
        addressLine2,
        country,
        name,
        companyName,
        pincode,
        phone,
        isDefault
      }
      let { data: res } = await addUserAddress(obj);
      if (res.message) {
        successToast(res.message);
        handleGetAddress()

      }
    }
    catch (err) {
      errorToast(err)
    }
  }


  const handleEditAddress = async () => {
    try {

      if (city == "") {
        errorToast("City is mandatory");
        return;
      }
      // if (state == "") {
      //   errorToast("State is mandatory");
      //   return;
      // }
      // if (landmark == "") {
      //   errorToast("Landmark is mandatory");
      //   return;
      // }
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
        errorToast("Name is mandatory");
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

      let decoded = getDecodedToken()
      let obj = {
        userId: decoded.userId,
        city,
        state,
        landmark,
        addressLine1,
        addressLine2,
        country,
        name,
        companyName,
        pincode,
        phone,
        isDefault
      }
      let { data: res } = await updateAddressById(selectedAddress._id, obj);
      if (res.message) {
        successToast(res.message);
        handleGetAddress()
        setIsEditActive(false)
      }
    }
    catch (err) {
      errorToast(err)
    }
  }


  useEffect(() => {
    handleGetProfileData()
    handleGetAddress()
  }, [])





  const handleToggleEdit = (item) => {
    setnewAddress(true)
    setSelectedAddress(item)
    setCity(item?.city)
    setState(item?.state)
    setLandmark(item?.landmark)
    setAddressLine1(item?.addressLine1)
    setAddressLine2(item?.addressLine2)
    setCountry(item?.country)
    setName(item?.name)
    setCompanyName(item?.companyName)
    setPincode(item?.pincode)
    setPhone(item?.phone)
    setIsDefault(item?.isDefault)
    setIsEditActive(true)
  }





  return (
    <div className="profile-page">
      <p className="fw-semibold mb-4">BASIC INFOMATION</p>
      <ul className="profile-info row gy-0 gy-md-3">
        <li className="col-12 col-md-6">
          <span>First Name:</span>&nbsp; {userObj.firstName}
        </li>
        <li className="col-12 col-md-6">
          <span>Mobile:</span>&nbsp; {userObj.phone}
        </li>
        <li className="col-12 col-md-6">
          <span>Last Name:</span>&nbsp; {userObj.lastName}
        </li>
        <li className="col-12 col-md-6">
          <span>Email:</span>&nbsp; {userObj.email}
        </li>
      </ul>
      <div className="d-flex align-items-center justify-content-between border-top border-bottom py-3 my-4">
        <p className="mb-0 fw-semibold">CUSTOMER ADDRESS BOOK</p>
        <button
          className="btn btn-hover btn-custom btn-green text-uppercase btn-sm py-2 px-4"
          onClick={() => setnewAddress(!newAddress)}
        >
          Add a New Address
        </button>
      </div>
      <ul className="address-box row gy-5">
        {address && address.length > 0 && address.map((item, i) => {
          // console.log(item)
          return (
            <li key={i} className={`col-12 col-sm-6 col-xxl-4 ${i > 2 && "mt-5"}`}>
              <div className="address-box-inner">
                <h6 className="poppin">{`${item.name} ${item.companyName ? `- ${item.companyName}` : ""} ${item.isDefault ? "(Default)" : ""}`}</h6>
                <p className="text-muted fs-15">
                  <address>{`${item.addressLine1}, ${item.addressLine2}, ${item.landmark}, ${item.city}, ${item.state}, ${item.country} - ${item.pincode}`}</address>
                </p>
                <p className="text-muted fs-15">
                  <address>Phone {`${item.phone}`}</address>
                </p>
                <div className="links">
                  <div className="icons" onClick={() => handleDeleteAddress(item._id)}>
                    <AiOutlineClose />
                  </div>
                  <div className="icons" onClick={() => handleToggleEdit(item)}>
                    <MdEdit />
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
      {newAddress && (
        <form className="form row mt-5">
          <div className="col-12">
            <p className="title fw-semibold">Add new address</p>
          </div>
          <div className="col-12 col-sm-6 mb-3">
            <label>
              Name
              <input type="text" onChange={(e) => setName(e.target.value)} value={name} className="form-control" />
            </label>
          </div>
          <div className="col-12 col-sm-6 mb-3">
            <label>
              Company name(optional)
              <input type="text" onChange={(e) => setCompanyName(e.target.value)} value={companyName} className="form-control" />
            </label>
          </div>
          <div className="col-12 mb-3">
            <label>
              Address
              <input type="text" onChange={(e) => setAddressLine1(e.target.value)} value={addressLine1} className="form-control" />
            </label>
          </div>
          <div className="col-12 mb-3">
            <label>
              Apartment, suite, etc. (optional)
              <input onChange={(e) => setAddressLine2(e.target.value)} value={addressLine2} type="text" className="form-control" />
            </label>
          </div>
          <div className="col-12 mb-3">
            <label>
              Landmark
              <input onChange={(e) => setLandmark(e.target.value)} value={landmark} type="text" className="form-control" />
            </label>
          </div>
          <div className="col-12 mb-3">
            <label>
              Country
              <select className="form-control"  onChange={(e) => setCountry(e.target.value)}  value={country}>
                        <option value=""> Please Select Country</option>
                        {
                            countryList && countryList.length > 0 && countryList.map(el =><option value={el.name.toLowerCase()}>{el.name}</option>)
                        
                        }
                      </select>
              {/* <input type="text" onChange={(e) => setCountry(e.target.value)} value={country} className="form-control" /> */}
            </label>
          </div>

          <div className="col-12 col-sm-4 mb-3">
            <label>
              City
              <input type="text" onChange={(e) => setCity(e.target.value)} value={city} className="form-control" />
            </label>
          </div>
          <div className="col-12 col-sm-4 mb-3">
            <label>
              State
              <input onChange={(e) => setState(e.target.value)} value={state} type="text" className="form-control" />

            </label>
          </div>
          <div className="col-12 col-sm-4 mb-3">
            <label>
              Postal / Zip Code
              <input type="text" onChange={(e) => setPincode(e.target.value)} value={pincode} className="form-control" />
            </label>
          </div>
          <div className="col-12 mb-0">
            <label>
              Phone
              <input type="tel" onChange={(e) => setPhone(e.target.value)} maxLength={10} value={phone} className="form-control" />
            </label>
          </div>
          <div className="col-12 mb-3">
            <div className="form-check mt-2">
              <label className="form-check-label">
                <input checked={isDefault} onChange={() => setIsDefault(!isDefault)} className="form-check-input" type="checkbox" value="" />
                Set as Default address
              </label>
            </div>
            {/* <div className="form-check mt-2">
              <label className="form-check-label">
                <input className="form-check-input" type="checkbox" value="" />
                Text me with news and offers
              </label>
            </div> */}
          </div>
          <div className="col-12">
            <button type="button" onClick={() => isEditActive ? handleEditAddress() : handleAddAddress()} className="btn btn-hover btn-custom btn-black btn-sm rounded-1 px-4 py-2 py-xl-3">
              Submit
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export default Profile;
