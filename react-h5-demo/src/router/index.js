import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { togetInfo } from "@/store/actions";
// import { getToken, removeToken } from "@/utils/config";
import app from "@/router/app";
import demo from "@/router/demo";

const constantRoutes = app.concat(demo)

class Router extends React.Component {
  render() {
    // const { userInfo, togetInfo } = this.props;
    return (
      <BrowserRouter>
        <Switch>
          <Redirect exact from="/" to="/login" />
          {constantRoutes.map((route) => {
            return (
              <Route
                component={route.component}
                key={route.path}
                path={route.path}
              />
            );
          })}
          <Redirect exact from="/*" to="/login" />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default connect((state) => state.user, { togetInfo })(Router);
