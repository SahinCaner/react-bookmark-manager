import React from "react";
import PropTypes from "prop-types";
import { Link, NavLink } from "react-router-dom";
import { connect } from "react-redux";
import FolderList from "../../folder-list/FolderList";
import ButtonList from "../button-list/ButtonList";
import classNames from "classnames";
import { startLogout } from "../../../actions/authActions";

export class Navigation extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isMobileMenuActive: undefined
    };
  }

  mobileMenuState = () => {
    this.state.isMobileMenuActive === undefined
      ? this.setState({ isMobileMenuActive: true })
      : this.setState({ isMobileMenuActive: undefined });
  };

  // getFirstName = displayName => {
  //   const firstSpace = displayName.indexOf(" ");
  //   const name = displayName.slice(0, firstSpace).toUpperCase();
  //   return name;
  // };

  render() {
    const navigationClasses = classNames("navigation", {
      "is-active": this.state.isMobileMenuActive
    });

    return (
      <div className={navigationClasses}>
        <div className="navigation__item navigation__item--header">
          <div className="navigation__logo">
            <Link to="/folders">ManageURLs</Link>
            <div className="btn btn--link btn--mobile" onClick={this.props.startLogout}>LOGOUT</div>
          </div>
          <div
            className="navigation__mobile__menu"
            onClick={this.mobileMenuState}
          >
            <div className="btn btn--link btn--mobile">MENU</div>
          </div>
        </div>

        <div className="navigation__item navigation__item--body">
          <div className="mobile__menu__header" onClick={this.mobileMenuState}>
            <div className="btn btn--link btn--mobile">CLOSE MENU</div>
          </div>
          <ul className="nav__menu">
            <li>
              <NavLink to="/folders" activeClassName="selected">
                <img src="/images/Folder.svg" alt="" />
                <h2>FOLDERS</h2>
              </NavLink>
              {this.props.folders.length > 0 && (
                <ul className="sub__nav__menu">
                  {this.props.folders.map(folder => {
                    return (
                      <li key={folder.id}>
                        <NavLink
                          to={`/folder/${folder.id}`}
                          activeClassName="selected"
                        >
                          {folder.title}
                        </NavLink>
                      </li>
                    );
                  })}
                </ul>
              )}
            </li>
            <li>
              <NavLink to="/bookmarks" activeClassName="selected">
                <img src="/images/Link.svg" alt="" />
                <h2>BOOKMARKS</h2>
              </NavLink>
            </li>
            {/* <li>
              <NavLink to="/settings" activeClassName="selected">
                <img src={this.props.user.photoURL} alt="" />
                <h2>{this.getFirstName(this.props.user.displayName)}</h2>
              </NavLink>
            </li> */}
            <li className="space" />
            <ButtonList alignCenter>
              <Link to="/add/folder" className="btn btn--secondary">
                {" "}
                CREATE FOLDER
              </Link>
              <Link to="/add/bookmark" className="btn btn--secondary">
                {" "}
                ADD BOOKMARK{" "}
              </Link>
            </ButtonList>
          </ul>
        </div>
      </div>
    );
  }
}

Navigation.propTypes = {
  folders: PropTypes.array.isRequired
};

const mapStateToProps = state => {
  return {
    folders: state.folders
    // user: state.userData.user
  };
};

const mapDispatchToProps = dispatch => ({
  startLogout: () => dispatch(startLogout())
});

export default connect(mapStateToProps,mapDispatchToProps)(Navigation);
