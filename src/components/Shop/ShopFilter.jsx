import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Select from "react-select";
import { FilterContext } from "../../App";
import { getAttribute } from "../../services/Attribute.service";
import { getNestedCategories } from "../../services/Category.service";
import { errorToast } from "../../utils/Toast";
function ShopFilter({ filterObj }) {

  const params = useParams()

  const [category, setcategory] = useState([
    {
      value: "Wooden-Printing-Blocks",
      label: "Wooden Printing Blocks",
      children: [
        {
          value: "Box-Sets",
          label: "Box Sets",
        },
        {
          value: "Border-Blocks",
          label: "Border Blocks",
        },
        {
          value: "Trees",
          label: "Trees",
        },
        {
          value: "Ethnic-Designs",
          label: "Ethnic Designs",
        },
        {
          value: "Sea-World",
          label: "Sea World",
        },
        {
          value: "Bird-&-Animals",
          label: "Bird & Animals",
        },
        {
          value: "Botanical",
          label: "Botanical",
        },
        {
          value: "Tea-Light-Blocks",
          label: "Tea Light Blocks",
        },
        {
          value: "Crockery",
          label: "Crockery",
        },
        {
          value: "Festive-Blocks",
          label: "Festive Blocks",
        },
        {
          value: "City-Life",
          label: "City Life",
        },
        {
          value: "Fruits-&-Vegetables",
          label: "Fruits & Vegetables",
        },
        {
          value: "Geometric-Blocks",
          label: "Geometric Blocks",
        },
        {
          value: "Insects",
          label: "Insects",
        },
        {
          value: "Script-Blocks",
          label: "Script Blocks",
        },
      ],
    },
    {
      value: "Christmas",
      label: "Christmas",
      children: [],
    },
    {
      value: "Indian-Fabric",
      label: "Indian Fabric",
      children: [
        {
          value: "Ajrakh-&-Akola-Fabric-Prints",
          label: "Ajrakh & Akola Fabric Prints",
        },
        {
          value: "Bagru-Dabu-Block-Printing",
          label: "Bagru / Dabu Block Printing",
        },
        {
          value: "Silk-&-Chanderi-Fabric",
          label: "Silk & Chanderi Fabric",
        },
        {
          value: "Ikat-Chicken-&-Kantha-Fabric",
          label: "Ikat, Chicken & Kantha Fabric",
        },
        {
          value: "Indigo",
          label: "Indigo",
        },
        {
          value: "Batik-&-Kalamkari-fabric",
          label: "Batik & Kalamkari fabric",
        },
        {
          value: "Khadi-&-Patchwork-Fabric",
          label: "Khadi & Patchwork Fabric",
        },
        {
          value: "Sanganeri-hand-block-printed",
          label: "Sanganeri hand block printed",
        },
        {
          value: "Screen-Printed",
          label: "Screen Printed",
        },
        {
          value: "Kids-Cotton-Fabric",
          label: "Kids Cotton Fabric",
        },
      ],
    },
    {
      value: "Home-Decor",
      label: "Home Decor",
      children: [
        {
          value: "Curtains",
          label: "Curtains",
        },
        {
          value: "Cushions-covers",
          label: "Cushions covers",
        },
        {
          value: "Quilts",
          label: "Quilts",
        },
        {
          value: "Rugs",
          label: "Rugs",
        },
        {
          value: "Table-runner",
          label: "Table runner",
        },
        {
          value: "Towels",
          label: "Towels",
        },
      ],
    },
    {
      value: "Gifts",
      label: "Gifts",
      children: [
        {
          value: "Bags",
          label: "Bags",
        },
        {
          value: "Stationery",
          label: "Stationery",
        },
        {
          value: "Macrame-Key-chains",
          label: "Macrame Key chains",
        },
        {
          value: "Stoles",
          label: "Stoles",
        },
        {
          value: "Wash-Bags",
          label: "Wash Bags",
        },
      ],
    },
    {
      value: "Clothing",
      label: "Clothing",
      children: [
        {
          value: "Dresses",
          label: "Dresses",
        },
        {
          value: "Kurtis",
          label: "Kurtis",
        },
        {
          value: "Night-Suits",
          label: "Night Suits",
        },
        {
          value: "Stoles-Scarfs",
          label: "Stoles/Scarfs",
        },
      ],
    },
  ]);
  const [sizes, setsizes] = useState([
    {
      value: "xs-s",
      label: "XS-S",
    },
    {
      value: "s-m",
      label: "S-M",
    },
    {
      value: "m-l",
      label: "M-L",
    },
    {
      value: "l-xl",
      label: "L-XL",
    },
    {
      value: "xl-xxl",
      label: "XL-XXL",
    },
    {
      value: "xxl-xxxl",
      label: "XXL-XXXL",
    },
    {
      value: "s",
      label: "S",
    },
    {
      value: "m",
      label: "M",
    },
    {
      value: "l",
      label: "L",
    },
    {
      value: "xl",
      label: "XL",
    },
    {
      value: "xxl",
      label: "XXL",
    },
    {
      value: "set-of-2",
      label: "Set of 2",
    },
  ]);
  const [prize, setprize] = useState([
    {
      checked: false,
      start: 0,
      end: 999,
      label: "Under Rs 999",
    },
    {
      checked: false,
      start: 1000,
      end: 2999,
      label: "Rs 1000 - Rs 2999",
    },
    {
      checked: false,
      start: 3000,
      end: 4999,
      label: "Rs 3000 - Rs 4999",
    },
    {
      checked: false,
      start: 5000,
      end: 6999,
      label: "Rs 5000 - Rs 6999",
    },
  ]);
  const options = [
    { value: "popular", label: "Popular" },
    { value: "date_desc", label: "Date, new to old" },
    { value: "date_asc", label: "Date, old to new" },
    { value: "price_asc", label: "Price, low to high" },
    { value: "price_desc", label: "Price, high to low" },
  ];

  const [filter, setFilter] = useContext(FilterContext)
  const [finalFilterObj, setFinalFilterObj] = useState({
    sortBy: "",
    categoryArr: [],
    priceRangeObj: {}
  });


  const [mainCategoryArr, setMainCategoryArr] = useState([]);
  const [mainAttributesArr, setMainAttributesArr] = useState([]);


  const handleGetNestedCategory = async () => {
    try {
      let { data: response } = await getNestedCategories();
      if (response) {
        setMainCategoryArr(response.data);
      }
    } catch (error) {
      // console.error(error);
      errorToast(error)
    }
  }


  const handleGetAttributes = async () => {
    try {
      let { data: response } = await getAttribute();
      if (response) {
        setMainAttributesArr(response.data);
      }
    } catch (error) {
      // console.error(error);
      errorToast(error)
    }
  }
 





  const handleRenderCheckboxCategory = (obj, i) => {
    return (
      <li key={`${obj._id}_${i}`} style={{ marginLeft: `${obj.level + 5}px` }} >
        <div
          data-bs-toggle="collapse"
          data-bs-target={`#Category${obj.level}${obj._id}`}
          aria-expanded="false"
          aria-controls={`$Category${obj.level}${obj._id}`}
          className="shopfilters-list-title"
        >
          <input type="checkbox" onChange={(event) => handleNestedCategoryCheckBoxEvent(obj._id, event.target.checked)} checked={obj.checked} id={`${obj._id}`} />
          <label htmlFor={`${obj._id}`}>{obj.name}</label>
        </div>
        {
          obj.checked && obj.subCategoryArr && obj.subCategoryArr.length > 0 && obj.subCategoryArr.map((el, index) => {
            return (
              handleRenderCheckboxCategory(el, index)
            )
          })
        }
      </li>
    )
  }


  const handleRenderNestedCategory = (arr, id, value) => {
    try{

    
    let tempArr = arr.map(el => {
      if (el._id == id) {
        el.checked = value
        return el
      }
      else {
        if (el.subCategoryArr && el.subCategoryArr.length > 0) {
          handleRenderNestedCategory(el.subCategoryArr, id, value)
        }
        else {
          return el
        }
      }
    })
    return tempArr;
  }catch(err){
    errorToast(err)
  }
  }



  const returnSelectedCategories = (arr) => {
    let new_selected_arr = arr.filter(el => el.checked)
    let subCategories = arr.reduce((acc, el) => [...acc, ...el.subCategoryArr.filter(el => el.checked)], [])
    if (subCategories?.length) {
      return [...new_selected_arr, ...returnSelectedCategories(subCategories)]
    }
    else {
      return [...new_selected_arr]
    }
  }


  const handleNestedCategoryCheckBoxEvent = (id, value) => {
    let tempCategoryArr = mainCategoryArr.map(el => {
      if (el._id == id) {
        el.checked = value
        return el
      }
      else {
        if (el.subCategoryArr && el.subCategoryArr.length > 0) {
          el.subAttributesArr = handleRenderNestedCategory(el.subCategoryArr, id, value)
          return el
        }
        else {
          return el
        }
      }
    });
    let tempArr = returnSelectedCategories(tempCategoryArr)
    setFinalFilterObj(prevState => {
      return { ...prevState, categoryArr: tempArr }
    })
    setMainCategoryArr([...tempCategoryArr])
  }


  useEffect(() => {
    handleGetNestedCategory()
    handleGetAttributes()
  }, [])


  useEffect(() => {
    // console.log(finalFilterObj,"filterrrrrr")

    filterObj(finalFilterObj)
  }, [finalFilterObj])



  const handleAttributeVariantChange = (index) => {
    let tempArr = [...mainAttributesArr]
    tempArr[index].checked = !tempArr[index].checked
    // console.log(tempArr, "sub attribute")
    setMainAttributesArr(tempArr)
  }

  const handleInnerAttributeVariantChange = (index, innerIndex) => {
    let tempArr = [...mainAttributesArr]
    // console.log(tempArr, tempArr[index].attributeValueArr[innerIndex].checked, tempArr[index].attributeValueArr[innerIndex])
    tempArr[index].attributeValueArr[innerIndex].checked =
      !tempArr[index].attributeValueArr[innerIndex].checked
    // console.log(tempArr, "sub attribute")
    setMainAttributesArr([...tempArr])
  }



  const handleSetPriceCheck = (i) => {

    let tempPrice = prize.map((el, index) => {
      if (index == i) {
        el.checked = !el.checked
      }else{
        el.checked =false
      }
      return el
    })
    // let prizeFound = tempPrice.filter(el=>el.checked=true);
// console.log(prizeFound,"tempPrice");
    setprize([...tempPrice])
    console.log(tempPrice,"=====tempPrice=====")
    setFinalFilterObj((prev) => {
      return { ...prev, priceRangeObj: tempPrice.find(el => el.checked==true) }
    })


  }




  return (
    <div className="shopfilters">
      <div className="shopfilters-box">
        <p className="shopfilters-title">Filters</p>
        <Select
          classNamePrefix="sort-by"
          options={options}
          placeholder="Sort By"
          // onChange={(e) => setFilter((prev) => ({ ...prev, sortBy: e.value }))}
          onChange={(e) => setFinalFilterObj((prev) => ({ ...prev, sortBy: e.value }))}
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
      </div>
      <div className="shopfilters-box">
        <p className="shopfilters-title">By Category</p>
        <ul className="shopfilters-list" id="shopfilters-category-list">
          {
            mainCategoryArr && mainCategoryArr.length > 0 && mainCategoryArr.map((el, i) => {
              return (
                handleRenderCheckboxCategory(el, i)
              )
            })
          }
        </ul>
      </div>
      {/* <div className="shopfilters-box">
        {mainAttributesArr &&
          mainAttributesArr.length > 0 &&
          mainAttributesArr.map((el, index) => {
            return (
              <div
                key={el._id}
              >
                <p className="shopfilters-title">BY {`${el.name}`.toUpperCase()}</p>
                <>
                  {el.attributeValueArr.length > 0 &&
                    el.attributeValueArr.map(
                      (ele, index2) => {
                        return (
                          <div key={index2}>
                            <div className="shopfilters-list-title">
                              <input type="checkbox" onChange={(event) => handleInnerAttributeVariantChange(index, index2)} checked={ele.checked} id={`attribute-${ele.index2}`} />
                              <label htmlFor={`attribute-${ele.index2}`}>{ele.label}</label>
                            </div>
                          </div>
                        )
                      }
                    )}
                </>
              </div>
            )
          })}
      </div> */}
      <div className="shopfilters-box">
        <p className="shopfilters-title">BY PRICE</p>
        <ul className="shopfilters-list">
          {prize && prize.length > 0 && prize.map((item, i) => {
            return (
              <li key={`${item.label}_${i}`} >
                <div className="shopfilters-list-title" >
                  <input type="checkbox" checked={item.checked} onChange={(e) => handleSetPriceCheck(i)} id={item.startFrom}  />
                  <label htmlFor={item.startFrom}>{item.label}</label>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
      {/* <div className="shopfilters-box">
        <p className="shopfilters-title">BY COLOR</p>
        <ul className="shopfilters-list">
          <li>
            <div className="shopfilters-list-title">
              <div className="form w-100">
                <input
                  type="color"
                  className="form-control p-0 border-0"
                  value="#f6b73c"
                />
              </div>
            </div>
            <p className="m-0 text-center">OR</p>
            <div className="shopfilters-list-title">
              <div className="form w-100">
                <div className="form w-100">
                  <label className="w-100">
                    <span>Multicolor</span>
                    <input
                      type="checkbox"
                      className="form-check p-0 border-0 multi-color w-100"
                      value='multi-color'
                    />
                  </label>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div> */}
    </div>
  );
}

export default ShopFilter;
