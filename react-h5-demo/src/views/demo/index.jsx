import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
// import "./index.less";

const Demo = (props) => {
  const { userInfo, history } = props;

  const initRoutes = [
    {
      name: 'chart',
      path: '/demo/chart',
      query: {},
    },	
    {
      name: 'store',
      path: '/demo/store',
      query: {
      },
    },
    {
      name: 'component',
      path: '/demo/component',
      query: {
      },
    },
    {
      name: 'component2',
      path: '/demo/component2',
      query: {
      },
    },  
    {
      name: 'portals',
      path: '/demo/portals',
      query: {
      },
    },
    {
      name: 'img',
      path: '/demo/img',
      query: {
      },
    },
    {
      name: 'css',
      path: '/demo/css',
      query: {
        name: 'css'
      },
    },
    {
      name: 'ref',
      path: '/demo/ref',
      query: {
        name: 'ref'
      },
    }            
  ]
  const [routes, setRoutes] = useState(initRoutes);

  const [num, setNum] = useState(0);

  const chanegNum = () =>{
    setNum(num+1)
  }

  const toRouter = (item) => {
    console.info({pathname: item.path, state: item.query})
    history.push({pathname: item.path, state: item.query});
    // history.push(item.path);
  }

  const routeItems = routes.map((item, index) =>
    <div className="item" key={index}>
      <div onClick={toRouter.bind(this, item)}>{ item.name }</div>
      <div className="dot"></div>
    </div>
  );

  return (
    <div className='demo'>
      <div>{ routeItems }</div>
      <br />
      <br />
      <div onClick={chanegNum}>{ num }</div>
    </div>
  );
};


const mapStateToProps = (state) => {
  return {
    ...state.user
  };
};
export default withRouter(
  connect(mapStateToProps)(Demo)
);
