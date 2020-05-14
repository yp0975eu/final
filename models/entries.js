'use strict';
module.exports = (sequelize, DataTypes) => {
  const Entries = sequelize.define('Entries', {
    date: DataTypes.DATE,
    value: DataTypes.INTEGER,
    note: DataTypes.TEXT
  }, {});
  Entries.associate = function(models) {
    // associations can be defined here
  };
  return Entries;
};