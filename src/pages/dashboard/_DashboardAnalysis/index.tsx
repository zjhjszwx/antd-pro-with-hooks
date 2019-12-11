/* import { Col, Dropdown, Icon, Menu, Row } from "antd";
import React, { Component, Suspense, useEffect, useState } from "react";

import { Dispatch } from "redux";
import { GridContent } from "@ant-design/pro-layout";
import { RadioChangeEvent } from "antd/es/radio";
import { RangePickerValue } from "antd/es/date-picker/interface";
import { connect } from "dva";
import PageLoading from "./components/PageLoading";
import { getTimeDistance } from "./utils/utils";
import { AnalysisData } from "./data.d";
import styles from "./style.less";

// 我添加的
import { fakeChartData } from "./service";
import { useDispatch, useSelector } from "dva";

import IntroduceRow from "./components/IntroduceRow";
import SalesCard from "./components/SalesCard";
import TopSearch from "./components/TopSearch";
import ProportionSales from "./components/ProportionSales";
import OfflineData from "./components/OfflineData";

interface PAGE_NAME_UPPER_CAMEL_CASEProps {
  BLOCK_NAME_CAMEL_CASE: AnalysisData;
  dispatch: Dispatch<any>;
  loading: boolean;
}

interface PAGE_NAME_UPPER_CAMEL_CASEState {
  salesType: "all" | "online" | "stores";
  currentTabKey: string;
  rangePickerValue: RangePickerValue;
}

@connect(
  ({
    BLOCK_NAME_CAMEL_CASE,
    loading
  }: {
    BLOCK_NAME_CAMEL_CASE: any;
    loading: {
      effects: { [key: string]: boolean };
    };
  }) => ({
    BLOCK_NAME_CAMEL_CASE,
    loading: loading.effects["BLOCK_NAME_CAMEL_CASE/fetch"]
  })
)
class PAGE_NAME_UPPER_CAMEL_CASE extends Component<
  PAGE_NAME_UPPER_CAMEL_CASEProps,
  PAGE_NAME_UPPER_CAMEL_CASEState
> {
  state: PAGE_NAME_UPPER_CAMEL_CASEState = {
    salesType: "all",
    currentTabKey: "",
    rangePickerValue: getTimeDistance("year")
  };

  reqRef: number = 0;

  timeoutId: number = 0;

  componentDidMount() {
    const { dispatch } = this.props;
    this.reqRef = requestAnimationFrame(() => {
      dispatch({
        type: "BLOCK_NAME_CAMEL_CASE/fetch"
      });
    });
  }

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch({
      type: "BLOCK_NAME_CAMEL_CASE/clear"
    });
    cancelAnimationFrame(this.reqRef);
    clearTimeout(this.timeoutId);
  }

  handleChangeSalesType = (e: RadioChangeEvent) => {
    this.setState({
      salesType: e.target.value
    });
  };

  handleTabChange = (key: string) => {
    this.setState({
      currentTabKey: key
    });
  };

  handleRangePickerChange = (rangePickerValue: RangePickerValue) => {
    const { dispatch } = this.props;
    this.setState({
      rangePickerValue
    });

    dispatch({
      type: "BLOCK_NAME_CAMEL_CASE/fetchSalesData"
    });
  };

  selectDate = (type: "today" | "week" | "month" | "year") => {
    const { dispatch } = this.props;
    this.setState({
      rangePickerValue: getTimeDistance(type)
    });

    dispatch({
      type: "BLOCK_NAME_CAMEL_CASE/fetchSalesData"
    });
  };

  isActive = (type: "today" | "week" | "month" | "year") => {
    const { rangePickerValue } = this.state;
    const value = getTimeDistance(type);
    if (!rangePickerValue[0] || !rangePickerValue[1]) {
      return "";
    }
    if (
      rangePickerValue[0].isSame(value[0], "day") &&
      rangePickerValue[1].isSame(value[1], "day")
    ) {
      return styles.currentDate;
    }
    return "";
  };

  render() {
    const { rangePickerValue, salesType, currentTabKey } = this.state;
    const { BLOCK_NAME_CAMEL_CASE, loading } = this.props;
    const {
      visitData,
      visitData2,
      salesData,
      searchData,
      offlineData,
      offlineChartData,
      salesTypeData,
      salesTypeDataOnline,
      salesTypeDataOffline
    } = BLOCK_NAME_CAMEL_CASE;
    let salesPieData;
    if (salesType === "all") {
      salesPieData = salesTypeData;
    } else {
      salesPieData =
        salesType === "online" ? salesTypeDataOnline : salesTypeDataOffline;
    }
    const menu = (
      <Menu>
        <Menu.Item>操作一</Menu.Item>
        <Menu.Item>操作二</Menu.Item>
      </Menu>
    );

    const dropdownGroup = (
      <span className={styles.iconGroup}>
        <Dropdown overlay={menu} placement="bottomRight">
          <Icon type="ellipsis" />
        </Dropdown>
      </span>
    );

    const activeKey = currentTabKey || (offlineData[0] && offlineData[0].name);
    return (
      <GridContent>
        <React.Fragment>
          <Suspense fallback={<PageLoading />}>
            <IntroduceRow loading={loading} visitData={visitData} />
          </Suspense>
          <Suspense fallback={null}>
            <SalesCard
              rangePickerValue={rangePickerValue}
              salesData={salesData}
              isActive={this.isActive}
              handleRangePickerChange={this.handleRangePickerChange}
              loading={loading}
              selectDate={this.selectDate}
            />
          </Suspense>
          <Row
            gutter={24}
            type="flex"
            style={{
              marginTop: 24
            }}
          >
            <Col xl={12} lg={24} md={24} sm={24} xs={24}>
              <Suspense fallback={null}>
                <TopSearch
                  loading={loading}
                  visitData2={visitData2}
                  searchData={searchData}
                  dropdownGroup={dropdownGroup}
                />
              </Suspense>
            </Col>
            <Col xl={12} lg={24} md={24} sm={24} xs={24}>
              <Suspense fallback={null}>
                <ProportionSales
                  dropdownGroup={dropdownGroup}
                  salesType={salesType}
                  loading={loading}
                  salesPieData={salesPieData}
                  handleChangeSalesType={this.handleChangeSalesType}
                />
              </Suspense>
            </Col>
          </Row>
          <Suspense fallback={null}>
            <OfflineData
              activeKey={activeKey}
              loading={loading}
              offlineData={offlineData}
              offlineChartData={offlineChartData}
              handleTabChange={this.handleTabChange}
            />
          </Suspense>
        </React.Fragment>
      </GridContent>
    );
  }
}
 */


