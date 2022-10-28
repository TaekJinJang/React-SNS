const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');
const { User, Post } = require('../models');
const db = require('../models');
const router = express.Router();
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');

router.get('/', async (req, res, next) => {
  // GET / user
  try {
    if (req.user) {
      const fullUserWithoutPassword = await User.findOne({
        where: { id: req.user.id },
        attributes: {
          exclude: ['password'], // 보안을 위해 비밀번호를 제외하고 프론트로 데이터를 보냄
        },
        include: [
          {
            // model에 있는건 post hasMany를 써서 복수형으로 바뀌었기 때문에
            // 프론트에서는 me.Posts가 됌
            model: Post,
            attributes: ['id'],
          },
          {
            model: User,
            as: 'Followings', // as는 그대로 써줌
            attributes: ['id'],
          },
          {
            model: User,
            as: 'Followers', // as는 그대로 써줌
            attributes: ['id'],
          },
        ],
      });

      res.status(200).json(fullUserWithoutPassword);
    } else {
      res.status(200).json(null);
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.post('/login', isNotLoggedIn, (req, res, next) => {
  //POST /user/login
  console.log('gd');
  passport.authenticate(
    'local', // req,res,next 를 쓸 수 있게 미들웨어 확장
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
        const fullUserWithoutPassword = await User.findOne({
          where: { id: user.id },
          attributes: {
            exclude: ['password'], // 보안을 위해 비밀번호를 제외하고 프론트로 데이터를 보냄
          },
          include: [
            {
              // model에 있는건 post hasMany를 써서 복수형으로 바뀌었기 때문에
              // 프론트에서는 me.Posts가 됌
              model: Post,
              attributes: ['id'],
            },
            {
              model: User,
              as: 'Followings', // as는 그대로 써줌
              attributes: ['id'],
            },
            {
              model: User,
              as: 'Followers', // as는 그대로 써줌
              attributes: ['id'],
            },
          ],
        });
        return res.status(200).json(fullUserWithoutPassword);
      });
    }
  )(req, res, next);
});

router.post('/', isNotLoggedIn, async (req, res, next) => {
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
      return res.status(403).send('이미 사용중인 아이디입니다.');
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 10); // 비밀번호 암호화
    // 동기 비동기 확실하게 구분할 것
    await User.create({
      email: req.body.email,
      nickname: req.body.nickname,
      password: hashedPassword,
    });
    // res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");

    res.status(200).send('성공');
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.post('/logout', isLoggedIn, (req, res) => {
  console.log(req.user);
  req.logout();
  req.session.destroy();
  res.send('로그아웃 성공');
});
router.patch('/nickname', isLoggedIn, async (req, res, next) => {
  //PATCH /user/nickname
  try {
    await User.update(
      { nickname: req.body.nickname },
      { where: { id: req.user.id } }
    );
    res.status(200).json({ nickname: req.body.nickname });
  } catch (error) {
    console.error(error);
    next(error);
  }
});
router.patch('/:userId/follow', isLoggedIn, async (req, res, next) => {
  //PATCH /user/1/follow
  try {
    const user = await User.findOne({
      where: { id: req.params.userId },
    });
    if (!user) {
      return res.status(403).send('존재하지 않는 사용자입니다.');
    }
    await user.addFollowers(req.user.id);
    res.status(200).json({ UserId: parseInt(req.params.userId, 10) });
  } catch (error) {
    console.error(error);
    next(error);
  }
});
router.delete('/:userId/follow', isLoggedIn, async (req, res, next) => {
  //DELETE /user/1/follow
  try {
    const user = await User.findOne({
      where: { id: req.params.userId },
    });
    if (!user) {
      return res.status(403).send('존재하지 않는 사용자입니다.');
    }
    await user.removeFollowers(req.user.id);
    res.status(200).json({ UserId: parseInt(req.params.userId, 10) });
  } catch (error) {
    console.error(error);
    next(error);
  }
});
router.delete('/follower/:userId', isLoggedIn, async (req, res, next) => {
  //DELETE /user/follower/1
  try {
    const user = await User.findOne({
      where: { id: req.params.userId },
    });
    if (!user) {
      return res.status(403).send('존재하지 않는 사용자입니다.');
    }
    await user.removeFollowings(req.user.id);
    res.status(200).json({ UserId: parseInt(req.params.userId, 10) });
  } catch (error) {
    console.error(error);
    next(error);
  }
});
router.get('/followers', isLoggedIn, async (req, res, next) => {
  //GET /user/followers
  try {
    const user = await User.findOne({
      where: { id: req.user.id },
    });
    if (!user) {
      return res.status(403).send('존재하지 않는 사용자입니다.');
    }
    const followers = await user.getFollowers();
    res.status(200).json(followers);
  } catch (error) {
    console.error(error);
    next(error);
  }
});
router.get('/followings', isLoggedIn, async (req, res, next) => {
  //GET /user/followings
  try {
    const user = await User.findOne({
      where: { id: req.user.id },
    });
    if (!user) {
      return res.status(403).send('존재하지 않는 사용자입니다.');
    }
    const followings = await user.getFollowings();
    res.status(200).json(followings);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
