import React from "react";
import classNames from "classnames";

export default props => {
  const groupClasses = classNames("box__item box__item--body", {
    "box__item--banner": props.banner
  });
  return <div className={groupClasses}>{props.children}</div>;
};
