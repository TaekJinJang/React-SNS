module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
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
      charset: "utf8", // 이걸 해줘야 한글 쓸 수 있음,
      collate: "utf8_general_ci", // 이걸 해줘야 한글 쓸 수 있음,
    }
  );
  User.associate = (db) => {};
  return User;
};
