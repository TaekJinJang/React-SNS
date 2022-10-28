import { Card, List, Button } from 'antd';
import propTypes from 'prop-types';
import { StopOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { UNFOLLOW_REQUEST } from '../reducers/user';
import { REMOVE_POST_REQUEST } from '../reducers/post';

const Div = styled.div`
  margin: 10px 0px;
  text-align: center;
`;
function FollowList({ header, data }) {
  const dispatch = useDispatch();
  const onCancel = () => () => {
    // 고차함수 찾아보기
    if (header === '팔로잉') {
      dispatch({
        type: UNFOLLOW_REQUEST,
        data: id,
      });
    }
    dispatch({
      type: REMOVE_POST_REQUEST,
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
          <Button>더 보기</Button>
        </Div>
      }
      bordered
      dataSource={data}
      renderItem={(item) => {
        <List.Item style={{ marginTop: 20 }}>
          <Card
            actions={[<StopOutlined key="stop" onClick={onCancel(item.id)} />]}
            // 고차 함수를 사용해서 item.id로 값을 넘겨줌
          >
            {console.log(item.nickname)}
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
