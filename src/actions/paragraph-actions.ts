import { Op, literal } from "sequelize";
import { Paragraph, ParagraphId } from "../models/Paragraph";
import { NotFoundError, DatabaseError } from "../util/errors";
import { Work } from "../models/Work";

export async function getParagraphs(terms: string[], workId?: string): Promise<Paragraph[]> {
  try {
    let matchAgainst = {};
    let term;
    if (typeof terms === "string") {
      term = `"${terms}"`;
    } else {
      term = terms.map((t, i) => (i === 0 ? `+"${t}"` : `"${t}"`)).join(" +");
    }
    console.log(term);
    if (terms) {
      matchAgainst = literal(`MATCH(PlainText) AGAINST('${term}' IN BOOLEAN MODE)`);
    }

    const where = {
      [Op.and]: [matchAgainst, workId ? { workId } : {}],
    };

    const paragraphs = await Paragraph.findAll({
      where,
      include: [
        {
          model: Work,
          as: "Work",
        },
      ],
    });

    if (!paragraphs || paragraphs.length === 0) {
      throw new NotFoundError("No paragraphs found for the given search term");
    }

    return paragraphs;
  } catch (e) {
    if (e instanceof NotFoundError) {
      throw e;
    } else {
      const errorMessage = e instanceof Error ? e.message : "Unknown database error";
      throw new DatabaseError(errorMessage);
    }
  }
}

export async function getParagraphById(id: ParagraphId): Promise<Paragraph> {
  try {
    const paragraph = await Paragraph.findByPk(id);
    if (!paragraph) {
      throw new NotFoundError("Paragraph not found");
    }
    return paragraph;
  } catch (e) {
    if (e instanceof NotFoundError) {
      throw e;
    } else {
      const errorMessage = e instanceof Error ? e.message : "Unknown database error";
      throw new DatabaseError(errorMessage);
    }
  }
}
