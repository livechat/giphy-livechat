import React from "react";
import handleViewport from "react-in-viewport";

const style = {
  width: "100%",
  height: "50px",
  display: "flex",
  justifyContent: "center",
};

const EndOfList = ({ forwardedRef }) => {
  return <div ref={forwardedRef} style={style}></div>;
};

export default handleViewport(EndOfList);
