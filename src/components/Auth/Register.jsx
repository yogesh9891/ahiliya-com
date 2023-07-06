import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../../services/User.service";
import { errorToast, successToast } from "../../utils/Toast";
import SocialBanner from "../Utility/SocialBanner";

function Register() {
  const [type, settype] = useState("password");
  const [showPassword, setshowPassword] = useState(false);
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    try {
      if (firstName == "") {
        errorToast("First Name cannot be empty");
        return;
      }
      if (lastName == "") {
        errorToast("Last Name cannot be empty");
        return;
      }
      if (phone == "") {
        errorToast("Phone Number cannot be empty");
        return;
      }
      if (phone.length != 10) {
        errorToast("Not a valid Phone Number");
        return;
      }
      if (email == "") {
        errorToast("Email cannot be empty");
        return;
      }
      if (password == "") {
        errorToast("Password cannot be empty");
        return;
      }

      let obj = {
        firstName,
        lastName,
        phone,
        email,
        password,
      };
      let { data: res } = await registerUser(obj);
      // console.log(res, "res");
      if (res.message) {
        successToast(res.message);
        navigate(-1);
        // alert(res.message)
      }
    } catch (err) {
      errorToast(err);
    }
  };

  const handlePassword = () => {
    type === "password" ? settype("text") : settype("password");
    setshowPassword(!showPassword);
  };
  return (
    <main>
      <section className="login ptb-50">
        <div className="container">
          <div className="title-section text-center mb-4">
            <h1 className="heading heading-decor mb-0">Create Account</h1>
          </div>
          <div className="row">
            <div className="col-12 col-md-10 col-lg-6 col-xxl-4 mx-auto">
              <form action="/Account" className="row form">
                <div className="col-12 mb-4">
                  <label className="mb-2">FIRST NAME</label>
                  <input
                    onChange={(e) => setFirstName(e.target.value)}
                    value={firstName}
                    type="text"
                    className="form-control"
                    required
                  />
                </div>
                <div className="col-12 mb-4">
                  <label className="mb-2">LAST NAME</label>
                  <input
                    onChange={(e) => setLastName(e.target.value)}
                    value={lastName}
                    type="text"
                    className="form-control"
                  />
                </div>
                <div className="col-12 mb-4">
                  <label className="mb-2">EMAIL</label>
                  <input
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    type="email"
                    className="form-control"
                    required
                  />
                </div>
                <div className="col-12 mb-4">
                  <label className="mb-2">PHONE</label>
                  <input
                    onChange={(e) => setPhone(e.target.value)}
                    value={phone}
                    maxLength={10}
                    type="tel"
                    className="form-control"
                    required
                  />
                </div>
                <div className="col-12 mb-4">
                  <label className="mb-2">PASSWORD</label>
                  <div className="search-form">
                    <div className="form-control">
                      <input
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        type={type}
                        className="border-0"
                        required
                      />
                      <div className="icon pointer px-3" onClick={handlePassword}>
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-12 text-center pt-1">
                  <button
                    onClick={() => handleRegister()}
                    type="button"
                    className="btn btn-hover btn-custom btn-green w-100"
                  >
                    CREATE
                  </button>
                  <div className="mt-3">
                    <Link to="/Login" className="text-muted btn p-0 fs-6">
                      Login to existing account
                    </Link>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      <SocialBanner />
    </main>
  );
}

export default Register;
