import React, { useState } from 'react';

const CarComponent = () => {
  const [car, setCar] = useState({
    brand: "Ford",
    model: "Mustang",
    year: "1964",
    color: "Đỏ"
  });

  const updateColor = () => {
    setCar(prevState => ({
      ...prevState,
      color: "Xanh dương"
    }));
  };

  return (
    <div>
      <h1>Xe {car.brand} của tôi</h1>
      <p>
        Đây là một {car.model} màu {car.color} phiên bản năm {car.year}.
      </p>
      <button onClick={updateColor}>Thay đổi màu</button>
    </div>
  );
};

export default CarComponent;
