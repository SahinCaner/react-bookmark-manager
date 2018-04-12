import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import Box from "../common/box/Box";
import BoxHeader from "../common/box/BoxHeader";
import BoxBody from "../common/box/BoxBody";
import ButtonList from "../common/button-list/ButtonList";
import BoxItem from "../common/box/BoxItem";

import { startLogout } from "../../actions/authActions";

export class UserSettingsPage extends Component {
  render() {
    return (
      <div className="main">
        <div className="main__item main__item--header">
          <div className="container">
            <Box>
              <BoxHeader title="Profile">
                <ButtonList>
                  <Link to={`/`} className="btn btn--link">
                    EDIT PROFILE
                  </Link>
                </ButtonList>
              </BoxHeader>
              {/* <BoxItem>
                {this.props.user !== null &&
                  this.props.user.providerData.map(profile => {
                    return (
                      <div className="user__profile" key={profile.uid}>
                        <img src={profile.photoURL} alt="" />
                        <p>{profile.displayName}</p>
                        <p>{profile.email}</p>
                      </div>
                    );
                  })}
              </BoxItem> */}
            </Box>
          </div>
        </div>
        <div className="main__item main__item--content">
          <div className="container">
            <Box>
              <BoxItem>
                <ButtonList>
                  <button className="btn btn--primary" onClick={this.props.startLogout}>LOG OUT</button>
                  <Link to={`/`} className="btn btn--link">
                    EDIT PROFILE
                  </Link>
                </ButtonList>
              </BoxItem>
            </Box>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.userData.user
});

const mapDispatchToProps = dispatch => ({
  startLogout: () => dispatch(startLogout())
});

export default connect(mapStateToProps, mapDispatchToProps)(UserSettingsPage);
