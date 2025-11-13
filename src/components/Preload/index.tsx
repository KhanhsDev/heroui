import React from "react";
import clsx from "clsx";
import "./style.scss";

const Preload = (props: {
  size?: string;
  color?: string;
  className?: string;
}) => {
  return (
    <div className={clsx(props.size, props.color, props.className, "preload")}>
      <div className="sk-chase">
        <div className="sk-chase-dot"></div>
        <div className="sk-chase-dot"></div>
        <div className="sk-chase-dot"></div>
        <div className="sk-chase-dot"></div>
        <div className="sk-chase-dot"></div>
        <div className="sk-chase-dot"></div>
      </div>
    </div>
  );
};

export default Preload;
