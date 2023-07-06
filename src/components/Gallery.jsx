import React, { useState } from "react";
import { useEffect } from "react";
import ReactPaginate from "react-paginate";
import { getGallery } from "../services/Gallery.service";
import { generateImageUrl } from "../services/url.service";
import { images } from "./Utility/Images";
import PageBanner from "./Utility/PageBanner";
import SocialBanner from "./Utility/SocialBanner";

function Gallery() {
  const [galleryArr, setGalleryArr] = useState([]);

  const handleGetGallery = async () => {
    try {
      let { data: res } = await getGallery();
      if (res.data) {
        // console.log(res.data);
        setGalleryArr(res.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    handleGetGallery();
  }, []);

    // =======================PAGINATION===========================================
    const [itemOffset, setItemOffset] = useState(0);

    // Simulate fetching items from another resources.
    // (This could be items from props; or items loaded in a local state
    // from an API endpoint with useEffect and useState)
    const itemsPerPage = 12;
    const endOffset = itemOffset + itemsPerPage;
    // console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    const currentItems = galleryArr.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(galleryArr.length / itemsPerPage);
  
    // Invoke when user click to request another page.
    const handlePageClick = (event) => {
      const newOffset = (event.selected * itemsPerPage) % galleryArr.length;
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
        title="Gallery"
        text="Hello! Welcome to aahilya photo gallery with creative &amp; unique style"
      />
      <section className="gallery-page mb-50">
        <div className="container-fluid px-lg-5">
          <ul className="row g-3 justify-content-center">
            {currentItems &&
              currentItems.length > 0 &&
              currentItems?.map((el, i) => {
                return (
                  <li key={i} className="col-12 col-md-6 col-lg-4 col-xl-3">
                    <div
                      className="gallery-page-inner p-0"
                      // data-bs-toggle="modal"
                      // data-bs-target="#gallery-video"
                    >
                      <div className="image">
                        <img src={generateImageUrl(el?.imageUrl)} alt="" />
                      </div>
                    </div>
                  </li>
                );
              })}
          </ul>
        </div>
      </section>

      <SocialBanner />

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

      <div
        className="modal fade"
        id="gallery-video"
        tabIndex="-1"
        aria-labelledby="gallery-videoLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-body popup-modal p-0">
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
              <iframe
                width="100%"
                height="auto"
                src="https://www.youtube.com/embed/w6JV3RQCt0I"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Gallery;
