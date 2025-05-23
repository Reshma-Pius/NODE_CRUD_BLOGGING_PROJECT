'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Post.belongsTo(models.User, { foreignKey: 'userId' });
      // Post belongs to many Categories through PostCategory
      Post.belongsToMany(models.Category, {
        through: models.PostCategory,
        foreignKey: 'postId',
        otherKey: 'categoryId',
      });

    }
  }
  Post.init({
    title: DataTypes.STRING,
    content: DataTypes.TEXT,
    imageUrl: DataTypes.STRING,
    categoryId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};