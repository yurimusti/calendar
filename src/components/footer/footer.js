import React from "react";
import "./index.scss";

const Footer = ({ holidays = [] }) => {
  return (
    <div className="footer">
      {holidays.map((e, i) => (
        <div key={i} className="container">
          <div className="box" style={{ background: e.color }} />
          <span>{e.name}</span>
        </div>
      ))}
    </div>
  );
};

export default Footer;
