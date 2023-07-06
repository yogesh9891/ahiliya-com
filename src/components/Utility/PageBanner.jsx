import React from "react";

function PageBanner({
  img,
  title,
  text,
  banner1,
  banner2,
  banner3,
  banner4,
  children,
  cols,
  className,
}) {
  return (
    <>
      {banner1 && (
        <section
          className="page-banner ptb-50 mb-50"
          style={{ backgroundImage: `url(${img})` }}
        >
          <div className="container">
            <div className="main-slider-inner">
              <div
                className={`main-slider-box col-12 ${
                  cols ? cols : " col-lg-5"
                }`}
              >
                <div className="title-section mb-0">
                  <h1 className="heading text-white">{title}</h1>
                  {text && <p>{text}</p>}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
      {banner2 && (
        <section className={`page-banner2 ${className ? className : "mb-50"}`}>
          <div className="row g-0 align-items-center">
            <div className="col-12 col-xl-6">
              <img src={img} alt="" className="left w-100 img-cover" />
            </div>
            <div className="col-12 col-xl-6">
              <div className="page-banner2-content">
                <div className="container">
                  <div className="title-section">
                    <h3 className="poppin">{title}</h3>
                    {text && <p>{text}</p>}
                  </div>
                  {children}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
      {banner3 && (
        <div className="container-fluid px-lg-5">
          <section
            className="page-banner3 mb-5 mt-5"
            style={{ backgroundImage: `url(${img})` }}
          >
            <div className="w-100">
              <div className={`box mx-auto col-12 ${cols ? cols : "col-lg-5"}`}>
                <div className="title-section">
                  <h1 className="heading text-white">{title}</h1>
                  {text && <p>{text}</p>}
                </div>
                {children}
              </div>
            </div>
          </section>
        </div>
      )}
      {banner4 && (
        <section
          className={`page-banner4 h-auto mt-5 shadow-none ${
            className ? className : "mb-5"
          }`}
        >
          <div className="container-fluid px-lg-5">
            <div className="col-12 col-md-8 col-lg-6 col-xxl-3 mx-auto text-center">
              <div className="title-section">
                <h1 className="heading">{title}</h1>
                {text && <p>{text}</p>}
              </div>
              {children}
            </div>
          </div>
        </section>
      )}
    </>
  );
}

export default PageBanner;
