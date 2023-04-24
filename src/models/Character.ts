import {Model, DataTypes} from "sequelize";
import { sequelize } from "../util/database";

export class Character extends Model { };

Character.init({
  CharID: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true
  },
  CharName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Abbrev: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Works: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Description: {
    type: DataTypes.STRING,
    allowNull: true
  },
  SpeechCount: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  sequelize,
  modelName: "Character",
  timestamps: false
});