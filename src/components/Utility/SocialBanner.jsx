import React from 'react';
import { Link } from 'react-router-dom';
import { images } from './Images';

function SocialBanner({className}) {
    return ( 
        <section className={`social-banner ptb-50 mt-50 ${className ? className:''}`}>
        <div className="container-fluid">
          <div className="row">
            <div className="col-12 col-md-4">
              <Link to='/FAQ'>
                <img
                  src={images.faq_img}
                  className="w-100 img-contain"
                  alt=""
                />
              </Link>
            </div>
            <div className="col-12 col-md-4">
              <Link to='/Blogs'>
                <img
                  src={images.blogs_img}
                  className="w-100 img-contain"
                  alt=""
                />
              </Link>
            </div>
            <div className="col-12 col-md-4">
              <a href='https://api.whatsapp.com/send?phone=919289370407' target='_blank'>
                <img
                  src={images.whatsapp_offer}
                  className="w-100 img-contain"
                  alt=""
                />
              </a>
            </div>
          </div>
        </div>
      </section>
     );
}

export default SocialBanner;