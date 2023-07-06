import React, { useState } from "react";
import { Link } from "react-router-dom";
import SocialBanner from "../Utility/SocialBanner";
import { errorToast, successToast } from "../../utils/Toast";
import { foragetPasword } from "../../services/User.service";

function ForgetPasword() {

  const [email, setEmail] = useState("");


  const handleSubmit = async () => {
    try {
      if(!email){
        errorToast('please fill Email')
        return 0;
      }
      let obj ={
        email
      }
      let {data:res } =  await foragetPasword(obj);
      if(res.success) {
        successToast(res.message)
      }
    } catch (error) {
        errorToast(error)
    }
 
  }

  return (
    <main>
      <section className="login ptb-50">
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-10 col-lg-6 col-xxl-4 mx-auto">
              <div className="title-section text-center mb-4">
                <h1 className="heading heading-decor mb-0">
                  Reset your password
                </h1>
              </div>
              <form action="/Login" className="row form">
                <div className="col-12 mb-4">
                  <label className="mb-2">EMAIL</label>
                  <input type="email" className="form-control"  onChange={(e)=>setEmail(e.target.value)}   />
                </div>
                <div className="col-12 text-center pt-1">
                  <button
                    type="button"
                    className="btn btn-hover btn-custom btn-green px-4"
                    onClick={()=>handleSubmit()}
                  >
                    SUBMIT
                  </button>
                  <div className="mt-3">
                    <Link to="/Login" className="text-muted btn p-0 fs-6">
                      Cancel
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

export default ForgetPasword;
