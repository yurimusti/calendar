import React from "react";
import "./index.scss";

const item = ({ data: item, onClick }) => {
  return (
    <div className="item" onClick={onClick}>
      <span className="item-dayName">
        {item.dayName.slice(0, 3).toUpperCase()}
      </span>
      <span
        className={`item-date ${
          item.disabled
            ? "disableDate"
            : item.sameDate
            ? "sameDate"
            : "normalDate"
        }`}
      >
        {item.day}
      </span>
      <div
        className="item-box"
        style={{
          background: item.isHoliday.length !== 0 && item.isHoliday[0].color
        }}
      />
    </div>
  );
};

export default item;
