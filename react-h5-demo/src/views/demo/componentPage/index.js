import React, { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { setUserInfo } from "@/store/actions/user"
import "./index.less";

import Pie from '@/components/Pie'

const ComponentPage = (props) => {
  // const { userInfo, history } = props;
  const { history } = props;

  let [subInfo, setSubInfo] = useState('')
  let [subInfo2, setSubInfo2] = useState('')

  const dispatch = useDispatch();

  const setUser = useCallback(
    () => {
      console.info('dispatch')
      let user = {
        name: 'zzc-test'
      }
      dispatch(setUserInfo(user));
    },
    [dispatch]
  );  


  const { userInfo } = useSelector((state) => state.user);

  const [pieOption, setPieOption] = useState(
    {
      domId: 'chart',
      chart: null,
      colorArr: ['#86D9E0', '#E086CE', '#8184D6'],
      seriesName: ['发起', '完成', '通过'],
      xAxisData: ['11-01', '11-02', '11-03', '11-04', '11-05', '11-06', '11-07'],
      yAxisName: '笔数',
      seriesData: [
        [0, 20, 15, 40, 50, 70, 100],
        [0, 10, 15, 20, 25, 30, 40],
        [0, 4, 15, 8, 10, 10, 10]
      ]
    }
  );

  const clickItem = (item) => {
    console.info(item)
    setSubInfo(item)
  }

  let [count, setConut] = useState(0)
  let double = useMemo(()=>{
    return count*2
  },[count])
  let double2 = count*2

  useEffect(() => {
    console.info(2)
  },[])

  console.info(1)

  useEffect(() => {
    console.info(3)
    console.info(subInfo)
  }, [subInfo])

  useEffect(() => {
    console.info(4)
    console.info(subInfo2)
  }, [subInfo2])

  return (
    <div>
      <Pie
        domId={pieOption.domId}
        chart={pieOption.chart}
        colorArr={pieOption.colorArr}
        seriesName={pieOption.seriesName}
        xAxisData={pieOption.xAxisData}
        yAxisName={pieOption.yAxisName}
        seriesData={pieOption.seriesData}
        clickItem={clickItem}
      />
      <br />
      <div>{userInfo.name}</div>
      <br />
      <div onClick={setUser}>change-store-name</div>
      <br />
      <div>{count}</div>
      <div>{double}</div>
      <div>{double2}</div>
      <div onClick={()=> { setConut(count+1) }}>add-count</div>
    </div>
  );
};


// const mapStateToProps = (state) => {
//   return {
//     ...state.user
//   };
// };
// export default withRouter(
//   connect(mapStateToProps)(ComponentPage)
// );

export default withRouter(ComponentPage);
