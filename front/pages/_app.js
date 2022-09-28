import 'antd/dist/antd.css';
import { PropTypes } from 'prop-types';
import Head from 'next/head'; // next에서 제공하는 head 태그
import wrapper from '../store/configureStore';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// pages 폴더의 공통 부분, import도 다 포함
// 특정 컴포넌트들에만 공통으로 들어간다면 components 폴더에 AppLayout 같은 컴포넌트를 만들어서 사용하고 모든 페이지에 공통적으로 사용된다면 _app.js 형식으로 사용
//
function App({ Component }) {
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <title>NodeBird</title>
      </Head>
      <Component />
    </>
  );
}

App.prototype = {
  // 프로토타입은 귀찮긴하지만 안정화를 위해 하는게 좋음
  Component: PropTypes.elementType.isRequired,
};

export default wrapper.withRedux(App);
