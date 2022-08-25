import { Button, Form, Input } from "antd";
import { useCallback, useState } from "react";
import Link from "next/dist/client/link";
import styled from "styled-components";
import propTypes from "prop-types";
import useInput from "../hooks/useinput";
import AppLayout from "../components/AppLayout";
import { useDispatch } from "react-redux";
import { loginAction } from "../reducers";

const ButtonWrapper = styled.div`
  margin: 10px 0px;
`;

const FormWrapper = styled(Form)`
  padding: 10px;
`;

const LoginForm = () => {
  const dispatch = useDispatch();
  // const [id, setId] = useState("");
  // const onChangeId = useCallback((e) => {
  //   setId(e.target.value);
  // }, []);
  // 주석 코드들을 커스텀 hooks으로 만들어서 줄일 수 있음 useinput.js
  const [id, onChangeId] = useInput("");
  const [password, onChangePassword] = useInput("");

  // props로 받아오는 state들은 다 콜백함수를 써주는게 최적화에 좋다
  const onSubmitForm = useCallback(() => {
    console.log(id, password);
    dispatch(loginAction({ id, password }));
  }, [id, password]);
  return (
    <FormWrapper onFinish={onSubmitForm}>
      <div>
        <label htmlFor="user-id">아이디</label>
        <br />
        <Input name="user-id" value={id} onChange={onChangeId} required />
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
        <Button type="primary" htmlType="submit" loading={false}>
          로그인
        </Button>
        <Link href={"/signup"}>
          <a>
            <Button>회원가입</Button>
          </a>
        </Link>
      </ButtonWrapper>
    </FormWrapper>
  );
};

// props를 안받으니 주석
// LoginForm.propTypes = {
//   setIsLoggedIn: propTypes.func.isRequired,
// };

export default LoginForm;
