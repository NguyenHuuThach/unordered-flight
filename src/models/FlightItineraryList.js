const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class FlightItineraryList extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }

  FlightItineraryList.init(
    {
      list: DataTypes.STRING,
      ip: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "itineraries",
      underscored: true,
    }
  );
  return FlightItineraryList;
};
