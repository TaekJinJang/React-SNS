import { Card, List, Button } from 'antd';
import propTypes from 'prop-types';
import { StopOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { REMOVE_FOLLOWER_REQUEST, UNFOLLOW_REQUEST } from '../reducers/user';

const Div = styled.div`
  margin: 10px 0px;
  text-align: center;
`;
function FollowList({ header, data, onClickMore, loading }) {
  const dispatch = useDispatch();
  const onCancel = (id) => () => {
    // 고차함수 찾아보기
    if (header === '팔로잉') {
      dispatch({
        type: UNFOLLOW_REQUEST,
        data: id,
      });
    }
    dispatch({
      type: REMOVE_FOLLOWER_REQUEST,
      data: id,
    });
  };

  return (
    <List
      style={{ marginBottom: 20 }}
      header={<div>{header}</div>}
      size="small"
      grid={{ gutter: 4, xs: 2, md: 3 }}
      loadMore={
        <Div>
          <Button onClick={onClickMore} loading={loading}>
            더 보기
          </Button>
        </Div>
      }
      bordered
      dataSource={data}
      renderItem={(item) => (
        <List.Item style={{ marginTop: 20 }}>
          <Card
            actions={[<StopOutlined key="stop" onClick={onCancel(item.id)} />]}
          >
            <Card.Meta description={item.nickname} />
          </Card>
        </List.Item>
      )}
    />
  );
}

FollowList.propTypes = {
  header: propTypes.string.isRequired,
  data: propTypes.array.isRequired,
  onClickMore: propTypes.func.isRequired,
  loading: propTypes.bool.isRequired,
};

export default FollowList;
