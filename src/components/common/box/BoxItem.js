import React from "react";
import classNames from "classnames";

export default props => {
  const groupClasses = classNames("box__item", {
    "box__item--buttons": props.buttons,
    "box__item-position box__item-position--center": props.alignCenter,
    "box__item-position box__item-position--right": props.alignRight,
    "box__item--transparent": props.transparent,
    "box__item--banner": props.banner
  });
  return <div className={groupClasses}>{props.children}</div>;
};
