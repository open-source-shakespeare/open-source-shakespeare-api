import { models } from "../../src/database";
import { ChapterPlain } from "../../src/models/Chapter";
import { getChapterById, getChapters } from "../../src/actions/chapter-actions";
import { DatabaseError, NotFoundError } from "../../src/util/errors";

const { Chapter } = models;

// Mock the Chapter.findAll method
jest.mock("../src/database", () => ({
  models: {
    Chapter: {
      findAll: jest.fn(),
      findByPk: jest.fn(),
    },
  },
}));

describe("Chapter Action", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("getChapters", () => {
    it("should return a list of chapters", async () => {
      const mockChapters: ChapterPlain[] = [
        {
          WorkID: "allswell",
          ChapterID: 24908,
          Section: 1,
          Chapter: 1,
          Description: "Rousillon. The COUNT&#8217;s palace.",
        },
        {
          WorkID: "juliuscaesar",
          ChapterID: 25257,
          Section: 4,
          Chapter: 3,
          Description: "Brutus&#8217;s tent.",
        },
        {
          WorkID: "sonnets",
          ChapterID: 25579,
          Section: 1,
          Chapter: 15,
          Description: "---\n",
        },
      ];

      (Chapter.findAll as jest.Mock).mockResolvedValue(mockChapters);

      const chapters = await getChapters();
      expect(chapters).toContain(mockChapters);
      expect(Chapter.findAll).toHaveBeenCalledTimes(1);
    });

    it("should throw a DatabaseError if the query fails", async () => {
      (Chapter.findAll as jest.Mock).mockRejectedValue(new Error("Database error"));

      await expect(getChapters()).rejects.toThrow(DatabaseError);
      expect(Chapter.findAll).toHaveBeenCalledTimes(1);
    });
  });

  describe("getChapterById", () => {
    it("should return a chapter by its ID", async () => {
      const mockChapter: ChapterPlain = {
        WorkID: "allswell",
        ChapterID: 24909,
        Section: 1,
        Chapter: 2,
        Description: "Paris. The KING&#8217;s palace.",
      };

      (Chapter.findByPk as jest.Mock).mockResolvedValue(mockChapter);

      const chapter = await getChapterById(24909);
      expect(chapter).toEqual(mockChapter);
      expect(Chapter.findByPk).toHaveBeenCalledWith(24909);
    });

    it("should throw a NotFoundError if the chapter is not found", async () => {
      (Chapter.findByPk as jest.Mock).mockResolvedValue(null);

      await expect(getChapterById(1234)).rejects.toThrow(NotFoundError);
      expect(Chapter.findByPk).toHaveBeenCalledWith(1234);
    });

    it("should throw a DatabaseError if the query fails", async () => {
      (Chapter.findByPk as jest.Mock).mockRejectedValue(new Error("Database error"));

      await expect(getChapterById(1234)).rejects.toThrow(DatabaseError);
      expect(Chapter.findByPk).toHaveBeenCalledWith(1234);
    });
  });
});
