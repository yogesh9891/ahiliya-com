import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";
import { getAllInstagrmaPost } from "../../services/Banner.service";
import { images } from "./Images";

function Instagram() {

  const [instagramPostArr, setinstagramPostArr] = useState([]);

  const insta_slider = {
    0: {
      slidesPerView: 2,
    },
    768: {
      slidesPerView: 3,
    },
    1200: {
      slidesPerView: 4,
    },
    1400: {
      slidesPerView: 5,
    },
  };

  useEffect(() => {
    // handleGetInstagramPost()
  }, [])

  const handleGetInstagramPost = async () => {
    try {
      let { data: res } = await getAllInstagrmaPost();
      if (res.data) {
        setinstagramPostArr(res.data);
      }
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <section className="insta-sec mb-0">
      <div className="container-fluid p-0">
        <div className="title-section mb-0 text-center">
          <h1 className="heading heading-decor mb-0">Follow us on Instagram</h1>
          {/* <Link to="/" className="btn green fw-bold fs-5 times-roman position-static p-0">
            @aahilya_artisanstoyou
          </Link> */}
        </div>
        <div class="elfsight-app-8a58bab9-e6d6-424c-8af1-b750df4c3bb4"></div>
        {/* <div data-mc-src="7bd79a5a-2c6d-49c2-a902-e29188bbfda8#instagram"></div> */}
        {/* <Swiper
          slidesPerView={5}
          spaceBetween={0}
          speed={2000}
          loop
          autoplay={true}
          modules={[Autoplay]}
          className="h-100"
          breakpoints={insta_slider}
        >

          {
            instagramPostArr && instagramPostArr.length > 0 ? (
              instagramPostArr.map((post) =>
              <SwiperSlide>
              <div className="printing-blocks-box instagram-post">
                <div className="image">
                  <img src="https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/316133760_230087669348953_5795955239326499281_n.jpg?stp=c0.420.1080.1080a_dst-jpg_e35_s640x640_sh0.08&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=101&_nc_ohc=FcGW-VB9Ph8AX8ANpln&edm=AOQ1c0wBAAAA&ccb=7-5&oh=00_AfAW7JT6_PBJFmUnZ4XHYvHgNssSFgLnKQQ1UlelLUFuDw&oe=637CEB96&_nc_sid=8fd12b" alt="w-100 img-cover" />
                </div>
              </div>
            </SwiperSlide>
              )
          
            ) :  (

              <>
              <SwiperSlide>
         <div className="printing-blocks-box instagram-post">
           <div className="image">
             <img src={images.insta1} alt="w-100 img-cover" />
           </div>
         </div>
       </SwiperSlide>
       <SwiperSlide>
         <div className="printing-blocks-box instagram-post">
           <div className="image">
             <img src={images.insta2} alt="w-100 img-cover" />
           </div>
         </div>
       </SwiperSlide>
       <SwiperSlide>
         <div className="printing-blocks-box instagram-post">
           <div className="image">
             <img src={images.insta3} alt="w-100 img-cover" />
           </div>
         </div>
       </SwiperSlide>
       <SwiperSlide>
         <div className="printing-blocks-box instagram-post">
           <div className="image">
             <img src={images.insta4} alt="w-100 img-cover" />
           </div>
         </div>
       </SwiperSlide>
       <SwiperSlide>
         <div className="printing-blocks-box instagram-post">
           <div className="image">
             <img src={images.insta5} alt="w-100 img-cover" />
           </div>
         </div>
       </SwiperSlide>
       </>
            )
          }
       
        </Swiper> */}
      </div>
    </section>
  );
}

export default Instagram;
