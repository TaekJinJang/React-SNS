import PropTypes from 'prop-types';
import Link from 'next/link';
import { Menu, Input, Row, Col } from 'antd';

import styled, { createGlobalStyle } from 'styled-components';
import { useSelector } from 'react-redux';

import UserProfile from './UserProfile';
// eslint-disable-next-line import/no-cycle
import LoginForm from './LoginForm';

const SearchInput = styled(Input.Search)`
  // antd 디자인에 styled-component넣는법
  vertical-align: 'middle';
`;
const Global = createGlobalStyle`
  .ant-row {
    margin-right: 0 !important;
    margin-left: 0 !important;
  }
  .ant-col:first-child {
    padding-left: 0 !important
  }/
  .ant-col:last-child {
    padding-right: 0 !important;
  }
`;
function AppLayout({ children }) {
  // const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 더미데이터
  const { me } = useSelector((state) => state.user);

  return (
    <div>
      <Menu mode="horizontal">
        <Global />
        <Menu.Item>
          <Link href="/">
            <a>노드버드</a>
          </Link>
        </Menu.Item>
        <Menu.Item>
          <Link href="/profile">
            <a>프로필</a>
          </Link>
        </Menu.Item>
        <Menu.Item>
          <SearchInput placeholder="검색" allowClear enterButton />
        </Menu.Item>
        <Menu.Item>
          <Link href="/signup">
            <a>회원가입</a>
          </Link>
        </Menu.Item>
      </Menu>

      {/* gutter 는 Col 사이의 간격 */}
      <Row gutter={8}>
        <Col xs={24} md={6}>
          {me ? <UserProfile /> : <LoginForm />}
        </Col>
        <Col xs={24} md={12}>
          {children}
        </Col>
        <Col xs={24} md={6}>
          {/* target="_black" 를 쓸 때는 보안에 위협이 있기 때문에 항상 rel='norefe~ 을 꼭 써줘야함 */}
          <a
            href="https://velog.io/@taek_jini"
            target="_blank"
            rel="noreferrer"
          >
            Made by Taek_jini
          </a>
        </Col>
      </Row>
    </div>
  );
}

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppLayout;