import { Col, Dropdown, Icon, Menu, Row } from "antd";
import React, { Suspense, useEffect, useState } from "react";
import { GridContent } from "@ant-design/pro-layout";
import { useSelector, useDispatch } from "dva";
import PageLoading from "./components/PageLoading";
import { getTimeDistance } from "./utils/utils";
import { AnalysisData } from "./data.d";
import { RangePickerValue } from "antd/es/date-picker/interface";
import styles from "./style.less";

const IntroduceRow = React.lazy(() => import("./components/IntroduceRow"));
const SalesCard = React.lazy(() => import("./components/SalesCard"));
const TopSearch = React.lazy(() => import("./components/TopSearch"));
const ProportionSales = React.lazy(() =>
  import("./components/ProportionSales")
);
const OfflineData = React.lazy(() => import("./components/OfflineData"));

export interface LoadingEffect {
  effects: {
    [key: string]: boolean;
  };
  global: boolean;
  models: {
    [key: string]: boolean;
  };
}

export type SalesType = "all" | "online" | "stores";
export type DateType = "today" | "week" | "month" | "year";

export default function AnalysisFC() {
  const dashboardAnalysis = useSelector<any, AnalysisData>(
    state => state.dashboardAnalysis
  );
  const loadingEffect = useSelector<any, LoadingEffect>(state => state.loading);
  const loading = loadingEffect.effects["dashboardAnalysis/fetch"];
  const dispatch = useDispatch();


  const [salesType, setSalesType] = useState<SalesType>("all");
  const [currentTabKey, setCurrentTabKey] = useState("");
  const [rangePickerValue, setRangePickerValue] = useState(
    getTimeDistance("year")
  );

  const {
    visitData,
    visitData2,
    salesData,
    searchData,
    offlineData,
    offlineChartData,
    salesTypeData,
    salesTypeDataOnline,
    salesTypeDataOffline
  } = dashboardAnalysis;

  useEffect(() => {
    dispatch({ type: "dashboardAnalysis/fetch" });
  }, []);

  const isActive = (type: DateType) => {
    const value = getTimeDistance(type);
    if (!rangePickerValue[0] || !rangePickerValue[1]) {
      return "";
    }
    if (
      rangePickerValue[0].isSame(value[0], "day") &&
      rangePickerValue[1].isSame(value[1], "day")
    ) {
      return styles.currentDate;
    }
    return "";
  };

  const handleRangePickerChange = (rangePickerValue: RangePickerValue) => {
    setRangePickerValue(rangePickerValue);
    dispatch({
      type: "dashboardAnalysis/fetchSalesData"
    });
  };

  const selectDate = (type: DateType) => {
    setRangePickerValue(getTimeDistance(type));
    dispatch({
      type: "dashboardAnalysis/fetchSalesData"
    });
  };

  const dropdownGroup = (
    <span className={styles.iconGroup}>
      <Dropdown
        overlay={
          <Menu>
            <Menu.Item>操作一</Menu.Item>
            <Menu.Item>操作二</Menu.Item>
          </Menu>
        }
        placement="bottomRight"
      >
        <Icon type="ellipsis" />
      </Dropdown>
    </span>
  );

  const salesPieData = {
    all: salesTypeData,
    online: salesTypeDataOnline,
    stores: salesTypeDataOffline
  }[salesType];
  const activeKey = currentTabKey || (offlineData[0] && offlineData[0].name);

  return (
    <GridContent>
      <Suspense fallback={<PageLoading />}>
        <IntroduceRow loading={loading} visitData={visitData} />
      </Suspense>

      <Suspense fallback={null}>
        <SalesCard
          rangePickerValue={rangePickerValue}
          salesData={salesData}
          isActive={isActive}
          handleRangePickerChange={handleRangePickerChange}
          loading={loading}
          selectDate={selectDate}
        />
      </Suspense>

      <Row gutter={24} type="flex" style={{ marginTop: 24 }}>
        <Col xl={12} lg={24} md={24} sm={24} xs={24}>
          <Suspense fallback={null}>
            <TopSearch
              loading={loading}
              visitData2={visitData2}
              searchData={searchData}
              dropdownGroup={dropdownGroup}
            />
          </Suspense>
        </Col>
        <Col xl={12} lg={24} md={24} sm={24} xs={24}>
          <Suspense fallback={null}>
            <ProportionSales
              dropdownGroup={dropdownGroup}
              salesType={salesType}
              loading={loading}
              salesPieData={salesPieData}
              handleChangeSalesType={e => setSalesType(e.target.value)}
            />
          </Suspense>
        </Col>
      </Row>

      <Suspense fallback={null}>
        <OfflineData
          activeKey={activeKey}
          loading={loading}
          offlineData={offlineData}
          offlineChartData={offlineChartData}
          handleTabChange={setCurrentTabKey}
        />
      </Suspense>
    </GridContent>
  );
}
