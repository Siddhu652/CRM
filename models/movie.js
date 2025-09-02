"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Movie extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Movie.belongsTo(models.Language, { foreignKey: "languageId" });
      Movie.belongsToMany(models.Genre, { through: models.MovieGenre });
      Movie.hasMany(models.Review, { foreignKey: "movieId" });
    }
  }
  Movie.init(
    {
      title: DataTypes.STRING,
      description: DataTypes.TEXT,
      releaseDate: DataTypes.DATE,
      posterUrl: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Movie",
    }
  );
  return Movie;
};
