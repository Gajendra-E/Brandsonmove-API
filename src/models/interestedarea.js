'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class InterestedArea extends Model {
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
  InterestedArea.init({
    meeting_requested_user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    area_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'InterestedArea',
  });
  return InterestedArea;
};