import { Button, Form, Input } from 'antd';
import { useCallback } from 'react';
import Link from 'next/dist/client/link';
import styled from 'styled-components';

import { useDispatch, useSelector } from 'react-redux';
import useInput from '../hooks/useinput';

import { loginRequestAction } from '../reducers/user';

const ButtonWrapper = styled.div`
  margin: 10px 0px;
`;

const FormWrapper = styled(Form)`
  padding: 10px;
`;

function LoginForm() {
  const dispatch = useDispatch();
  // const [id, setId] = useState("");
  // const onChangeId = useCallback((e) => {
  //   setId(e.target.value);
  // }, []);
  // 주석 코드들을 커스텀 hooks으로 만들어서 줄일 수 있음 useinput.js
  const [email, onChangeEmail] = useInput('');
  const [password, onChangePassword] = useInput('');
  const { logInLoading } = useSelector((state) => state.user);

  // props로 받아오는 state들은 다 콜백함수를 써주는게 최적화에 좋다
  const onSubmitForm = useCallback(() => {
    console.log(email, password);
    dispatch(loginRequestAction({ email, password }));
  }, [email, password]);
  return (
    <FormWrapper onFinish={onSubmitForm}>
      <div>
        <label htmlFor="user-email">아이디</label>
        <br />
        <Input
          name="user-email"
          value={email}
          onChange={onChangeEmail}
          required
        />
      </div>
      <div>
        <label htmlFor="user-password">비밀번호</label>
        <br />
        <Input
          name="user-password"
          value={password}
          onChange={onChangePassword}
          required
        />
      </div>
      <ButtonWrapper>
        {/* 버튼에다 htmlType="submit" 을 해줘야 Form에 onFinish(PreventDefault)를 넣을 수 있음 */}
        <Button type="primary" htmlType="submit" loading={logInLoading}>
          로그인
        </Button>
        <Link href="/signup">
          <a>
            <Button>회원가입</Button>
          </a>
        </Link>
      </ButtonWrapper>
    </FormWrapper>
  );
}

// props를 안받으니 주석
// LoginForm.propTypes = {
//   setIsLoggedIn: propTypes.func.isRequired,
// };

export default LoginForm;
