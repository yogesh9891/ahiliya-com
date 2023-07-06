import React, { useState } from "react";
import { useEffect } from "react";
import { ImStarEmpty, ImStarFull, ImStarHalf } from "react-icons/im";
import { RiDoubleQuotesR } from "react-icons/ri";
import { Link } from "react-router-dom";
import { getAlltestimonials } from "../services/Banner.service";
import { getGallery } from "../services/Gallery.service";
import { generateImageUrl } from "../services/url.service";
import { images } from "./Utility/Images";
import PageBanner from "./Utility/PageBanner";
import SocialBanner from "./Utility/SocialBanner";
import Modal from "react-modal";
import ReactPaginate from "react-paginate";
function FeedBack() {
  const [testimonailArr, settestimonialArr] = useState([]);

  const handleGettestimonials = async () => {
    try {
      let { data: res } = await getAlltestimonials("status=APPROVED");
      if (res.data) {
        // console.log(res.data);
        settestimonialArr(res.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    handleGettestimonials();
  }, []);

  const [testimonial, settestimonial] = useState({
    name:"",
    description:""
  });
  const [testimonialModal, settestimonialModal] = useState(false);

  const handleSetTestimonial = async (item) => {
 
    settestimonial({
      name:item.name,
      description:item?.comment
    })
       settestimonialModal(true)
}

  // =======================PAGINATION===========================================
  const [itemOffset, setItemOffset] = useState(0);

  // Simulate fetching items from another resources.
  // (This could be items from props; or items loaded in a local state
  // from an API endpoint with useEffect and useState)
  const itemsPerPage = 12;
  const endOffset = itemOffset + itemsPerPage;
  // console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  const currentItems = testimonailArr.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(testimonailArr.length / itemsPerPage);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % testimonailArr.length;
    // console.log(
    //   `User requested page number ${event.selected}, which is offset ${newOffset}`
    // );
    setItemOffset(newOffset);
  };
  // =======================PAGINATION===========================================


  return (
    <main>
      <PageBanner
        banner4
        img={images.slide2}
        title="Feedback"
        text="know what people say about us"
      />
      <section className="testimonial-page mb-50 px-lg-5">
        <div className="container-fluid">
          <div className="row">
            {currentItems &&
              currentItems.length > 0 &&
              currentItems?.map((testtimonial, i) => {
                return (
                  <div className="col-12 col-md-4" key={i}>
                    <div className="testimonials">
                      <div className="quote">
                        <RiDoubleQuotesR />
                      </div>
                      <h5 className="poppin mb-2 pink fw-semibold">{testtimonial?.name}</h5>
                      <p>
                        {testtimonial?.comment.substring(0, 200)}... <br />
                        <Link
                      to='#'
                        className="pink fw-semibold"
                        onClick={() => handleSetTestimonial(testtimonial)}
                      >
                        Read More
                      </Link>
                      </p>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </section>

      <section className="product-pagination mb-50">
        <div className="container">
          <ReactPaginate
            breakLabel="..."
            nextLabel="next >"
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={pageCount}
            previousLabel="< previous"
            renderOnZeroPageCount={null}
          />
        </div>
      </section>

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
                onClick={() => settestimonialModal(false)}
                aria-label="Close"
              ></button>
              <div className="row gx-0">
                <div className="col-12 col-xl-12">
                  <div className="home-popup-content">
                    {/* <h4 className="mb-0 poppin fw-bold">{testimonial?.name}</h4> */}
                    <p className="green designation fw-semibold mb-0">{testimonial?.name}</p>
                    <div className="content">
                      <p className="fs-15">
                       {testimonial?.description}
                      </p>
                    </div>
                  </div>
                </div>
                {/* <div className="col-12 col-xl-5">
                  <div className="right h-100">
                    <img
                      src={images.about_left}
                      alt=""
                      className="w-100 img-cover"
                    />
                  </div>
                </div> */}
              </div>
            </div>
      </Modal>
    </main>
  );
}

export default FeedBack;
