import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getTestimonialById } from "../services/Banner.service";
import { images } from "./Utility/Images";
import PageBanner from "./Utility/PageBanner";

function SingleReview() {

  const params = useParams()
  const [testimonialObj, settestimonialObj] = useState();
    




  useEffect(() => {
    handleGetNameById()
  }, [params])

  const handleGetNameById = async () => {
    try {
      let { data: res } = await getTestimonialById(params.id)
      if (res.data) {
        // console.log(res.data)
        settestimonialObj(res.data)
      }
    }
    catch (err) {
      console.error(err)
    }
  }


  useEffect(() => {
  }, [params])




  return (
    <main>
      <PageBanner
        banner3
        cols="col-lg-6"
        img={images.product1}
        title={"Client Review"}
        
      />
      <section className="mb-50 subcategory">
        <div className="container-fluid px-lg-5">
        Name: <b> {testimonialObj?.name}</b>
                <p>
                    {testimonialObj?.comment}
                </p>
        </div>
      </section>

    </main>
  );
}

export default SingleReview;
