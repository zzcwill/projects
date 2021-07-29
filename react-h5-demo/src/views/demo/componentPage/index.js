import React, { useState, useEffect, useCallback } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import "./index.less";

import Pie from '@/components/Pie'

const ComponentPage = (props) => {
  const { userInfo, history } = props;

  let [subInfo, setSubInfo] = useState('')

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
    console.info(this)
    console.info(item)
    setSubInfo(item)
    func()
  }

  const useSyncCallback = callback => {
    const [proxyState, setProxyState] = useState({ current: false })

    const Func = useCallback(() => {
        setProxyState({ current: true })
    }, [proxyState])

    useEffect(() => {
        if (proxyState.current === true) setProxyState({ current: false })
    }, [proxyState])

    useEffect(() => {
        proxyState.current && callback()
    })

    return Func
  }


  const func = useSyncCallback(() => {
    console.info(subInfo);
  });


  useEffect(() => {
  })

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
        // clickItem={clickItem}
      />
    </div>
  );
};


const mapStateToProps = (state) => {
  return {
    ...state.user
  };
};
export default withRouter(
  connect(mapStateToProps)(ComponentPage)
);

