import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface AnnotationAttributes {
  AnnotationID: number;
  AnnotationThreadID: number;
  ChildOf?: number;
  UserID: number;
  Comment: string;
  ExternalLink_URL?: string;
  MediaID?: number;
  StartAt?: number;
  Created: Date;
}

export type AnnotationPk = "AnnotationID";
export type AnnotationId = Annotation[AnnotationPk];
export type AnnotationOptionalAttributes = "AnnotationID" | "ChildOf" | "ExternalLink_URL" | "MediaID" | "StartAt" | "Created";
export type AnnotationCreationAttributes = Optional<AnnotationAttributes, AnnotationOptionalAttributes>;

export class Annotation extends Model<AnnotationAttributes, AnnotationCreationAttributes> implements AnnotationAttributes {
  AnnotationID!: number;
  AnnotationThreadID!: number;
  ChildOf?: number;
  UserID!: number;
  Comment!: string;
  ExternalLink_URL?: string;
  MediaID?: number;
  StartAt?: number;
  Created!: Date;


  static initModel(sequelize: Sequelize.Sequelize): typeof Annotation {
    return Annotation.init({
    AnnotationID: {
      autoIncrement: true,
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    AnnotationThreadID: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false
    },
    ChildOf: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: true
    },
    UserID: {
      type: DataTypes.BIGINT,
      allowNull: false,
      comment: "must be a value in UserAccounts.UserID"
    },
    Comment: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    ExternalLink_URL: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    MediaID: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: true
    },
    StartAt: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    Created: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    }
  }, {
    sequelize,
    tableName: 'Annotations',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "AnnotationID" },
        ]
      },
    ]
  });
  }
  
  format() {
    return { ...this.get()}
  }
}
