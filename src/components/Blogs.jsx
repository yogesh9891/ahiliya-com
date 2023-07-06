import React, { useEffect, useState } from "react";
import { AiFillCalendar } from "react-icons/ai";
import { FaUserAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import Select from "react-select";
import { images } from "./Utility/Images";
import PageBanner from "./Utility/PageBanner";
import SocialBanner from "./Utility/SocialBanner";
import { generateImageUrl } from "../services/url.service";

import { getBlogAllCategories,getBlogAll } from "../services/Blog.service";

const BlogBox = (pros) => {

let {singleBlog} = pros;
  // console.log(singleBlog,"singleBlog")
  return (
    <div className="blog-box">
      <div className="image shape-image">
        <Link to={`/Blog-Detail/${singleBlog.slug}`}>
        <img  src={generateImageUrl(singleBlog.image)} alt=""   />
        </Link>
      </div>
      <div className="blog-box-content">
        <h5 className="my-2">{singleBlog.title}</h5>
        <ul className="blog-tags">
          <li>
            <div className="icon">
              <FaUserAlt />
            </div>
            Admin
          </li>
          <li>
            <div className="icon">
              <AiFillCalendar />
            </div>
            {new Date(singleBlog.createdAt).toDateString()}
          </li>
        </ul>
        <Link to="/Blog-Detail">
          <h4 className="poppin">{singleBlog.name}</h4>
        </Link>
        {/* <p>{desp}</p> */}
        {/* <Link to='#' className="btn btn-hover btn-custom btn-green">Read More</Link> */}
      </div>
    </div>
  );
};

function Blogs() {

  const [blogArr, setBlogArr] = useState([])
  const [blogCategoryArr, setBlogCategoryArr] = useState([])
  const [blogCategoryId, setBlogCategoryId] = useState("")

  const handleGetAllCategories = async () => {
    try {
      let { data: res } = await getBlogAllCategories(`status=APPROVED`);
      if (res.data) {
        // console.log(res.data, "getBlogAllCategories");
        setBlogCategoryArr(res.data);
      }
    } catch (err) {
      console.error(err);
    }
  };


  const handleGetAllBlog = async (query) => {
    try {
      let { data: res } = await getBlogAll(query);
      if (res.data) {
        // console.log(res.data, "getBlogAll");
        setBlogArr(res.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    handleGetAllCategories();
    handleGetAllBlog(`publish=true`);
  }, []);


  useEffect(() => {
    // console.log(blogCategoryId,"ashdfiagasdifgsdaifi");

    handleGetAllBlog(`publish=true&blogCategoryId=${blogCategoryId}`);

  }, [blogCategoryId])
  


  const [blog, setblog] = useState([
    {
      name: "What makes Georgette so unique? Get the best Georgette fabrics online!",
      desp: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Facilis dolorum cupiditate doloribus necessitatibus distinctio veritatis quam soluta aperiam, sint sed corporis, est eos libero praesentium unde id voluptatibus a? Quas.",
      creater: "admin",
      date: new Date(2022, 7, 23),
      img: images.blog1,
    },
    {
      name: "Where to find the latest fashion trends and why you SHOULD follow them!?",
      desp: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Facilis dolorum cupiditate doloribus necessitatibus distinctio veritatis quam soluta aperiam, sint sed corporis, est eos libero praesentium unde id voluptatibus a? Quas.",
      creater: "admin",
      date: new Date(2020, 9, 17),
      img: images.blog2,
    },
    {
      name: "Voile, Poplin and Cambric: 3 Major Types of Printed Cotton Fabrics Available Online",
      desp: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Facilis dolorum cupiditate doloribus necessitatibus distinctio veritatis quam soluta aperiam, sint sed corporis, est eos libero praesentium unde id voluptatibus a? Quas.",
      creater: "admin",
      date: new Date(2022, 7, 23),
      img: images.blog3,
    },
    {
      name: "Buy Pure Cotton Fabrics online & Get the best deals - Here’s how!",
      desp: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Facilis dolorum cupiditate doloribus necessitatibus distinctio veritatis quam soluta aperiam, sint sed corporis, est eos libero praesentium unde id voluptatibus a? Quas.",
      creater: "admin",
      date: new Date(2020, 9, 17),
      img: images.blog4,
    },
  ]);
  const options = [
    { value: "Wooden printing blocks", label: "Wooden printing blocks" },
    { value: "Fabric", label: "Fabric" },
    { value: "Home Decor", label: "Home Decor" },
    { value: "Clothing", label: "Clothing" },
    { value: "Paper & journals", label: "Paper & journals" },
    { value: "Bags & Accessories", label: "Bags & Accessories" },
    { value: "Christmas", label: "Christmas" },
    { value: "Bulk Order", label: "Bulk Order" },
  ];

  return (
    <main>
      <PageBanner
        banner1
        img={images.slide2}
        title="Blogs"
        text="Read Our Latest Blogs &amp; Articles"
      />
      <section className="blog mb-50 mt-5">
        <div className="container">
          <div className="col-12 col-md-6 mx-auto mb-4 mb-xxl-5">
            <form action="/" className="form">
              {/* <label className="text-dark mb-1 text-center">Categories</label> */}
              <Select
                classNamePrefix="sort-by"
                options={blogCategoryArr.map(el => ({label:el.name,value:el._id}))}
                placeholder="Seach Category"
                onChange={(e) =>setBlogCategoryId(e.value)}
                theme={(theme) => ({
                  ...theme,
                  borderRadius: 0,
                  colors: {
                    ...theme.colors,
                    primary25: "#eeeeee",
                    primary: "#b0abcb",
                  },
                })}
              />
            </form>
          </div>
          <div className="row gx-2 gx-sm-4 gy-4 gy-xxl-5 gx-xxl-5">
          { blogArr &&
              blogArr.length > 0 ?
              blogArr.map((item, index) => {
              return (
                <div className="col-6 col-md-6 col-lg-4" key={index}>
                  <BlogBox singleBlog={item}
                  />
                </div>
              )
            } ) : <h3 className="text-center text-danger">No Blog Found</h3> }
          </div>
        </div>
      </section>
      <SocialBanner />
    </main>
  );
}

export default Blogs;
