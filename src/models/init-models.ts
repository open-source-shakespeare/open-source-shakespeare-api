import { Sequelize } from "sequelize";
import { Chapter } from "./Chapter";
import { Character } from "./Character";
import { Genre } from "./Genre";
import { Paragraph } from "./Paragraph";
import { Quotation } from "./Quotation";
import { WordForm } from "./WordForm";
import { Work } from "./Work";

export function initModels(sequelize: Sequelize) {
  const models = [Chapter, Character, Genre, Paragraph, Quotation, Work, WordForm];

  models.forEach((model) => model.initModel(sequelize));
  models.forEach((model) => ("associate" in model ? model.associate() : {}));
}
