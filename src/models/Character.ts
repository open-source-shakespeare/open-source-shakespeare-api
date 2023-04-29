import * as Sequelize from "sequelize";
import { DataTypes, Model, Optional } from "sequelize";

export interface CharacterAttributes {
  CharID: string;
  CharName: string;
  Abbrev?: string;
  Works: string;
  Description: string;
  SpeechCount?: number;
}

export type CharacterPk = "CharID";
export type CharacterId = Character[CharacterPk];
export type CharacterOptionalAttributes =
  | "CharID"
  | "CharName"
  | "Abbrev"
  | "Works"
  | "Description"
  | "SpeechCount";
export type CharacterCreationAttributes = Optional<CharacterAttributes, CharacterOptionalAttributes>;
export type CharacterPlain = {
  [K in keyof CharacterAttributes]: CharacterAttributes[K];
};

export class Character
  extends Model<CharacterAttributes, CharacterCreationAttributes>
  implements CharacterAttributes
{
  CharID!: string;
  CharName!: string;
  Abbrev?: string;
  Works!: string;
  Description!: string;
  SpeechCount?: number;

  static initModel(sequelize: Sequelize.Sequelize): typeof Character {
    return Character.init(
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

  format(): CharacterPlain {
    return { ...this.get() };
  }
}
