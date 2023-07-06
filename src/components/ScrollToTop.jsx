import { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { usePrevLocation } from "./Utility/LocationUtilHook";

// import {
//   Link,
//   useLocation,
//   useParams,
//   useSearchParams,
//   useHistory,
// } from "react-router-dom";

function ScrollToTop() {
  let location = useLocation();
  let prev = usePrevLocation(location)
  // let history = use
  const scrollHAndler = () => {
    window.scrollTo(0, 0);
    document.scrollTop = "0px";
  };

  useEffect(() => {
    console.log(prev, location)
    let getScrolData = localStorage.getItem("scrollData");
    let convertobj = JSON.parse(getScrolData);

    const chekc = prev.pathname;
    console.log(chekc, "inside scroll handler")
    if (chekc.includes("Product-Detail")) {
      setTimeout(() => {
        // console.log(convertobj.y, "getScrolData2222conmvret");
        // console.log(chekc.includes("Products"), "check kle");

        window.scrollBy(convertobj.x, convertobj.y);
      }, 500)
    } else {
      console.log("inside scroll handler")
      scrollHAndler();
    }
  }, [location, prev]);

  // console.log(location, "location")
}

export default ScrollToTop;
