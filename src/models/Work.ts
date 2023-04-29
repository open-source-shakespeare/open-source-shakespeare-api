import * as Sequelize from "sequelize";
import { DataTypes, Model, Optional } from "sequelize";

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
}

export type WorkPk = "WorkID";
export type WorkId = Work[WorkPk];
export type WorkOptionalAttributes =
  | "WorkID"
  | "Title"
  | "LongTitle"
  | "ShortTitle"
  | "Date"
  | "GenreType"
  | "Source"
  | "TotalWords"
  | "TotalParagraphs";
export type WorkCreationAttributes = Optional<WorkAttributes, WorkOptionalAttributes>;
export type WorkPlain = {
  [K in keyof WorkAttributes]: WorkAttributes[K];
};

export class Work extends Model<WorkAttributes, WorkCreationAttributes> implements WorkAttributes {
  WorkID!: string;
  Title!: string;
  LongTitle!: string;
  ShortTitle?: string;
  Date!: number;
  GenreType!: string;
  Notes!: any;
  Source!: string;
  TotalWords?: number;
  TotalParagraphs?: number;

  static associate(models: any): void {
    this.hasMany(models.Chapter, {
      foreignKey: "WorkID",
      as: "Chapters",
    });
    this.hasMany(models.Paragraph, {
      foreignKey: "WorkID",
      as: "Paragraphs",
    });
    this.belongsTo(models.Genre, {
      foreignKey: "GenreType",
      as: "Genre",
    });
  }

  static initModel(sequelize: Sequelize.Sequelize): typeof Work {
    return Work.init(
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
  format(): WorkPlain {
    return { ...this.get() };
  }
}
