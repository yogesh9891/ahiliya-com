import React, { useEffect, useState } from "react";
import { images } from "./Utility/Images";
import { Autoplay, Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";
import PageBanner from "./Utility/PageBanner";
import Instagram from "./Utility/Instagram";
import { Link } from "react-router-dom";
import Modal from "react-modal";
import { getTeams } from "../services/Banner.service";
import { generateImageUrl } from "../services/url.service";

function About() {
  const [testimonial, settestimonial] = useState({
    name: "",
    description: ""
  });
  const [testimonialModal, settestimonialModal] = useState(false);


  const [testimonailArr, settestimonialArr] = useState([]);

  const handleSetTestimonial = async (item) => {
 
    settestimonial({
      name:item.name,
      description:item?.description,
      post:item?.post,
      image:item?.image
    })
       settestimonialModal(true)
}
  const handleGettestimonials = async () => {
    try {
      let { data: res } = await getTeams();
      if (res.data) {
        // console.log(res.data);
        settestimonialArr(res.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect (() => {
    handleGettestimonials();
  }, []);

  const our_team = {
    0: {
      slidesPerView: 2,
    },
    768: {
      slidesPerView: 2,
      spaceBetween: 10,
    },
    992: {
      slidesPerView: 3,
      spaceBetween: 10,
    },
    1200: {
      slidesPerView: 3,
    },
    1600: {
      slidesPerView: 4,
    },
  };

  return (
    <main>
      <PageBanner
        banner1
        img={images.about_bg}
        title="About Us"
        text="This is our story"
      />

      <section className="about-summary mb-50">
        <div className="container-fluid px-lg-5">
          <div className="row">
            <div className="col-12 col-xl-5 col-xxl-4">
              <img
                src={images.about_left}
                alt=""
                className="w-100 img-cover h-100"
              />
            </div>
            <div className="col-12 col-xl-7 col-xxl-8">
              <div className="about-summary-right">
                <div className="title-section">
                  <h1 className="heading">Our Story</h1>
                </div>
                <p>
                  We started Aahilya to help provide a source of income for the
                  rural craftspeople who have been effected by the COVID-19
                  Virus and lockdown. We want to encourage people to buy the
                  handmade and handwoven products made by the artisans who have
                  lost their supply network .
                </p>
                <p>
                  For the past 10 years my husband and I have been working in
                  the travel industry and focused on delivering textile and
                  craft holidays by visiting rural villages in different parts
                  of India. Each state has their own unique crafts with the
                  beautiful patterns and designs inspiring visitors. Indian
                  textile patterns are interconnected with local architecture,
                  traditions and culture making them unique and historically
                  significant. The hardworking craftspeople are the guardians of
                  important and varied skills and their current ways of living
                  And working are under threat. Our motive is to help provide a
                  sales opportunity, showcase their work and ensure their
                  incomes, so that their skills can continue and be enjoyed by a
                  wider audience.
                </p>
                <p>
                  We will work as a link between artisans and yourselves to
                  deliver good quality handmade authentic genuine products.
                </p>
                <p className="mb-0">
                  <b>Namaste</b>{" "}
                  <span className="emoji" role="img" aria-label="Namaste">
                    🙏
                  </span>
                </p>
                <p>
                  <b>Team Aahilya</b>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-50 fabric-service">
        <div className="container">
          <div className="title-section text-center mb-4">
            <h1 className="heading heading-decor">Fabric Service</h1>
          </div>
          <ul className="row gx-xxl-5 gy-xxl-5 gy-4">
            <li className="col-6 col-md-6 col-xl-4 text-center">
              <div className="image">
                <img src={images.about_fabric1} alt="" className="w-100" />
              </div>
              <h4 className="poppin mt-4">Customized On Demand</h4>
              <p>
                Waterproof, fireproof and other functions can be added according
                to your needs, and of course the softness, color and pattern can
                be customized.
              </p>
            </li>
            <li className="col-6 col-md-6 col-xl-4 text-center">
              <div className="image">
                <img src={images.about_fabric2} alt="" className="w-100" />
              </div>
              <h4 className="poppin mt-4">Free Sample</h4>
              <p>
                Real product is worth a thousand words. We want you to feel the
                quality of UR's products before you make a purchase, so we are
                happy to provide free samples.
              </p>
            </li>
            <li className="col-6 col-md-6 col-xl-4 text-center">
              <div className="image">
                <img src={images.about_fabric3} alt="" className="w-100" />
              </div>
              <h4 className="poppin mt-4">Wholesale Price</h4>
              <p>
                UR understands the basis of wholesale, the streak of success,
                and affordability associated with it. We at UR offer multiple
                discounts on bulk textile orders.
              </p>
            </li>
          </ul>
        </div>
      </section>
{/* 
      <section className="milestone py-5 mb-50">
        <div className="container">
          <Swiper
            slidesPerView={1}
            spaceBetween={0}
            speed={3000}
            loop
            autoplay={{ pauseOnMouseEnter: true, disableOnInteraction: false }}
            modules={[Autoplay]}
          >
            <SwiperSlide>
              <div className="milestone-box col-12 col-md-10 col-lg-8 col-xl-7 mx-auto">
                <div className="title-section text-center mb-0">
                  <h1 className="heading mb-0">Milestones</h1>
                </div>
                <h1 className="mt-5 mb-4">
                  <b>2018</b>
                </h1>
                <p>
                  Pitched the idea on Shark Tank India Season 1 to all 7 sharks.
                </p>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="milestone-box col-12 col-md-10 col-lg-8 col-xl-7 mx-auto">
                <div className="title-section text-center mb-0">
                  <h1 className="heading mb-0">Milestones</h1>
                </div>
                <h1 className="mt-5 mb-4">
                  <b>2019</b>
                </h1>
                <p>
                  Pitched the idea on Shark Tank India Season 1 to all 7 sharks.
                </p>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="milestone-box col-12 col-md-10 col-lg-8 col-xl-7 mx-auto">
                <div className="title-section text-center mb-0">
                  <h1 className="heading mb-0">Milestones</h1>
                </div>
                <h1 className="mt-5 mb-4">
                  <b>2020</b>
                </h1>
                <p>
                  Pitched the idea on Shark Tank India Season 1 to all 7 sharks.
                </p>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </section> */}

      {/* <section className="choose-us mb-50">
        <div className="container">
          <div className="title-section text-center mb-4">
            <h1 className="heading heading-decor">Why choose us</h1>
          </div>
          <div className="row align-items-center gx-5">
            <div className="col-12 col-lg-8">
              <h3 className="poppin">Heading</h3>
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged.
              </p>
            </div>
            <div className="col-12 col-lg-4 text-center">
              <img src={images.choose1} alt="" className="w-100 img-contain" />
            </div>
            <div className="col-12 col-lg-4 text-center">
              <img src={images.choose2} alt="" className="w-100 img-contain" />
            </div>
            <div className="col-12 col-lg-8">
              <h3 className="poppin">Heading</h3>
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged.
              </p>
            </div>
            <div className="col-12 col-lg-8">
              <h3 className="poppin">Heading</h3>
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged.
              </p>
            </div>
            <div className="col-12 col-lg-4 text-center">
              <img src={images.choose3} alt="" className="w-100 img-contain" />
            </div>
          </div>
          <div className="mt-4 text-center">
            <h1 style={{ color: "#F05D6B" }}>
              “You’re not just a Customer, you’re family to us.”
            </h1>
          </div>
        </div>
      </section> */}

      <section className="mb-50">
        <div className="container">
          <div className="title-section text-center mb-4">
            <h1 className="heading heading-decor">Our Team</h1>
          </div>
          <Swiper
            slidesPerView={4}
            spaceBetween={15}
            speed={2000}
            loop
            modules={[Autoplay, Navigation]}
            autoplay={false}
            navigation
          breakpoints={our_team}
          >
            {
              testimonailArr && testimonailArr.length > 0 ? (
                testimonailArr.map((team, i) => (<SwiperSlide>
                  <div className="our-team">
                    <div className="image">
                      <Link to="#">
                      <img src={generateImageUrl(team.image)} alt="" />
                      </Link>
                    </div>
                    <Link
                      to="#"
                      className="content"
                    >
                      <h5 className="poppin mb-0">{team.name}</h5>
                      <p className="designation green fw-semibold fst-italic">
                      {team?.description.substring(0, 200)}... <br />
                      <p
                  
                        className="pink fw-semibold"
                        onClick={() => handleSetTestimonial(team)}
                      >
                        Read More
                      </p>
                      </p>
                    </Link>
                  </div>
                </SwiperSlide>
                ))
               )
                : (
                  <>
                    <SwiperSlide>
                      <div className="our-team">
                        <div className="image">
                          <Link to="#">
                            <img src={images.about_bg} alt="" />
                          </Link>
                        </div>
                        <Link
                          to="#"
                          className="content"
                        >
                          <h5 className="poppin mb-0">Name</h5>
                          <p className="designation green fw-semibold fst-italic">
                            Designation
                          </p>
                        </Link>
                      </div>
                    </SwiperSlide>
                    <SwiperSlide>
                      <div className="our-team">
                        <div className="image">
                          <Link to="#">
                            <img src={images.about_bg} alt="" />
                          </Link>
                        </div>
                        <Link
                          to="#"
                          className="content"
                        >
                          <h5 className="poppin mb-0">Name</h5>
                          <p className="designation green fw-semibold fst-italic">
                            Designation
                          </p>
                        </Link>
                      </div>
                    </SwiperSlide>
                 
                  </>
                )
            }


          </Swiper>
        </div>
      </section>

      <section
        className="aahilya-way ptb-50 mb-50"
        style={{ backgroundColor: "#EFE0D1" }}
      >
        <div className="container-fluid px-lg-5">
          <div className="title-section text-center mb-4">
            <h1 className="heading heading-decor">
              The Aahilya way Since 2022
            </h1>
          </div>
          <div className="row gx-2 gy-2 gx-sm-4 gy-sm-4">
            <div className="col-6 col-md-6 col-xxl-3">
              <div className="aahilya-way-box">
                <div className="image shape-image bg-white">
                  <div className="icon">
                    <img src={images.icon6} alt="" />
                  </div>
                  <h4 className="poppin">With Love</h4>
                  <p>
                    All products are personally sourced with care and respect,
                    for the artisan, craftform and you. Pyaar se dekho and pyaar
                    se khareedo.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-6 col-md-6 col-xxl-3">
              <div className="aahilya-way-box">
                <div className="image shape-image bg-white">
                  <div className="icon">
                    <img src={images.icon7} alt="" />
                  </div>
                  <h4 className="poppin">Earth-Friendly</h4>
                  <p>
                    Crafts are hand-made and by nature organic, environmentally
                    friendly. By supporting local, you are creating a
                    sustainable future.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-6 col-md-6 col-xxl-3">
              <div className="aahilya-way-box">
                <div className="image shape-image bg-white">
                  <div className="icon">
                    <img src={images.icon8} alt="" />
                  </div>
                  <h4 className="poppin">Inclusive</h4>
                  <p>
                    We prioritise bridging the gap, 70% of our workforce is
                    local Gwalior women, who ensure itokri stays grounded.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-6 col-md-6 col-xxl-3">
              <div className="aahilya-way-box">
                <div className="image shape-image bg-white">
                  <div className="icon">
                    <img src={images.icon9} alt="" />
                  </div>
                  <h4 className="poppin">Earth-Artisan-First</h4>
                  <p>
                    We partner with and support 500+ artisan families and their
                    legacy in craft. They give us the confidence to bring these
                    products to you.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
{/* 
      <section className="creation-process mb-50">
        <div className="container">
          <div className="title-section text-center mb-4">
            <h1 className="heading heading-decor">The Process of Creation</h1>
          </div>
          <div className="row gy-4 gx-xxl-5 gy-xxl-5">
            <div className="col-6 col-md-6 col-xl-4">
              <div className="creation-process-box">
                <div
                  className="image"
                  style={{
                    backgroundColor: "#D0D6EA",
                    borderRadius: "80px 20px 80px 80px",
                  }}
                >
                  <img
                    src={images.process1}
                    alt=""
                    className="w-100 img-contain"
                  />
                </div>
                <p>Selection from the wide range of available designs</p>
              </div>
            </div>
            <div className="col-6 col-md-6 col-xl-4">
              <div className="creation-process-box">
                <div
                  className="image"
                  style={{
                    backgroundColor: "#EAD0E4",
                    borderRadius: "20px 20px 80px 80px",
                  }}
                >
                  <img
                    src={images.process2}
                    alt=""
                    className="w-100 img-contain"
                  />
                </div>
                <p>Selection from the wide range of quality &amp; sizes</p>
              </div>
            </div>
            <div className="col-6 col-md-6 col-xl-4">
              <div className="creation-process-box">
                <div
                  className="image"
                  style={{
                    backgroundColor: "#EAD0D0",
                    borderRadius: "20px 80px 80px 80px",
                  }}
                >
                  <img
                    src={images.process3}
                    alt=""
                    className="w-100 img-contain"
                  />
                </div>
                <p>Hooray !! Get it delivered easily!</p>
              </div>
            </div>
          </div>
        </div>
      </section> */}

      <Instagram />

      <Modal
        isOpen={testimonialModal}
        onRequestClose={() => settestimonialModal(false)}
        className="custom-modal"
        bodyOpenClassName="custom-modal-body"
        overlayClassName="custom-modal-overlay"
        htmlOpenClassName="custom-modal-html"
        portalClassName="custom-modal-parent"
        contentLabel="Example Modal"
      >
        <div className="popup-modal team-modal">
          <button
            type="button"
            className="btn-close pointer"
            aria-label="Close"
            onClick={() => settestimonialModal(false)}
          ></button>
          <div className="row gx-0">
            <div className="col-12 col-xl-7">
              <div className="home-popup-content">
                <h4 className="mb-0 poppin fw-bold">{testimonial?.name}</h4>
                <p className="green designation fw-semibold mb-0">Designation</p>
                <div className="content">
                  <p className="fs-15">
                  {testimonial?.description}
                  </p>
                </div>
              </div>
            </div>
            <div className="col-12 col-xl-5">
              <div className="right h-100">
                <img
                     src={generateImageUrl(testimonial.image)} alt=""
                  className="w-100 img-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </Modal>


    </main>
  );
}

export default About;
