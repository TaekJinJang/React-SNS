import { Card, List, Button } from 'antd';
import propTypes from 'prop-types';
import { StopOutlined } from '@ant-design/icons';
import styled from 'styled-components';

const Div = styled.div`
  margin: 10px 0px;
  text-align: center;
`;

function FollowList({ header, data }) {
  return (
    <List
      style={{ marginBottom: 20 }}
      header={<div>{header}</div>}
      size="small"
      grid={{ gutter: 4, xs: 2, md: 3 }}
      loadMore={
        <Div>
          <button>더 보기</button>
        </Div>
      }
      bordered
      dataSource={data}
      renderItem={(item) => {
        <List.Item style={{ marginTop: 20 }}>
          <Card actions={[<StopOutlined key="stop" />]}>
            <Card.Meta description={item.nickname} />
          </Card>
        </List.Item>;
      }}
    />
  );
}

FollowList.propTypes = {
  header: propTypes.string.isRequired,
  data: propTypes.array.isRequired,
};

export default FollowList;
