import React from "react";
import { Link } from "react-router-dom";
import { images } from "./Utility/Images";
import PageBanner from "./Utility/PageBanner";
import SocialBanner from "./Utility/SocialBanner";
import WishlistTable from "./WishlistTable";

function Wishlist() {
  return (
    <main>
      <PageBanner banner4 title="Wishlist">
        <Link to="/Product-Detail" className="btn btn-hover btn-custom">
          Continue Shopping
        </Link>
      </PageBanner>
      <section className="wishlist mb-50">
        <div className="container-fluid">
          <WishlistTable />
        </div>
      </section>

      <SocialBanner className='border-0' />
    </main>
  );
}

export default Wishlist;
