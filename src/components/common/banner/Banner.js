import React from "react";
import Box from "../box/Box";
import BoxItem from "../box/BoxItem";
import ButtonList from "../button-list/ButtonList";

const Banner = props => {
  return (
    <Box>
      <BoxItem banner>
        <div className="banner">
          {props.emoji && (
            <div className="banner__item banner__item--image banner__item--center">
              <p>{props.emoji}</p>
            </div>
          )}

          {props.imageURL && (
            <div className="banner__item banner__item--image banner__item--center">
              <img src={props.imageURL} alt="" />
            </div>
          )}

          {props.title && (
            <div className="banner__item banner__item--message banner__item--center">
              <h3>{props.title}</h3>
              <p>{props.subtitle}</p>
            </div>
          )}

          {props.children && (
            <div className="banner__item banner__item--button banner__item--center">
              <ButtonList>{props.children}</ButtonList>
            </div>
          )}

          {props.microcopy && (
            <div className="banner__item banner__item--microcopy banner__item--right">
              <p className="microcopy">{props.microcopy}</p>
            </div>
          )}
        </div>
      </BoxItem>
    </Box>
  );
};

export default Banner;
