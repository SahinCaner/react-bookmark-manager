import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import Header from '../components/common/Header';
import Navigation from '../components/common/navigation/Navigation';

export const PrivateRoute = ({ isAuthenticated, component: Component, ...rest }) => (
  <Route {...rest} component={(props) => (
    isAuthenticated ? (
      <div className="wrapper">
        {/* <Header /> */}
        <Navigation />
        <Component {...props} />
      </div>
    ) : (
        <Redirect to="/" />
      )
  )} />
);

const mapStateToProps = (state) => ({
  isAuthenticated: !!state.auth.uid
});


export default connect(mapStateToProps)(PrivateRoute);



// export const PrivateRoute = ({ isAuthenticated, component: Component, ...rest }) => (
//   <Route {...rest} component={(props) => (
//     isAuthenticated ? (
//       <div>
//         {/* <LeftPanel /> */}
//         {/* <div className="main"> */}
//           {/* <div className="main__item main__item--header">
//             <Header />
//           </div> */}
//           <Component {...props} />
//         {/* </div> */}
//       </div>
//     ) : (
//         <Redirect to="/" />
//       )
//   )} />
// );