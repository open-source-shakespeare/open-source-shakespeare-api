import { models } from "../../src/database";
import { WorkPlain } from "../../src/models/Work";
import { getWorkById, getWorks, getWorksByGenre, searchWorks } from "../../src/actions/work-actions";
import { DatabaseError, NotFoundError } from "../../src/util/errors";
import { Paragraph } from "../../src/models/Paragraph";
import { Chapter } from "../../src/models/Chapter";
import { Genre } from "../../src/models/Genre";

const { Work } = models;

// Mock Work.findAll, Work.findByPk, and the related model methods
jest.mock("../../src/database", () => ({
  models: {
    Work: {
      findAll: jest.fn(),
      findByPk: jest.fn(),
    },
    Chapter: {
      findAll: jest.fn(),
    },
    Genre: {
      findAll: jest.fn(),
    },
  },
}));

describe("Work Actions", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  // Write test cases for each function in the same pattern
  describe("getWorks", () => {
    it("should return a list of works", async () => {
      const mockWorks: WorkPlain[] = [
        {
          WorkID: "richard3",
          Title: "Richard III",
          LongTitle: "History of Richard III",
          ShortTitle: "Richard3",
          Date: 1592,
          GenreType: "h",
          Notes: {
            type: "Buffer",
            data: [],
          },
          Source: "Moby",
          TotalWords: 29278,
          TotalParagraphs: 1224,
        },
        {
          WorkID: "henry4p2",
          Title: "Henry IV, Part II",
          LongTitle: "History of Henry IV, Part II",
          ShortTitle: "Henry4p2",
          Date: 1597,
          GenreType: "h",
          Notes: {
            type: "Buffer",
            data: [],
          },
          Source: "Gutenberg",
          TotalWords: 25689,
          TotalParagraphs: 987,
        },
        {
          WorkID: "timonathens",
          Title: "Timon of Athens",
          LongTitle: "The Tragedy of Timon of Athens",
          ShortTitle: "Timon",
          Date: 1607,
          GenreType: "t",
          Notes: {
            type: "Buffer",
            data: [],
          },
          Source: "Moby",
          TotalWords: 18216,
          TotalParagraphs: 870,
        },
      ];

      (Work.findAll as jest.Mock).mockResolvedValue(mockWorks);

      const Works = await getWorks();
      expect(Works).toContain(mockWorks);
      expect(Work.findAll).toHaveBeenCalledTimes(1);
    });

    it("should throw a DatabaseError if the query fails", async () => {
      (Work.findAll as jest.Mock).mockRejectedValue(new Error("Database error"));

      await expect(getWorks()).rejects.toThrow(DatabaseError);
      expect(Work.findAll).toHaveBeenCalled();
    });
  });

  describe("getWorkOutlineById", () => {
    it("should return work with the matching id", async () => {
      const mockWork: WorkPlain = {
        WorkID: "allswell",
        Title: "All's Well That Ends Well",
        LongTitle: "All's Well That Ends Well",
        ShortTitle: "AWW",
        Date: 1602,
        GenreType: "c",
        Notes: {
          type: "Buffer",
          data: [],
        },
        Source: "Moby",
        TotalWords: 23009,
        TotalParagraphs: 1034,
      };

      (Work.findByPk as jest.Mock).mockResolvedValue(mockWork);

      const work = await getWorkById("allswell");
      expect(work).toEqual(mockWork);
      expect(Work.findByPk).toHaveBeenCalledWith("allswell");
    });

    it("should throw a NotFoundError if the work is not found", async () => {
      (Work.findByPk as jest.Mock).mockResolvedValue(null);

      await expect(getWorkById("nonexistantid")).rejects.toThrow(NotFoundError);
      expect(Work.findByPk).toHaveBeenCalledWith("nonexistantid");
    });

    it("should throw a DatabaseError if the query fails", async () => {
      (Work.findByPk as jest.Mock).mockRejectedValue(new Error("Database error"));

      await expect(getWorkById("nonexistantid")).rejects.toThrow(DatabaseError);
      expect(Work.findByPk).toHaveBeenCalledWith("nonexistantid");
    });
  });

  describe("getWorkById", () => {
    it("should return a plain work object with expected keys", async () => {
      const mockWork: WorkPlain = {
        WorkID: "allswell",
        Title: "All's Well That Ends Well",
        LongTitle: "All's Well That Ends Well",
        ShortTitle: "AWW",
        Date: 1602,
        GenreType: "c",
        Notes: {
          type: "Buffer",
          data: [],
        },
        Source: "Moby",
        TotalWords: 23009,
        TotalParagraphs: 1034,
        Paragraphs: [],
        Chapters: [],
      };
      (Work.findOne as jest.Mock).mockResolvedValue(mockWork);

      const work = await getWorkById("allswell");

      expect(work).toEqual(
        expect.objectContaining({
          id: expect.any(String),
          title: expect.any(String),
          author: expect.any(String),
          paragraphs: expect.any(Array),
          chapters: expect.any(Array),
        })
      );
      expect(Work.findOne).toHaveBeenCalledWith(
        expect.objectContaining({
          include: expect.arrayContaining([
            expect.objectContaining({
              model: Paragraph,
              as: "Paragraphs",
              where: expect.any(Object),
            }),
            expect.objectContaining({
              model: Chapter,
              as: "Chapters",
              where: expect.any(Object),
            }),
          ]),
        })
      );
    });

    it("should throw a NotFoundError if the work is not found", async () => {
      (Work.findOne as jest.Mock).mockResolvedValue(null);

      await expect(getWorkById("nonexistentId")).rejects.toThrow(NotFoundError);
      expect(Work.findOne).toHaveBeenCalledWith(expect.any(Object));
    });

    it("should throw a DatabaseError if the query fails", async () => {
      (Work.findOne as jest.Mock).mockRejectedValue(new Error("Database error"));

      await expect(getWorkById("mockWorkId")).rejects.toThrow(DatabaseError);
      expect(Work.findOne).toHaveBeenCalledWith(expect.any(Object));
    });
  });

  describe("getWorksByGenre", () => {
    it("should return an array of plain works with the matching genre", async () => {
      const mockWorks: WorkPlain[] = [
        {
          WorkID: "12night",
          Title: "Twelfth Night",
          LongTitle: "Twelfth Night, Or What You Will",
          ShortTitle: "12Night",
          Date: 1599,
          GenreType: "c",
          Notes: {
            type: "Buffer",
            data: [],
          },
          Source: "Moby",
          TotalWords: 19837,
          TotalParagraphs: 1031,
          Genre: {
            GenreType: "c",
            GenreName: "Comedy",
          },
        },
        {
          WorkID: "midsummer",
          Title: "Midsummer Night's Dream",
          LongTitle: "A Midsummer Night's Dream",
          ShortTitle: "MND",
          Date: 1595,
          GenreType: "c",
          Notes: {
            type: "Buffer",
            data: [],
          },
          Source: "Moby",
          TotalWords: 16511,
          TotalParagraphs: 605,
          Genre: {
            GenreType: "c",
            GenreName: "Comedy",
          },
        },
        {
          WorkID: "twogents",
          Title: "Two Gentlemen of Verona",
          LongTitle: "Two Gentlemen of Verona",
          ShortTitle: "2Gents",
          Date: 1594,
          GenreType: "c",
          Notes: {
            type: "Buffer",
            data: [],
          },
          Source: "Moby",
          TotalWords: 17129,
          TotalParagraphs: 943,
          Genre: {
            GenreType: "c",
            GenreName: "Comedy",
          },
        },
      ];

      (Work.findAll as jest.Mock).mockResolvedValue(mockWorks);

      const works = await getWorksByGenre("comedy");
      expect(works).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            id: expect.any(String),
            title: expect.any(String),
            author: expect.any(String),
            paragraphs: expect.any(Array),
            chapters: expect.any(Array),
            genre: expect.objectContaining({
              GenreType: expect.any(String),
              GenreName: expect.any(String),
            }),
          }),
        ])
      );
      expect(Work.findAll).toHaveBeenCalledWith(
        expect.objectContaining({
          include: expect.arrayContaining([
            expect.objectContaining({
              model: Genre,
              as: "Genre",
              where: expect.any(Object),
              required: expect.any(Boolean),
            }),
          ]),
        })
      );
    });

    it("should return an empty array if no works with the matching genre are found", async () => {
      (Work.findAll as jest.Mock).mockResolvedValue([]);

      const works = await getWorksByGenre("NonexistentGenre");
      expect(works).toEqual([]);
      expect(Work.findAll).toHaveBeenCalledWith(expect.any(Object));
    });

    it("should throw a DatabaseError if the query fails", async () => {
      (Work.findAll as jest.Mock).mockRejectedValue(new Error("Database error"));

      await expect(getWorksByGenre("MockGenre")).rejects.toThrow(DatabaseError);
      expect(Work.findAll).toHaveBeenCalledWith(expect.any(Object));
    });
  });

  describe("searchWorks", () => {
    it("should return an array of plain works that match the search criteria", async () => {
      const mockWorks: WorkPlain[] = [
        {
          WorkID: "antonycleo",
          Title: "Antony and Cleopatra",
          LongTitle: "Antony and Cleopatra",
          ShortTitle: "Antony",
          Date: 1606,
          GenreType: "t",
          Notes: {
            type: "Buffer",
            data: [],
          },
          Source: "Moby",
          TotalWords: 24905,
          TotalParagraphs: 1361,
          Genre: {
            GenreType: "t",
            GenreName: "Tragedy",
          },
        },
      ];
      (Work.findAll as jest.Mock).mockResolvedValue(mockWorks);

      const works = await searchWorks("ant", "tragedy", 1606);
      expect(works).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            id: expect.any(String),
            title: expect.any(String),
            author: expect.any(String),
            paragraphs: expect.any(Array),
            chapters: expect.any(Array),
            genre: expect.objectContaining({
              GenreType: expect.any(String),
              GenreName: expect.any(String),
            }),
            date: expect.any(Number),
          }),
        ])
      );
      expect(Work.findAll).toHaveBeenCalledWith(
        expect.objectContaining({
          where: expect.any(Object),
          include: expect.arrayContaining([
            expect.objectContaining({
              model: Genre,
              as: "Genre",
              where: expect.any(Object),
            }),
          ]),
        })
      );
    });

    it("should return an empty array if no works match the search criteria", async () => {
      (Work.findAll as jest.Mock).mockResolvedValue([]);

      const works = await searchWorks("NonexistentTitle", "NonexistentGenre", 2022);
      expect(works).toEqual([]);
      expect(Work.findAll).toHaveBeenCalledWith(expect.any(Object));
    });

    it("should throw a DatabaseError if the query fails", async () => {
      (Work.findAll as jest.Mock).mockRejectedValue(new Error("Database error"));

      await expect(searchWorks("MockTitle", "MockGenre", 2000)).rejects.toThrow(DatabaseError);
      expect(Work.findAll).toHaveBeenCalledWith(expect.any(Object));
    });
  });
});
