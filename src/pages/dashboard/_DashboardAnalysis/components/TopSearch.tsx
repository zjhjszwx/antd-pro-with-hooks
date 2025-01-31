import { Card, Col, Icon, Row, Table, Tooltip, Dropdown, Menu } from 'antd';
import { FormattedMessage } from 'umi-plugin-react/locale';
import React from 'react';
import numeral from 'numeral';
import { SearchDataType, VisitDataType } from '../data.d';

import { MiniArea } from './Charts';
import NumberInfo from './NumberInfo';
import Trend from './Trend';
import styles from '../style.less';

const columns = [
  {
    title: <FormattedMessage id="BLOCK_NAME.table.rank" defaultMessage="Rank" />,
    dataIndex: 'index',
    key: 'index',
  },
  {
    title: (
      <FormattedMessage id="BLOCK_NAME.table.search-keyword" defaultMessage="Search keyword" />
    ),
    dataIndex: 'keyword',
    key: 'keyword',
    render: (text: React.ReactNode) => <a href="/">{text}</a>,
  },
  {
    title: <FormattedMessage id="BLOCK_NAME.table.users" defaultMessage="Users" />,
    dataIndex: 'count',
    key: 'count',
    sorter: (a: { count: number }, b: { count: number }) => a.count - b.count,
    className: styles.alignRight,
  },
  {
    title: <FormattedMessage id="BLOCK_NAME.table.weekly-range" defaultMessage="Weekly Range" />,
    dataIndex: 'range',
    key: 'range',
    sorter: (a: { range: number }, b: { range: number }) => a.range - b.range,
    render: (text: React.ReactNode, record: { status: number }) => (
      <Trend flag={record.status === 1 ? 'down' : 'up'}>
        <span style={{ marginRight: 4 }}>{text}%</span>
      </Trend>
    ),
  },
];
export interface TopSearchProps {
  loading: boolean;
  visitData2: VisitDataType[];
  searchData: SearchDataType[];
}

export const dropdownGroup = (
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


const TopSearch = ({
  loading,
  visitData2,
  searchData,
}: TopSearchProps) => {

  return (
    <Card
      loading={loading}
      bordered={false}
      title={
        <FormattedMessage
          id="BLOCK_NAME.analysis.online-top-search"
          defaultMessage="Online Top Search"
        />
      }
      extra={dropdownGroup}
      style={{
        height: '100%',
      }}
    >
      <Row gutter={68} type="flex">
        <Col sm={12} xs={24} style={{ marginBottom: 24 }}>
          <NumberInfo
            subTitle={
              <span>
                <FormattedMessage
                  id="BLOCK_NAME.analysis.search-users"
                  defaultMessage="search users"
                />
                <Tooltip
                  title={
                    <FormattedMessage id="BLOCK_NAME.analysis.introduce" defaultMessage="introduce" />
                  }
                >
                  <Icon style={{ marginLeft: 8 }} type="info-circle-o" />
                </Tooltip>
              </span>
            }
            gap={8}
            total={numeral(12321).format('0,0')}
            status="up"
            subTotal={17.1}
          />
          <MiniArea line height={45} data={visitData2} />
        </Col>
        <Col sm={12} xs={24} style={{ marginBottom: 24 }}>
          <NumberInfo
            subTitle={
              <span>
                <FormattedMessage
                  id="BLOCK_NAME.analysis.per-capita-search"
                  defaultMessage="Per Capita Search"
                />
                <Tooltip
                  title={
                    <FormattedMessage id="BLOCK_NAME.analysis.introduce" defaultMessage="introduce" />
                  }
                >
                  <Icon style={{ marginLeft: 8 }} type="info-circle-o" />
                </Tooltip>
              </span>
            }
            total={2.7}
            status="down"
            subTotal={26.2}
            gap={8}
          />
          <MiniArea line height={45} data={visitData2} />
        </Col>
      </Row>
      <Table<any>
        rowKey={record => record.index}
        size="small"
        columns={columns}
        dataSource={searchData}
        pagination={{
          style: { marginBottom: 0 },
          pageSize: 5,
        }}
      />
    </Card>
  )
};

export default TopSearch;
