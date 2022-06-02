import { Card, List, Button } from "antd";
import PropTypes from "prop-types";
import { StopOutlined } from "@ant-design/icons";

const FollowList = ({ header, data }) => {
  return (
    <List
      style={{ marginBottom: 20 }}
      header={<div>{header}</div>}
      size="small"
      grid={{ gutter: 4, xs: 2, md: 3 }}
      loadMore={
        <div style={{ textAlign: "center", margin: "10px 0px" }}>
          <button>더 보기</button>
        </div>
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
};

FollowList.propTypes = {
  header: propTypes.string.isRequired,
  data: PropTypes.array.isRequired,
};

export default FollowList;
