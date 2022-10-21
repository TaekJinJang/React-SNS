// 코드의 중복을 막기위해 미들웨어를 사용하는 경우가 많음
exports.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(401).send("로그인이 필요합니다.");
  }
};
exports.isNotLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    next();
  } else {
    res.status(401).send("비로그인 사용자만 접근 가능합니다.");
  }
};
