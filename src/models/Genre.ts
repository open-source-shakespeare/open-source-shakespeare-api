import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface GenreAttributes {
  GenreType: string;
  GenreName: string;
}

export type GenrePk = "GenreType";
export type GenreId = Genre[GenrePk];
export type GenreOptionalAttributes = "GenreType" | "GenreName";
export type GenreCreationAttributes = Optional<GenreAttributes, GenreOptionalAttributes>;

export class Genre extends Model<GenreAttributes, GenreCreationAttributes> implements GenreAttributes {
  GenreType!: string;
  GenreName!: string;


  static initModel(sequelize: Sequelize.Sequelize): typeof Genre {
    return Genre.init({
    GenreType: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: "",
      primaryKey: true
    },
    GenreName: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ""
    }
  }, {
    sequelize,
    tableName: 'Genres',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "GenreType" },
        ]
      },
    ]
  });
  }
}