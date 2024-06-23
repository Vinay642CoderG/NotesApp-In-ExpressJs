const { Model, DataTypes } = require('sequelize')
const sequelize = require("../database")
class Notes extends Model {}

Notes.init({
  title:{
    type: DataTypes.CHAR(length=100),
    allowNull: false,
  },
  description:{
    type: DataTypes.TEXT(length=250),
    allowNull: false,
  }
},
{
  timestamps: true,
  createdAt:"createdAt",
  updatedAt:"updatedAt",
  sequelize,
  modelName: "Notes",
})

module.exports = Notes;