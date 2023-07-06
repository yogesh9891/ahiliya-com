import React, { useEffect, useState } from "react";
import { AiFillCalendar } from "react-icons/ai";
import { FaUserAlt } from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom";
import { images } from "./Utility/Images";
import PageBanner from "./Utility/PageBanner";
import { getBlogBySlug } from "../services/Blog.service";
import { generateImageUrl } from "../services/url.service";
function BlogDetail() {
  let { slug } = useParams();
  const [blogDetail, setBlogDetail] = useState({});
  const navigate = useNavigate();

  const handleGetBlogBySlug = async (slug) => {
    try {
      let { data: res } = await getBlogBySlug(slug);
      if (res.data) {
        setBlogDetail(res.data);
      }
    } catch (err) {
      // alert(err?.message)
      navigate("/Blogs");
      console.error(err);
    }
  };

  useEffect(() => {
    handleGetBlogBySlug(slug);
  }, [slug]);

  return (
    <main>
      <PageBanner
        banner2
        img={generateImageUrl(blogDetail?.image)}
        title={blogDetail?.title}
        className="mb-2 mb-xl-5"
      >
        <ul className="blog-tags justify-content-start mt-0">
          <li className="fs-6 text-dark">
            <div className="icon pink">
              <FaUserAlt />
            </div>
            admin
          </li>
          <li className="fs-6 text-dark">
            <div className="icon pink">
              <AiFillCalendar />
            </div>
            {new Date(blogDetail?.createdAt).toLocaleString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </li>
        </ul>
        {/* <p>One of the best fashion gifts of the fashionable, industrial age, Georgette may be a springy, lightweight, translucent fabric distinguished by its strength and sturdiness as compared to other thin and fine fabrics. </p> */}
      </PageBanner>
      
      <section className="blog-detail mb-50">
        <div className="container">
          <div
            className="desp"
            dangerouslySetInnerHTML={{
              __html: blogDetail?.description,
            }}
          ></div>
        </div>
      </section>
    </main>
  );
}

export default BlogDetail;
