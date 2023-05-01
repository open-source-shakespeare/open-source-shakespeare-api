import * as Sequelize from "sequelize";
import { DataTypes, Model } from "sequelize";
import { Chapter } from "./Chapter";
import { Genre } from "./Genre";
import { Paragraph } from "./Paragraph";

export interface WorkAttributes {
  WorkID: string;
  Title: string;
  LongTitle: string;
  ShortTitle?: string;
  Date: number;
  GenreType: string;
  Notes: any;
  Source: string;
  TotalWords?: number;
  TotalParagraphs?: number;
  Paragraphs?: any;
  Chapters?: any;
  Genre?: any;
}

export type WorkId = Work["WorkID"];

export class Work extends Model<WorkAttributes> implements WorkAttributes {
  declare WorkID: WorkAttributes["WorkID"];
  declare Title: WorkAttributes["Title"];
  declare LongTitle: WorkAttributes["LongTitle"];
  declare ShortTitle: WorkAttributes["ShortTitle"];
  declare Date: WorkAttributes["Date"];
  declare GenreType: WorkAttributes["GenreType"];
  declare Notes: WorkAttributes["Notes"];
  declare Source: WorkAttributes["Source"];
  declare TotalWords: WorkAttributes["TotalWords"];
  declare TotalParagraphs: WorkAttributes["TotalParagraphs"];

  static associate(): void {
    Work.hasMany(Chapter, {
      foreignKey: "WorkID",
      as: "Chapters",
    });
    Work.hasMany(Paragraph, {
      foreignKey: "WorkID",
      as: "Paragraphs",
    });
    Work.belongsTo(Genre, {
      foreignKey: "GenreType",
      as: "Genre",
    });
  }

  static initModel(sequelize: Sequelize.Sequelize) {
    Work.init(
      {
        WorkID: {
          type: DataTypes.STRING(50),
          allowNull: false,
          defaultValue: "",
          primaryKey: true,
        },
        Title: {
          type: DataTypes.STRING(255),
          allowNull: false,
          defaultValue: "",
        },
        LongTitle: {
          type: DataTypes.STRING(255),
          allowNull: false,
          defaultValue: "",
        },
        ShortTitle: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        Date: {
          type: DataTypes.INTEGER,
          allowNull: false,
          defaultValue: 0,
        },
        GenreType: {
          type: DataTypes.STRING(255),
          allowNull: false,
          defaultValue: "",
          references: {
            model: "Genre",
            key: "GenreType",
          },
        },
        Notes: {
          type: DataTypes.BLOB,
          allowNull: false,
        },
        Source: {
          type: DataTypes.STRING(255),
          allowNull: false,
          defaultValue: "",
        },
        TotalWords: {
          type: DataTypes.MEDIUMINT,
          allowNull: true,
        },
        TotalParagraphs: {
          type: DataTypes.MEDIUMINT,
          allowNull: true,
        },
      },
      {
        sequelize,
        tableName: "Works",
        timestamps: false,
        indexes: [
          {
            name: "PRIMARY",
            unique: true,
            using: "BTREE",
            fields: [{ name: "WorkID" }],
          },
        ],
      }
    );
  }
}
