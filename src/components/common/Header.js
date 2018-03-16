import React from "react";
import { Link, NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { startLogout } from "../../actions/authActions";
import ButtonList from "./button-list/ButtonList";

export const Header = ({ startLogout }) => (
  <div className="header">
    <div className="container">
      <div className="header__logo">
        <div className="logo">
          <Link to="/">
            <h1>Bookmark</h1>
          </Link>
        </div>
      </div>

      <div className="header__menu composite composite--right">
        <div className="composite__header">
          <span>Close Menu</span>
          <i className="fa fa-arrow-right" aria-hidden="true" />
        </div>
        <div className="composite__body">
          <ul className="header__menu__list">
            <li>
              <NavLink to="/" activeClassName="active">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/folders" activeClassName="active">
                Folders
              </NavLink>
            </li>
            <li>
              <NavLink to="/folders" activeClassName="active">
                Bookmarks
              </NavLink>
            </li>
          </ul>
          <div className="secondary__menu__wrapper">
            <div className="header__user">
              <div className="header__user__item header__user__item--profile">
                <a href="#">
                  <div className="header__profile header__profile--picture">
                    {/* <img src="img/blank.png" /> */}
                  </div>
                  <div className="header__profile header__profile--name">
                    Maximiliano
                    <button
                      className="button button--link"
                      onClick={startLogout}
                    >
                      Logout
                    </button>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="header__user">
        <div className="header__user__item header__user__item--profile">
          <a href="#">
            <div className="header__profile header__profile--picture">
              {/* <img src="img/blank.png" /> */}
            </div>
            <div className="header__profile header__profile--name">
              Maximiliano
              <button className="button button--link" onClick={startLogout}>
                Logout
              </button>
            </div>
          </a>
        </div>
      </div>

      <ul className="mobile__navigation__list">
        <li id="mobileSearchShowButton">
          <i className="fa fa-search" aria-hidden="true" />
          <span>Search</span>
        </li>
        <li id="mobileMenuShowButton">
          <i className="fa fa-bars" aria-hidden="true" /> <span>Menu</span>
        </li>
      </ul>
    </div>
  </div>
);

const mapDispatchToProps = dispatch => ({
  startLogout: () => dispatch(startLogout())
});

export default connect(undefined, mapDispatchToProps)(Header);
