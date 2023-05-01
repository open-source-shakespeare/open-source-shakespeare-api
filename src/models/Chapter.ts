import { Sequelize, DataTypes, Model } from "sequelize";
import { Work } from "./Work";

export interface ChapterAttributes {
  WorkID: string;
  ChapterID: number;
  Section: number;
  Chapter: number;
  Description: string;
}

export type ChapterId = Chapter["ChapterID"];

export class Chapter extends Model<ChapterAttributes> implements ChapterAttributes {
  declare WorkID: string;
  declare ChapterID: number;
  declare Section: number;
  declare Chapter: number;
  declare Description: string;

  static associate() {
    Chapter.belongsTo(Work, {
      foreignKey: "WorkID",
      as: "Work",
    });
  }

  static initModel(sequelize: Sequelize) {
    Chapter.init(
      {
        WorkID: {
          type: DataTypes.STRING(255),
          allowNull: false,
          defaultValue: "",
        },
        ChapterID: {
          type: DataTypes.INTEGER,
          allowNull: false,
          defaultValue: 0,
          primaryKey: true,
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
        Description: {
          type: DataTypes.STRING(255),
          allowNull: false,
          defaultValue: "",
        },
      },
      {
        sequelize,
        tableName: "Chapters",
        timestamps: false,
        indexes: [
          {
            name: "PRIMARY",
            unique: true,
            using: "BTREE",
            fields: [{ name: "ChapterID" }],
          },
        ],
      }
    );
  }
}
