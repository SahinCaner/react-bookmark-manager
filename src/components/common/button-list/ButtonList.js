import React from "react";
import classNames from "classnames";
import ButtonListItem from "./ButtonListItem";

export default props => {
  const groupClasses = classNames("button__list", {
    "button__list--center": props.alignCenter,
    "button__list--right": props.alignRight
  });

  const children = props.children;

  if (children.length > 0) {
    return (
      <ul className={groupClasses}>
        {props.children.map((child, i) => {
          return <ButtonListItem key={i}>{child}</ButtonListItem>;
          i++;
        })}
      </ul>
    );
  } else {
    return (
      <ul className={groupClasses}>
        <ButtonListItem>{children}</ButtonListItem>
      </ul>
    );
  }
};
