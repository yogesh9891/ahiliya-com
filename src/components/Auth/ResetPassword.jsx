import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import SocialBanner from "../Utility/SocialBanner";
import { resetPasword } from "../../services/User.service";
import { errorToast, successToast } from "../../utils/Toast";

function ResetPassword() {
const [password, setPassword] = useState("");
const [confirmPassword, setConfirmPassword] = useState("");
const [userId, setuserId] = useState("");
let params = useParams();
useEffect(() => {
if(params?.id){
  setuserId(params?.id);
console.log(params?.id,"params?._idparams?._id")
}
}, [params])

const handleSubmit = async () => {
  try {
    if(!password){
      errorToast('Please fill password')
      return 0;
    }

    if(!confirmPassword){
      errorToast('please fill password')
      return 0;
    }

    if(password !=confirmPassword ){
      errorToast('Confirm password not matched')
      return 0;
    }
    let obj ={
      password
    }
    let {data:res } =  await resetPasword(userId,obj);
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
                  <label className="mb-2">Password</label>
                  <input type="text" className="form-control" required value={password}  onChange={(e)=>setPassword(e.target.value)} />
                </div>

                <div className="col-12 mb-4">
                  <label className="mb-2">Confirm Password</label>
                  <input type="text" className="form-control" required  value={confirmPassword}  onChange={(e)=>setConfirmPassword(e.target.value)}/>
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

export default ResetPassword;
