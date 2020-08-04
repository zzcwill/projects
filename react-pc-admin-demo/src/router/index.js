import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { getUserInfo } from "@/store/actions";
import Layout from "@/views/layout";
import Login from "@/views/login";
import { getToken } from "@/utils/config";
class Router extends React.Component {
  render() {
    const { userInfo, getUserInfo } = this.props;
    let token = getToken();
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route
            path="/"
            render={() => {
              if (!token) {
                return <Redirect to="/login" />;
              } else {
                if (userInfo.role) {
                  return <Layout />;
                } else {
                  getUserInfo().then(() => <Layout />);
                }
              }
            }}
          />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default connect((state) => state.user, { getUserInfo })(Router);
