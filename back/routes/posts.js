const express = require('express');
const { Post, Image, User, Comment } = require('../models');
const router = express.Router();

router.get('/', async (req, res, next) => {
  // GET /posts
  try {
    const posts = await Post.findAll({
      limit: 10,
      order: [
        ['createdAt', 'DESC'],
        [Comment, 'createdAt', 'DESC'], // 내림차순
      ],
      include: [
        { model: User, attributes: ['id', 'nickname'] }, // 게시글 작성자
        { model: Image },
        {
          model: Comment, // 댓글 작성자
          include: [
            {
              model: User,
              attributes: ['id', 'nickname'],
              order: [['createdAt', 'DESC']],
            },
          ],
        },
        { model: User, as: 'Likers', attributes: ['id'] }, // 좋아요 작성자
      ],
    });
    res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
