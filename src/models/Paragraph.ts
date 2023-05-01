import * as Sequelize from "sequelize";
import { DataTypes, Model } from "sequelize";
import { Work } from "./Work";

export interface ParagraphAttributes {
  WorkID: string;
  ParagraphID: number;
  ParagraphNum: number;
  CharID: string;
  PlainText: string;
  PhoneticText?: string;
  StemText?: string;
  ParagraphType: string;
  Section: number;
  Chapter: number;
  CharCount: number;
  WordCount: number;
  Work?: object;
}

export type ParagraphId = Paragraph["ParagraphID"];

export class Paragraph extends Model<ParagraphAttributes> implements ParagraphAttributes {
  declare WorkID: ParagraphAttributes["WorkID"];
  declare ParagraphID: ParagraphAttributes["ParagraphID"];
  declare ParagraphNum: ParagraphAttributes["ParagraphNum"];
  declare CharID: ParagraphAttributes["CharID"];
  declare PlainText: ParagraphAttributes["PlainText"];
  declare PhoneticText: ParagraphAttributes["PhoneticText"];
  declare StemText: ParagraphAttributes["StemText"];
  declare ParagraphType: ParagraphAttributes["ParagraphType"];
  declare Section: ParagraphAttributes["Section"];
  declare Chapter: ParagraphAttributes["Chapter"];
  declare CharCount: ParagraphAttributes["CharCount"];
  declare WordCount: ParagraphAttributes["WordCount"];
  declare Work: ParagraphAttributes["Work"];

  static associate() {
    Paragraph.belongsTo(Work, {
      foreignKey: "WorkID",
      as: "Work",
    });
  }

  static initModel(sequelize: Sequelize.Sequelize) {
    Paragraph.init(
      {
        WorkID: {
          type: DataTypes.STRING(255),
          allowNull: false,
          defaultValue: "",
        },
        ParagraphID: {
          type: DataTypes.INTEGER,
          allowNull: false,
          defaultValue: 0,
          primaryKey: true,
        },
        ParagraphNum: {
          type: DataTypes.INTEGER,
          allowNull: false,
          defaultValue: 0,
        },
        CharID: {
          type: DataTypes.STRING(255),
          allowNull: false,
          defaultValue: "",
        },
        PlainText: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        PhoneticText: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
        StemText: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
        ParagraphType: {
          type: DataTypes.CHAR(1),
          allowNull: false,
          defaultValue: "",
        },
        Section: {
          type: DataTypes.INTEGER,
          allowNull: false,
          defaultValue: 0,
        },
        Chapter: {
          type: DataTypes.INTEGER,
          allowNull: false,
          defaultValue: 0,
        },
        CharCount: {
          type: DataTypes.INTEGER,
          allowNull: false,
          defaultValue: 0,
        },
        WordCount: {
          type: DataTypes.INTEGER,
          allowNull: false,
          defaultValue: 0,
        },
      },
      {
        sequelize,
        tableName: "Paragraphs",
        timestamps: false,
        indexes: [
          {
            name: "PRIMARY",
            unique: true,
            using: "BTREE",
            fields: [{ name: "ParagraphID" }],
          },
          {
            name: "plaintext_fulltext_idx",
            unique: false,
            type: "FULLTEXT",
            fields: ["PlainText"],
          },
        ],
      }
    );
  }
}
