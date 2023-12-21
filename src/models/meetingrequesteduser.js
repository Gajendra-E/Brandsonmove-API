'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MeetingRequestedUser extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.InterestedArea,{
        foreignKey: "meeting_requested_user_id",
        as:"interestedAreas"
      })
      this.hasMany(models.PreferedDateAndTimeslot,{
        foreignKey: "meeting_requested_user_id",
        as:"preferedDateAndTimeslots"
      })
    }
  }
  MeetingRequestedUser.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    company: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'MeetingRequestedUser',
  });
  return MeetingRequestedUser;
};