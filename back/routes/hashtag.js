const express = require("express");
const { Hashtag, User, Image, Comment, Post } = require("../models");
const router = express.Router();
const { Op } = require("sequelize");

router.get("/:hashtag", async (req, res, next) => {
  // GET /hashtag/해시태그
  try {
    const where = { UserId: req.params.userId };
    if (parseInt(req.query.lastId, 10)) {
      // 초기 로딩이 아닐 때
      where.id = { [Op.lt]: parseInt(req.query.lastId, 10) };
    }
    const posts = await Post.findAll({
      where,
      limit: 10,
      include: [
        {
          model: Hashtag,
          // 그냥 ${data}로 하면 한글이 되기때문에 에러가 뜸 그래서 encodeURIComponent로 변형시켰다가 decodeURIComponent로 바꿔옴
          where: { name: decodeURIComponent(req.params.hashtag) },
        },
        { model: User, attributes: ["id", "nickname"] }, // 게시글 작성자
        { model: Image },
        {
          model: Comment, // 댓글 작성자
          include: [
            {
              model: User,
              attributes: ["id", "nickname"],
              order: [["createdAt", "DESC"]],
            },
          ],
        },
        {
          model: Post,
          as: "Retweet",
          include: [
            {
              model: User,
              attributes: ["id", "nickname"],
            },
            {
              model: Image,
            },
            {
              model: User,
              as: "Likers",
              attributes: ["id"],
            },
          ],
        },
        { model: User, as: "Likers", attributes: ["id"] }, // 좋아요 작성자
      ],
    });
    res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
