import React from "react";
import { connect } from "react-redux";
import { startLogin } from "../../actions/authActions";

// we export component for testing
export const LoginPage = ({ startLogin }) => (
  <div className="wrapper wrapper--login">
    <div className="login__wrapper">
      <div className="login__item login__item--top">
        <h1>ManageURLs</h1>
      </div>
      <div className="login__item login__item--bottom">
        <p>Manage your bookmarks with ease.</p>
        <button onClick={startLogin} className="btn btn--primary">
          LOGIN WITH GOOGLE
        </button>
      </div>
    </div>
  </div>
);

const mapDispatchToProps = dispatch => ({
  startLogin: () => dispatch(startLogin())
});

export default connect(undefined, mapDispatchToProps)(LoginPage);
