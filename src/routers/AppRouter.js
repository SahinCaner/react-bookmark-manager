import React from 'react';
import { Router, Route, Switch, Link, NavLink } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import DashboardPage from '../components/dashboard/DashboardPage';
import NotFoundPage from '../components/common/NotFoundPage';
import LoginPage from '../components/login/LoginPage';
import FoldersPage from '../components/bookmark-folder/FoldersPage';
import ManageFolder from '../components/bookmark-folder/ManageFolder';
import UpdateFolder from '../components/bookmark-folder/UpdateFolder';
import EditBookmark from '../components/bookmark/EditBookmark';
import AddBookmark from '../components/bookmark/AddBookmark';


export const history = createBrowserHistory();

const AppRouter = () => (
  <Router history={history}>
    <Switch>
      <PublicRoute path="/" component={LoginPage} exact={true} />
      <PrivateRoute path="/dashboard" component={DashboardPage} />
      <PrivateRoute path="/folders" component={FoldersPage} />
      <PrivateRoute path="/update/folder/:id" component={UpdateFolder} />
      <PrivateRoute path="/folder/:id" component={ManageFolder} />
      <PrivateRoute path="/folder" component={ManageFolder} />
      {/* <PrivateRoute path="/bookmark/folder/:folderId" component={AddBookmark} /> */}
      <PrivateRoute path="/edit/bookmark/:id" component={EditBookmark} />
      <PrivateRoute path="/add/bookmark/:folderId" component={AddBookmark} />
      <PrivateRoute path="/add/bookmark" component={AddBookmark} />
      <Route component={NotFoundPage} />
    </Switch>
  </Router>
);

export default AppRouter;
