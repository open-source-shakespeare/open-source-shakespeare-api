import * as Sequelize from "sequelize";
import { DataTypes, Model } from "sequelize";
import { Work } from "./Work";

export interface GenreAttributes {
  GenreType: string;
  GenreName: string;
}

export type GenreId = Genre["GenreType"];

export class Genre extends Model<GenreAttributes> implements GenreAttributes {
  declare GenreType: GenreAttributes["GenreType"];
  declare GenreName: GenreAttributes["GenreName"];

  static associate(): void {
    Genre.hasMany(Work, {
      foreignKey: "GenreType",
      as: "Works",
    });
  }

  static initModel(sequelize: Sequelize.Sequelize) {
    Genre.init(
      {
        GenreType: {
          type: DataTypes.STRING(255),
          allowNull: false,
          defaultValue: "",
          primaryKey: true,
          references: {
            model: "Work",
            key: "GenreType",
          },
        },
        GenreName: {
          type: DataTypes.STRING(255),
          allowNull: false,
          defaultValue: "",
        },
      },
      {
        sequelize,
        tableName: "Genres",
        timestamps: false,
        indexes: [
          {
            name: "PRIMARY",
            unique: true,
            using: "BTREE",
            fields: [{ name: "GenreType" }],
          },
        ],
      }
    );
  }
}
