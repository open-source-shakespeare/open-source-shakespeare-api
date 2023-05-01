import * as Sequelize from "sequelize";
import { DataTypes, Model } from "sequelize";

export interface WordFormAttributes {
  WordFormID: number;
  PlainText: string;
  PhoneticText: string;
  StemText: string;
  Occurences: number;
}
export type WordFormId = WordFormAttributes["WordFormID"];

export class WordForm extends Model<WordFormAttributes> implements WordFormAttributes {
  declare WordFormID: WordFormAttributes["WordFormID"];
  declare PlainText: WordFormAttributes["PlainText"];
  declare PhoneticText: WordFormAttributes["PhoneticText"];
  declare StemText: WordFormAttributes["StemText"];
  declare Occurences: WordFormAttributes["Occurences"];

  static initModel(sequelize: Sequelize.Sequelize) {
    WordForm.init(
      {
        WordFormID: {
          type: DataTypes.MEDIUMINT.UNSIGNED,
          allowNull: false,
          primaryKey: true,
          defaultValue: 0,
        },
        PlainText: {
          type: DataTypes.STRING(100),
          allowNull: false,
          defaultValue: "",
        },
        PhoneticText: {
          type: DataTypes.STRING(100),
          allowNull: false,
          defaultValue: "",
        },
        StemText: {
          type: DataTypes.STRING(100),
          allowNull: false,
          defaultValue: "",
        },
        Occurences: {
          type: DataTypes.MEDIUMINT,
          allowNull: false,
          defaultValue: 0,
        },
      },
      {
        sequelize,
        tableName: "WordForms",
        timestamps: false,
      }
    );
  }
}
