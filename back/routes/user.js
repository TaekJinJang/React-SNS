const express = require("express");
const bcrypt = require("bcrypt");
const passport = require("passport");
const { User } = require("../models");
const router = express.Router();

router.post("/login", (req, res, next) => {
  passport.authenticate(
    "local", // req,res,next 를 쓸 수 있게 미들웨어 확장
    (err, user, info) => {
      if (err) {
        console.error(err);
        return next(err);
      }
      if (info) {
        // 클라이언트 에러
        return res.status(401).send(info.reason);
      }
      return req.login(user, async (loginErr) => {
        if (loginErr) {
          console.error(loginErr);
          return next(loginErr);
        }
        return res.json(user);
      });
    }
  )(req, res, next);
});

router.post("/", async (req, res, next) => {
  try {
    const exUser = await User.findOne({
      // 이메일 중복 확인
      where: {
        // 찾을 땐 where 안에서 찾기
        email: req.body.email,
      },
    });
    if (exUser) {
      // status(403)은 금지라는 의미 , 200은 성공 400은 클라이언트 오류 500은 서버 오류
      return res.status(403).send("이미 사용중인 아이디입니다.");
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 10); // 비밀번호 암호화
    // 동기 비동기 확실하게 구분할 것
    await User.create({
      email: req.body.email,
      nickname: req.body.nickname,
      password: hashedPassword,
    });
    // res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");

    res.status(200).send("성공");
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
