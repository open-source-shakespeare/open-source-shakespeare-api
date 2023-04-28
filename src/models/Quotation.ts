import * as Sequelize from "sequelize";
import { DataTypes, Model, Optional } from "sequelize";

export interface QuotationAttributes {
  QuotationID: number;
  QuotationText: string;
  Location: string;
}

export type QuotationPk = "QuotationID";
export type QuotationId = Quotation[QuotationPk];
export type QuotationOptionalAttributes = "QuotationID" | "QuotationText" | "Location";
export type QuotationCreationAttributes = Optional<QuotationAttributes, QuotationOptionalAttributes>;
export type QuotationPlain = {
  [K in keyof QuotationAttributes]: QuotationAttributes[K];
};

export class Quotation extends Model<QuotationAttributes, QuotationCreationAttributes> implements QuotationAttributes {
  QuotationID!: number;
  QuotationText!: string;
  Location!: string;

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
  format(): QuotationPlain {
    return { ...this.get() };
  }
}
