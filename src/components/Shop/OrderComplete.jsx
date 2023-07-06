import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { images } from "../Utility/Images";
import SocialBanner from "../Utility/SocialBanner";
import { getOrderIdSequence } from "../../utils/country";

function OrderComplete() {

  const params = useParams();
  const [orderId, setOrderId] = useState(0);
  useEffect(() => {
   if(params && params?.id){
     setOrderId(parseInt(params?.id))
   }
  }, [params])
  
  return (
    <main>
      <section className="ptb-50 order-complete">
        <div className="container">
          <div className="row text-center">
            <div className="col-12 col-md-8 col-lg-6 mx-auto">
              <h2>
                Your order has been received
                <span className="emoji" role="img">
                  🥳
                </span>
              </h2>
              <img src={images.party} alt="" className="mt-4 mb-5" />
              <h5>Thank you for your purchase!</h5>
              <p className="mb-0 mt-4">
                Your order ID is&nbsp;:&nbsp;
                <span className="green fw-semibold">{getOrderIdSequence(parseInt(orderId))}</span>
              </p>
              <p>
                You will receive an order conhrmation email with details of your
                order.
              </p>
              <Link to='/Products' className="btn btn-hover btn-custom btn-green rounded btn-lg py-2 px-4">
              Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </section>

      <SocialBanner />
    </main>
  );
}

export default OrderComplete;
