import React from "react";
import PropTypes from "prop-types";
import { Link, NavLink } from "react-router-dom";
import { connect } from "react-redux";
import FolderList from "../../bookmark-folder/FolderList";
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

  render() {
    const navigationClasses = classNames("navigation", {
      "is-active": this.state.isMobileMenuActive
    });

    return (
      <div className={navigationClasses}>
        <div className="navigation__item navigation__item--header">
          <div className="navigation__logo">
            <Link to="/">Bookify</Link>
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
              <h2>
                <NavLink to="/folders" activeClassName="selected">
                  FOLDERS
                </NavLink>
              </h2>
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
              <h2>
                <NavLink to="/bookmarks" activeClassName="selected">
                  BOOKMARKS
                </NavLink>
              </h2>
            </li>
            <li>
              <h2>
                <NavLink to="/settings" activeClassName="selected">
                  SETTINGS
                </NavLink>
              </h2>
            </li>
            <li className="space" />
            <ButtonList alignCenter>
              <Link to="/folder" className="btn btn--secondary">
                {" "}
                CREATE FOLDER
              </Link>
              <Link to="/bookmark" className="btn btn--secondary">
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
    folders: state.folders,
    bookmarks: state.folders
  };
};
const mapDispatchToProps = dispatch => ({
  startLogout: () => dispatch(startLogout())
});

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);

// export class LeftPanel extends React.Component {
//   render() {
//     return (
//       <div className="navigation">
//         <div className="navigation__item navigation__item--header">
//           <div className="logo">
//             <Link to="/"><h1>Bookify</h1></Link>
//           </div>
//         </div>
//         <div className="navigation__item navigation__item--content">
//         <ul className="menu">
//           <li><NavLink to="/folders" activeClassName="active">Folders</NavLink></li>
//           <li><NavLink to="/bookmarks" activeClassName="active">Bookmarks</NavLink></li>
//           <li className="flex-grow"></li>
//           <li><NavLink to="/user" activeClassName="active">User Menu</NavLink></li>
//         </ul>

//           {/* <FolderList folders={this.props.folders} /> */}
//           {/* <button className="button button--link" onClick={this.props.startLogout}>Logout</button> */}
//         </div>
//       </div>
//     );
//   };
// }
