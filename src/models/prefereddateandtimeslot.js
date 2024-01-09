'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PreferedDateAndTimeslot extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.MeetingRequestedUser, {
        foreignKey: 'meeting_requested_user_id',
        as: 'meetingRequestedUser'
      })
    }
  }
  PreferedDateAndTimeslot.init({
    meeting_requested_user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    time: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'PreferedDateAndTimeslot',
  });
  return PreferedDateAndTimeslot;
};