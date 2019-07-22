import React from "react";
import Item from "../item";
import "./index.scss";

const ListDate = ({ listDate }) => {
  const onClick = i => {};

  return (
    <div className="mainList">
      <div className="grid">
        {listDate.map((item, i) => (
          <Item key={i} data={item} onClick={() => onClick(i)} />
        ))}
      </div>
    </div>
  );
};

export default ListDate;
