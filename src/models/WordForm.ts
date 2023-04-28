import * as Sequelize from "sequelize";
import { DataTypes, Model, Optional } from "sequelize";

export interface WordFormAttributes {
  WordFormID: number;
  PlainText: string;
  PhoneticText: string;
  StemText: string;
  Occurences: number;
}

export type WordFormOptionalAttributes = "WordFormID" | "PlainText" | "PhoneticText" | "StemText" | "Occurences";
export type WordFormCreationAttributes = Optional<WordFormAttributes, WordFormOptionalAttributes>;
export type WordFormPlain = {
  [K in keyof WordFormAttributes]: WordFormAttributes[K];
};

export class WordForm extends Model<WordFormAttributes, WordFormCreationAttributes> implements WordFormAttributes {
  WordFormID!: number;
  PlainText!: string;
  PhoneticText!: string;
  StemText!: string;
  Occurences!: number;

  static initModel(sequelize: Sequelize.Sequelize): typeof WordForm {
    return WordForm.init(
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
  format(): WordFormPlain {
    return { ...this.get() };
  }
}
