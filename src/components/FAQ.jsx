import React, { useEffect, useState } from "react";
import { getFaqs } from "../services/Banner.service";
import Accordion from "./Utility/Accordion";
import { images } from "./Utility/Images";
import PageBanner from "./Utility/PageBanner";

function FAQ() {
  const [faq, setfaq] = useState([]);

const handleGettestimonials = async () => {
  try {
    let { data: res } = await getFaqs();
    if (res.data) {
      // console.log(res.data);
      setfaq(res.data);
    }
  } catch (err) {
    console.error(err);
  }
};

useEffect (() => {
  handleGettestimonials();
}, []);


  const handleAccordion = (value, i) => {
    let tempArr = faq.map((el, index) => {
      if (index === i) {
        el.initial = value;
      } else {
        el.initial = !value;
      }
      return el;
    });
    setfaq([...tempArr]);
  };

  return (
    <main>
      <PageBanner
        banner4
        img={images.faq_bg}
        title="FAQ"
        text="Have Any Questions?"
        className='mb-4'
      />  
      <section className="faq mb-50">
        <div className="container">
          <div class="accordion accordion-flush" id="accordionFlushExample">
            {faq.map((item, i) => {
              return (
                <div class="accordion-item" key={i}>
                  <h2 class="accordion-header">
                    <button
                      class="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target={`#flush-collapse${i}`}
                      aria-expanded="false"
                      aria-controls={`flush-collapse${i}`}
                    >
                      {item.heading}
                    </button>
                  </h2>
                  <div
                    id={`flush-collapse${i}`}
                    class="accordion-collapse collapse"
                    data-bs-parent="#accordionFlushExample"
                  >
                    <div class="accordion-body">
                      <p>{item.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}

export default FAQ;
