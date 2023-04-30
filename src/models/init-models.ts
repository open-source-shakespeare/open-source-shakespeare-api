import type { Sequelize } from "sequelize";
import { Chapter, Chapter as _Chapter } from "./Chapter";
import type { ChapterAttributes, ChapterCreationAttributes } from "./Chapter";
import { Character, Character as _Character } from "./Character";
import type { CharacterAttributes, CharacterCreationAttributes } from "./Character";
import { Genre, Genre as _Genre } from "./Genre";
import type { GenreAttributes, GenreCreationAttributes } from "./Genre";
import { Paragraph, Paragraph as _Paragraph } from "./Paragraph";
import type { ParagraphAttributes, ParagraphCreationAttributes } from "./Paragraph";
import { Quotation, Quotation as _Quotation } from "./Quotation";
import type { QuotationAttributes, QuotationCreationAttributes } from "./Quotation";
import { Work, Work as _Work } from "./Work";
import type { WorkAttributes, WorkCreationAttributes } from "./Work";
import { WordForm, WordForm as _WordForm } from "./WordForm";

export {
  _Chapter as Chapter,
  _Character as Character,
  _Genre as Genre,
  _Paragraph as Paragraph,
  _Quotation as Quotation,
  _Work as Work,
  _WordForm as WordForm,
};

export type {
  ChapterAttributes,
  ChapterCreationAttributes,
  CharacterAttributes,
  CharacterCreationAttributes,
  GenreAttributes,
  GenreCreationAttributes,
  ParagraphAttributes,
  ParagraphCreationAttributes,
  QuotationAttributes,
  QuotationCreationAttributes,
  WorkAttributes,
  WorkCreationAttributes,
};

export function initModels(sequelize: Sequelize): Models {
  const Chapter = _Chapter.initModel(sequelize);
  const Character = _Character.initModel(sequelize);
  const Genre = _Genre.initModel(sequelize);
  const Paragraph = _Paragraph.initModel(sequelize);
  const Quotation = _Quotation.initModel(sequelize);
  const Work = _Work.initModel(sequelize);
  const WordForm = _WordForm.initModel(sequelize);
  const models = { Chapter, Character, Genre, Paragraph, Quotation, Work, WordForm };

  for (const model of Object.values(models)) {
    if (model && "associate" in model) {
      model.associate(models);
    }
  }

  return models;
}

export interface Models {
  Chapter: typeof Chapter;
  Character: typeof Character;
  Genre: typeof Genre;
  Paragraph: typeof Paragraph;
  Quotation: typeof Quotation;
  Work: typeof Work;
  WordForm: typeof WordForm;
}
