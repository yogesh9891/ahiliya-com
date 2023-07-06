import React, { useState } from 'react';
import { BsSuitHeart, BsSuitHeartFill } from 'react-icons/bs';

function Wishlist({className,clickEvent,heartFill,heartColor}) {
    return ( 
        <div
        className={`icon ${heartFill && !heartColor ? "green" : ""} ${heartFill && heartColor ? heartColor : ""} ${className?className:''}`}
        onClick={clickEvent}
      >
        {heartFill ? <BsSuitHeartFill /> : <BsSuitHeart />}
      </div>
     );
}

export default Wishlist;