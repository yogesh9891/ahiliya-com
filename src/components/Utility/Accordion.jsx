import React, { useEffect } from "react";
import { AiFillMinusCircle } from "react-icons/ai";
import { BsFillPlusCircleFill } from "react-icons/bs";
import styled from "styled-components";

function Accordion({getTitle,getDesp,initial, parentValue,itemIndex}) {
    // console.log("accordian initial", initial)
   
  const Accordion = styled.div`
    background-color: #fff;
    border-radius: 10px 60px 20px 20px;
    overflow: hidden;
  `;
  const AccordionHeader = styled.div`
    padding: 1pc;
    cursor: pointer;
  `;
  const AccordionDetail = styled.div`
    min-height: 0px;
    height: ${initial ? "auto" : "0"};
    visibility: ${initial ? "visible" : "hidden"};
    opacity: ${initial ? "1" : "0"};
    overflow: ${initial ? "visible" : "hidden"};
    transition: height 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  `;
  const Title = styled.h4``;
  const Icon = styled.div`
    color: ${initial ? "red" : "green"};
    font-size: 24px;
  `;
  const Desp = styled.p`
    padding:1pc;
    border-top: 1px solid #eee;
  `;

const handleAccordion=()=>{
    parentValue(!initial,itemIndex);
}


useEffect(() => {
  

}, [getTitle,getDesp,initial, parentValue])

  return (
    <Accordion className="faq-accordion">
      <AccordionHeader onClick={handleAccordion}>
        <div className="d-flex align-items-center gap-3">
          <Icon className="icon">
            {initial ? <AiFillMinusCircle /> : <BsFillPlusCircleFill />}
          </Icon>
          <Title className="mb-0">{getTitle}</Title>
        </div>
      </AccordionHeader>
      <AccordionDetail>
        <Desp>
        {getDesp}
        </Desp>
      </AccordionDetail>
    </Accordion>
  );
}

export default Accordion;
