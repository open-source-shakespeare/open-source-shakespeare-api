import * as Sequelize from "sequelize";
import { DataTypes, Model } from "sequelize";

export interface CharacterAttributes {
  CharID: string;
  CharName: string;
  Abbrev?: string;
  Works: string;
  Description: string;
  SpeechCount?: number;
}

export type CharacterId = Character["CharID"];

export class Character extends Model<CharacterAttributes> implements CharacterAttributes {
  declare CharID: CharacterAttributes["CharID"];
  declare CharName: CharacterAttributes["CharName"];
  declare Abbrev: CharacterAttributes["Abbrev"];
  declare Works: CharacterAttributes["Works"];
  declare Description: CharacterAttributes["Works"];
  declare SpeechCount: CharacterAttributes["SpeechCount"];

  static initModel(sequelize: Sequelize.Sequelize) {
    Character.init(
      {
        CharID: {
          type: DataTypes.STRING(50),
          allowNull: false,
          defaultValue: "",
          primaryKey: true,
        },
        CharName: {
          type: DataTypes.STRING(255),
          allowNull: false,
          defaultValue: "",
        },
        Abbrev: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        Works: {
          type: DataTypes.STRING(255),
          allowNull: false,
          defaultValue: "",
        },
        Description: {
          type: DataTypes.STRING(255),
          allowNull: false,
          defaultValue: "",
        },
        SpeechCount: {
          type: DataTypes.MEDIUMINT,
          allowNull: true,
        },
      },
      {
        sequelize,
        tableName: "Characters",
        timestamps: false,
        indexes: [
          {
            name: "PRIMARY",
            unique: true,
            using: "BTREE",
            fields: [{ name: "CharID" }],
          },
        ],
      }
    );
  }
}
