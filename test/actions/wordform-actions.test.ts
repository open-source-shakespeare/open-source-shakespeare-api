import { models } from "../../src/database";
import { WordFormPlain } from "../../src/models/WordForm";
import { getWordForms } from "../../src/actions/wordform-actions";
import { DatabaseError } from "../../src/util/errors";

const { WordForm } = models;

// Mock the WordForm.findAll method
jest.mock("../../src/database", () => ({
  models: {
    WordForm: {
      findAll: jest.fn(),
    },
  },
}));

describe("WordForm Action", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("getWordForms", () => {
    it("should return a list of word forms", async () => {
      const mockWordForms: WordFormPlain[] = [
        {
          WordFormID: 763487,
          PlainText: "the",
          PhoneticText: "0",
          StemText: "the",
          Occurences: 28944,
        },
        {
          WordFormID: 772799,
          PlainText: "counter",
          PhoneticText: "KNTR",
          StemText: "counter",
          Occurences: 4,
        },
        {
          WordFormID: 781517,
          PlainText: "abbey-gate",
          PhoneticText: "ABKT",
          StemText: "abbeyg",
          Occurences: 1,
        },
      ];

      (WordForm.findAll as jest.Mock).mockResolvedValue(mockWordForms);

      const wordForms = await getWordForms();
      expect(wordForms).toContain(mockWordForms);
      expect(WordForm.findAll).toHaveBeenCalledTimes(1);
    });

    it("should throw a DatabaseError with default message when unknown error occurs", async () => {
      (WordForm.findAll as jest.Mock).mockRejectedValue(new RangeError());

      await expect(getWordForms()).rejects.toThrow(DatabaseError);
      await expect(getWordForms()).rejects.toThrowError(new DatabaseError("Unknown database error"));
      expect(WordForm.findAll).toHaveBeenCalledTimes(2);
    });
  });
});
