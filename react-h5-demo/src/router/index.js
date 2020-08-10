import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { togetInfo } from "@/store/actions";
// import { getToken, removeToken } from "@/utils/config";
import app from "@/router/app";

class Router extends React.Component {
  render() {
    // const { userInfo, togetInfo } = this.props;
    return (
      <BrowserRouter>
        <Switch>
          <Redirect exact from="/" to="/login" />
          {app.map((route) => {
            return (
              <Route
                component={route.component}
                key={route.path}
                path={route.path}
              />
            );
          })}
        </Switch>
      </BrowserRouter>
    );
  }
}

export default connect((state) => state.user, { togetInfo })(Router);
