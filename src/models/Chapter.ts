import { Sequelize, DataTypes, Optional, Model } from "sequelize";

export interface ChapterAttributes {
  WorkID: string;
  ChapterID: number;
  Section: number;
  Chapter: number;
  Description: string;
}

export type ChapterPk = "ChapterID";
export type ChapterId = Chapter[ChapterPk];
export type ChapterOptionalAttributes = "WorkID" | "ChapterID" | "Section" | "Chapter" | "Description";
export type ChapterCreationAttributes = Optional<ChapterAttributes, ChapterOptionalAttributes>;
export type ChapterPlain = {
  [K in keyof ChapterAttributes]: ChapterAttributes[K];
};

export class Chapter
  extends Model<ChapterAttributes, ChapterCreationAttributes>
  implements ChapterAttributes
{
  WorkID!: string;
  ChapterID!: number;
  Section!: number;
  Chapter!: number;
  Description!: string;

  static associate(models: any): void {
    this.belongsTo(models.Work, {
      foreignKey: "WorkID",
      as: "Work",
    });
  }

  static initModel(sequelize: Sequelize): typeof Chapter {
    return Chapter.init(
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

  format(): ChapterPlain {
    return { ...this.get() };
  }
}
