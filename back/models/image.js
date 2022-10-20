module.exports = (sequelize, DataTypes) => {
  const Image = sequelize.define(
    'Image',
    {
      // MySQL에는 Images 테이블로 생성됌
      src: {
        type: DataTypes.STRING(200),
        allowNull: true,
      },
    },
    {
      charset: 'utf8', // 한글 + 이모티콘
      collate: 'utf8_general_ci', // 한글 + 이모티콘 저장
    }
  );
  Image.associate = (db) => {
    db.Image.belongsTo(db.Post);
  };
  return Image;
};
