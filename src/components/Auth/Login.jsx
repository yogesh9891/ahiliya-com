import React, { useContext, useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { AuthoriseContext, CartContext } from "../../App";
import { getToken, loginUser, setToken } from "../../services/User.service";
import { errorToast, successToast } from "../../utils/Toast";
import SocialBanner from "../Utility/SocialBanner";
import { addLocalCartToUser } from "../../services/UserCart.service";
import { getLocalCart ,clearLocalCart} from "../../services/localCart";

function Login() {
  const [type, settype] = useState("password");
  const [showPassword, setshowPassword] = useState(false);
  const [isAuthorized, setIsAuthorized] = useContext(AuthoriseContext);
  const [carts, setCarts] = useContext(CartContext);


  const handlePassword = () => {
    type === "password" ? settype("text") : settype("password");
    setshowPassword(!showPassword);
  };
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if(getToken()){
      navigate('/Account')
    }
    
  }, []);
  const handleSubmit = async () => {
    try {
      if (email == "") {
        errorToast("Email cannot be empty");
        return;
      }
      if (password == "") {
        errorToast("Password cannot be empty");
        return;
      }

      let obj = {
        email,
        password,
      };
      let { data: res } = await loginUser(obj);
      if (res.message) {
        // console.log(res);
        // console.log(res.message);
        setToken(res.token);
        successToast(res.message);
        setIsAuthorized(true);
        
        // let { data: respon } = await getLocalCart();
        // if(respon.data){
        //   let { data: rescart }=  await addLocalCartToUser(respon);
        //   setCarts(rescart.length)
        //   clearLocalCart();
           
        // }
      
        navigate(-1);
      }
    } catch (err) {
      errorToast(err);
    }
  };

  return (
    <main>
      <section className="login ptb-50">
        <div className="container">
          <div className="title-section text-center mb-4">
            <h1 className="heading heading-decor mb-0">Login</h1>
          </div>
          <div className="row">
            <div className="col-12 col-md-10 col-lg-6 col-xxl-4 mx-auto">
              <form action="/Account" className="row form">
                <div className="col-12 mb-4">
                  <label className="mb-2">EMAIL</label>
                  <input
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    type="email"
                    className="form-control"
                  />
                </div>
                <div className="col-12 mb-4">
                  <div className="d-flex align-items-center justify-content-between mb-2">
                    <label className="w-auto">PASSWORD</label>
                    <Link to="/ForgetPasword" className="text-muted btn p-0">
                      Forgot password?
                    </Link>
                  </div>
                  <div className="search-form">
                    <div className="form-control">
                      <input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type={type}
                        className="border-0"
                      />
                      <div className="icon pointer px-3" onClick={handlePassword}>
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-12 text-center pt-1">
                  <button
                    onClick={() => handleSubmit()}
                    type="button"
                    className="btn btn-hover btn-custom btn-green w-100"
                  >
                    SIGN IN
                  </button>
                  <div className="mt-3">
                    <Link to="/Register" className="text-muted btn p-0 fs-6">
                      Create account
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

export default Login;
