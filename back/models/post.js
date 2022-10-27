module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define(
    'Post',
    {
      // MySQL에는 Posts 테이블로 생성됌
      content: {
        type: DataTypes.TEXT, // 제한없이 무제한
        allowNull: false,
      },
    },
    {
      charset: 'utf8mb4', // 한글 + 이모티콘
      collate: 'utf8mb4_general_ci', // 한글 + 이모티콘 저장
    }
  );
  Post.associate = (db) => {
    db.Post.belongsTo(db.User); // 아래 주석식으로 다 생김
    db.Post.belongsToMany(db.Hashtag, { through: 'PostHashtag' }); // post.addHashtags 생김
    db.Post.hasMany(db.Comment);
    db.Post.hasMany(db.Image); // post.addImages 생김
    db.Post.belongsToMany(db.User, { through: 'Like', as: 'Likers' }); //post.addLikers,removeLikers가 생김
    db.Post.belongsTo(db.Post, { as: 'Retweet' }); // 리트윗  , post.addRetweet이 생김
  };
  return Post;
};
