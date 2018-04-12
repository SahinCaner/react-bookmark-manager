import React from "react";
import { Router, Route, Switch, Link, NavLink } from "react-router-dom";
import createBrowserHistory from "history/createBrowserHistory";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
// import DashboardPage from "../components/dashboard/DashboardPage";
import NotFoundPage from "../components/common/NotFoundPage";
import LoginPage from "../components/login/LoginPage";

import FolderPage from "../components/folder/FolderPage";
import AddFolder from "../components/folder/AddFolder";
import EditFolder from "../components/folder/EditFolder";

import FolderListPage from "../components/folder-list/FolderListPage";
import BookmarkListPage from "../components/bookmark-list/BookmarkListPage";

import EditBookmark from "../components/bookmark/EditBookmark";
import AddBookmark from "../components/bookmark/AddBookmark";

// import UserSettingsPage from "../components/user-settings/UserSettingsPage";

export const history = createBrowserHistory();

const AppRouter = () => (
  <Router history={history}>
    <Switch>
      <PublicRoute path="/" component={LoginPage} exact={true} />
      {/* <PrivateRoute path="/dashboard" component={DashboardPage} /> */}

      {/* <PrivateRoute path="/settings" component={UserSettingsPage} /> */}

      <PrivateRoute path="/folders" component={FolderListPage} />
      <PrivateRoute path="/edit/folder/:id" component={EditFolder} />
      <PrivateRoute path="/folder/:id" component={FolderPage} />
      <PrivateRoute path="/add/folder" component={AddFolder} />

      <PrivateRoute path="/bookmarks" component={BookmarkListPage} />
      <PrivateRoute path="/edit/bookmark/:id" component={EditBookmark} />
      <PrivateRoute path="/add/bookmark/:folderId" component={AddBookmark} />
      <PrivateRoute path="/add/bookmark" component={AddBookmark} />
      <Route component={NotFoundPage} />
    </Switch>
  </Router>
);

export default AppRouter;
