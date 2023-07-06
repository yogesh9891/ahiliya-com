import React from 'react';

function Quantity({ array, initial, index, setarray }) {
  const handleIncrement = (i) => {
    let temp = array.map((item, index) => {
      if (i === index) {
        if (item.quantity < 50) {
          item.quantity += 1;
        }
      }
      return item;
    });
    setarray([...temp]);
  };
  const handleDecrement = (i) => {
    let temp = array.map((item, index) => {
      if (i === index) {
        if (item.quantity > 0) {
          item.quantity -= 1;
        }
      }
      return item;
    });
    setarray([...temp]);
  };
  return (
    <div className="handle-quantity">
      <div className="product-quantity">
        <div
          className="plus-minus"
          onClick={() => handleIncrement(index)}
        >
          +
        </div>
        <div className="show-quantity">{initial}</div>
        <div
          className="plus-minus"
          onClick={() => handleDecrement(index)}
        >
          -
        </div>
      </div>
    </div>
  );
}

export default Quantity;