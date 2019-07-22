import React from "react";
import dateFns from "date-fns";
import { ReactComponent as IconLeft } from "../../assets/svg/back.svg";
import { ReactComponent as IconRight } from "../../assets/svg/next.svg";
import "./index.scss";

const Header = ({ prevDate, currText, nextDate }) => {
  const format = "MMMM YYYY";

  return (
    <div className="header">
      <IconLeft className="icon" onClick={prevDate} />
      <span>{dateFns.format(currText, format)}</span>
      <IconRight className="icon" onClick={nextDate} />
    </div>
  );
};

export default Header;