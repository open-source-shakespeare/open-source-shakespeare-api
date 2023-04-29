import * as Sequelize from "sequelize";
import { DataTypes, Model, Optional } from "sequelize";

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
}

export type ParagraphPk = "ParagraphID";
export type ParagraphId = Paragraph[ParagraphPk];
export type ParagraphOptionalAttributes =
  | "WorkID"
  | "ParagraphID"
  | "ParagraphNum"
  | "CharID"
  | "PhoneticText"
  | "StemText"
  | "ParagraphType"
  | "Section"
  | "Chapter"
  | "CharCount"
  | "WordCount";
export type ParagraphCreationAttributes = Optional<ParagraphAttributes, ParagraphOptionalAttributes>;
export type ParagraphPlain = {
  [K in keyof ParagraphAttributes]: ParagraphAttributes[K];
};

export class Paragraph
  extends Model<ParagraphAttributes, ParagraphCreationAttributes>
  implements ParagraphAttributes
{
  WorkID!: string;
  ParagraphID!: number;
  ParagraphNum!: number;
  CharID!: string;
  PlainText!: string;
  PhoneticText?: string;
  StemText?: string;
  ParagraphType!: string;
  Section!: number;
  Chapter!: number;
  CharCount!: number;
  WordCount!: number;

  static associate(models: any): void {
    this.belongsTo(models.Work, {
      foreignKey: "WorkID",
      as: "Work",
    });
  }

  static initModel(sequelize: Sequelize.Sequelize): typeof Paragraph {
    return Paragraph.init(
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
  format(): ParagraphPlain {
    return { ...this.get() };
  }
}
