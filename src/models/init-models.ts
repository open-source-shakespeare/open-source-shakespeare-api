import type { Sequelize } from "sequelize";
import { Annotation as _Annotation } from "./Annotation";
import type { AnnotationAttributes, AnnotationCreationAttributes } from "./Annotation";
import { Chapter as _Chapter } from "./Chapter";
import type { ChapterAttributes, ChapterCreationAttributes } from "./Chapter";
import { Character as _Character } from "./Character";
import type { CharacterAttributes, CharacterCreationAttributes } from "./Character";
import { Genre as _Genre } from "./Genre";
import type { GenreAttributes, GenreCreationAttributes } from "./Genre";
import { Paragraph as _Paragraph } from "./Paragraph";
import type { ParagraphAttributes, ParagraphCreationAttributes } from "./Paragraph";
import { Quotation as _Quotation } from "./Quotation";
import type { QuotationAttributes, QuotationCreationAttributes } from "./Quotation";
import { Work as _Work } from "./Work";
import type { WorkAttributes, WorkCreationAttributes } from "./Work";

export {
  _Annotation as Annotation,
  _Chapter as Chapter,
  _Character as Character,
  _Genre as Genre,
  _Paragraph as Paragraph,
  _Quotation as Quotation,
  _Work as Work,
};

export type {
  AnnotationAttributes,
  AnnotationCreationAttributes,
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

export function initModels(sequelize: Sequelize) {
  const Annotation = _Annotation.initModel(sequelize);
  const Chapter = _Chapter.initModel(sequelize);
  const Character = _Character.initModel(sequelize);
  const Genre = _Genre.initModel(sequelize);
  const Paragraph = _Paragraph.initModel(sequelize);
  const Quotation = _Quotation.initModel(sequelize);
  const Work = _Work.initModel(sequelize);


  return {
    Annotation: Annotation,
    Chapter: Chapter,
    Character: Character,
    Genre: Genre,
    Paragraph: Paragraph,
    Quotation: Quotation,
    Work: Work,
  };
}
