import * as Sequelize from "sequelize";
import { DataTypes, Model } from "sequelize";

export interface QuotationAttributes {
  QuotationID: number;
  QuotationText: string;
  Location: string;
}

export type QuotationId = Quotation["QuotationID"];

export class Quotation extends Model<QuotationAttributes> implements QuotationAttributes {
  declare QuotationID: QuotationAttributes["QuotationID"];
  declare QuotationText: QuotationAttributes["QuotationText"];
  declare Location: QuotationAttributes["Location"];

  static initModel(sequelize: Sequelize.Sequelize): typeof Quotation {
    return Quotation.init(
      {
        QuotationID: {
          type: DataTypes.INTEGER,
          allowNull: false,
          defaultValue: 0,
          primaryKey: true,
        },
        QuotationText: {
          type: DataTypes.STRING(255),
          allowNull: false,
          defaultValue: "",
        },
        Location: {
          type: DataTypes.STRING(255),
          allowNull: false,
          defaultValue: "",
        },
      },
      {
        sequelize,
        tableName: "Quotations",
        timestamps: false,
        indexes: [
          {
            name: "PRIMARY",
            unique: true,
            using: "BTREE",
            fields: [{ name: "QuotationID" }],
          },
        ],
      }
    );
  }
}
