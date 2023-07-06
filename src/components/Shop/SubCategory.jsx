import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getChildCategory, getNameById, getNameBySlug } from "../../services/Category.service";
import { getCountryFromLocal } from "../../services/Currency.service";
import { generateImageUrl } from "../../services/url.service";
import { BlockedCategory, BlockedCountry } from "../../utils/country";
import { images } from "../Utility/Images";
import Instagram from "../Utility/Instagram";
import PageBanner from "../Utility/PageBanner";
function SubCategory() {

  const navigate = useNavigate();
  const params = useParams()
  const [parentCategoryObj, setParentCategoryObj] = useState();
  const [categoryArr, setCategoryArr] = useState([]);
  const [categoryId, setcategoryId] = useState("");
  
  const [productBox, setproductBox] = useState([
    {
      name: "Birds and animals",
      img: images.product1
    },
    {
      name: "Box sets",
      img: images.product1
    },
    {
      name: "Border, tiles & geometrical  blocks",
      img: images.product1
    },
    {
      name: "Ethnic designs",
      img: images.product1
    },
    {
      name: "Botanical ",
      img: images.product2
    },
    {
      name: "Sea world",
      img: images.product3
    },
    {
      name: "City life",
      img: images.product2
    },
    {
      name: "Festive blocks",
      img: images.product1
    },
    {
      name: "Scrip blocks",
      img: images.product2
    },
    {
      name: " Insects, reptiles and bugs ",
      img: images.product3
    },
    {
      name: " Fruits and vegetables ",
      img: images.product2
    },
    {
      name: " Kids blocks",
      img: images.product1
    },
    {
      name: " Crockery",
      img: images.product3
    },
    {
      name: " Tea light blocks",
      img: images.product2
    },
  ]);




  const handleGetAllCategories = async () => {
    try {
      let { data: res } = await getChildCategory(categoryId);
      if (res.data) {
        setCategoryArr(res.data)
      }
    }
    catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    handleGetNameById()
  }, [params])

  const handleGetNameById = async () => {
    try {
      let { data: res } = await getNameBySlug(params.id,'level=1&position=true')
      if (res.data) {
        // console.log(res.data,"category")
        let name  = res.data.name;
        let country = getCountryFromLocal();
        if(BlockedCategory.includes(name) && BlockedCountry.includes(country)){
          alert("Please Contact the seller ");
          navigate('/');
          
        }
        setParentCategoryObj(res.data)
        setcategoryId(res.data._id)
      }
    }
    catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    handleGetAllCategories()
  }, [categoryId])






  return (
    <main>
      <PageBanner
        banner3
        cols="col-lg-6"
        img={parentCategoryObj?.bannerImage ? generateImageUrl(parentCategoryObj?.bannerImage):images.slide1}
        title={parentCategoryObj?.title ? parentCategoryObj?.title : "Sub Categories"}
        // text={parentCategoryObj?.description}
      />
      <section className="mb-50 subcategory">
        <div className="container-fluid px-lg-5">
          <ul>
            {categoryArr && categoryArr.length > 0 && categoryArr.map((item, i) => {
              return (
                <li key={i} className='box'>
                  <Link to={`/Products/${item.slug}`} className="text-center">
                    <div className="image">
                      <img src={generateImageUrl(item?.categoryImage)} alt="" />
                    </div>
                    <h4 className="poppin">{item?.name}</h4>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <Instagram />
    </main>
  );
}

export default SubCategory;
