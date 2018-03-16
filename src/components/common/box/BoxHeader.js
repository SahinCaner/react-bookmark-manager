import React from "react";

export default props => {
  return (
    <div className="box__item box__item--header">
      {props.title && (
        <div className="box__header__item">
          <h1>{props.title}</h1>
          {props.desc && <p className="desc">{props.desc}</p>}
        </div>
      )}
      {props.children && (
        <div className="box__header__item box__header__item--action">
          {props.children}
        </div>
      )}
    </div>
  );
};
