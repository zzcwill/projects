import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { togetInfo } from "@/store/actions";
import Layout from "@/views/layout";
import Login from "@/views/login";
import { getToken, removeToken } from "@/utils/config";

class Router extends React.Component {
  render() {
    const { userInfo, togetInfo } = this.props;
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route
            path="/"
            render={() => {
              if (!getToken()) {
                return <Redirect to="/login" />;
              } 


              if(getToken()) {
                if( window.location.pathname === '/' ) {
                  return <Redirect to="/dashboard" />;
                }

                if (userInfo !== '') {
                  return <Layout />;
                } 
                
                if (userInfo === '') {
                  togetInfo()
                  .then(() => <Layout />)
                  .catch((error) => {
                    removeToken();
                    return <Redirect to="/login" />;  
                  });
                }
              }
            }}
          />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default connect((state) => state.user, { togetInfo })(Router);
