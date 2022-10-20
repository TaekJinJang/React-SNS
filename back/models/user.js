module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      // MySQL에는 users 테이블로 생성됌
      email: {
        type: DataTypes.STRING(30),
        allowNull: false, // 필수라는 뜻
        unique: true,
      },
      nickname: {
        type: DataTypes.STRING(30),
        allowNull: false, // 필수라는 뜻
      },
      password: {
        type: DataTypes.STRING(100),
        allowNull: false, // 필수라는 뜻
      },
    },
    {
      charset: 'utf8', // 이걸 해줘야 한글 쓸 수 있음,
      collate: 'utf8_general_ci', // 이걸 해줘야 한글 쓸 수 있음,
    }
  );
  User.associate = (db) => {
    db.User.hasMany(db.Post); // 게시글
    db.User.hasMany(db.Comment);
    db.User.belongsToMany(db.Post, { through: 'Like', as: 'Liked' }); // 좋아요
    db.User.belongsToMany(db.User, {
      through: 'Follow',
      as: 'Followers',
      foreignKey: 'followingId', // 팔로워를 찾으려면 나(following)을 먼저 찾아야함
    }); // 팔로워
    db.User.belongsToMany(db.User, {
      through: 'Follow',
      as: 'Followings',
      foreignKey: 'followerId', // 팔로잉를 찾으려면 상대방(follower)를 먼저 찾아야함
    }); // 팔로잉
  };
  return User;
};
