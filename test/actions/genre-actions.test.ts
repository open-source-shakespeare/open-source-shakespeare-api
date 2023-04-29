// genreAction.test.ts
import { Op } from "sequelize";
import { Genre, GenrePlain } from "../../src/models/Genre";
import { getGenres, getGenreById, getGenreByName } from "../../src/actions/genre-actions";
import { NotFoundError, DatabaseError } from "../../src/util/errors";

jest.mock("../../src/models/Genre");

describe("Genre Action", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("getGenres", () => {
    it("should return all genres", async () => {
      const mockGenres: GenrePlain[] = [
        {
          GenreType: "c",
          GenreName: "Comedy",
        },
        {
          GenreType: "h",
          GenreName: "History",
        },
        {
          GenreType: "p",
          GenreName: "Poem",
        },
        {
          GenreType: "s",
          GenreName: "Sonnet",
        },
        {
          GenreType: "t",
          GenreName: "Tragedy",
        },
      ];

      (Genre.findAll as jest.Mock).mockResolvedValue(mockGenres);

      const genres = await getGenres();
      expect(genres).toEqual(mockGenres);
      expect(Genre.findAll).toHaveBeenCalled();
    });

    it("should throw a DatabaseError if the query fails", async () => {
      (Genre.findAll as jest.Mock).mockRejectedValue(new Error("Database error"));

      await expect(getGenres()).rejects.toThrow(DatabaseError);
      expect(Genre.findAll).toHaveBeenCalled();
    });
  });

  describe("getGenreById", () => {
    it("should return genre with the matching id", async () => {
      const mockGenre: GenrePlain = {
        GenreType: "c",
        GenreName: "Comedy",
      };

      (Genre.findByPk as jest.Mock).mockResolvedValue(mockGenre);

      const genre = await getGenreById("c");
      expect(genre).toEqual(mockGenre);
      expect(Genre.findByPk).toHaveBeenCalledWith("c");
    });

    it("should throw a NotFoundError if the genre is not found", async () => {
      (Genre.findByPk as jest.Mock).mockResolvedValue(null);

      await expect(getGenreById("nonexistentId")).rejects.toThrow(NotFoundError);
      expect(Genre.findByPk).toHaveBeenCalledWith("nonexistentId");
    });

    it("should throw a DatabaseError if the query fails", async () => {
      (Genre.findByPk as jest.Mock).mockRejectedValue(new Error("Database error"));

      await expect(getGenreById("mockGenreId")).rejects.toThrow(DatabaseError);
      expect(Genre.findByPk).toHaveBeenCalledWith("mockGenreId");
    });
  });

  describe("getGenreByName", () => {
    it("should return genre with the matching name", async () => {
      const mockGenre: GenrePlain = {
        GenreType: "t",
        GenreName: "Tragedy",
      };

      (Genre.findOne as jest.Mock).mockResolvedValue(mockGenre);

      const genre = await getGenreByName("Tragedy");
      expect(genre).toEqual(mockGenre);
      expect(Genre.findOne).toHaveBeenCalledWith({
        where: {
          GenreName: {
            [Op.like]: `%tragedy%`,
          },
        },
      });
    });

    it("should throw a NotFoundError if the genre is not found", async () => {
      (Genre.findOne as jest.Mock).mockResolvedValue(null);

      await expect(getGenreByName("nonexistentName")).rejects.toThrow(NotFoundError);
      expect(Genre.findOne).toHaveBeenCalledWith({
        where: {
          GenreName: {
            [Op.like]: `%nonexistentName%`,
          },
        },
      });
    });

    it("should throw a DatabaseError if the query fails", async () => {
      (Genre.findAll as jest.Mock).mockRejectedValue(new Error("Database error"));

      await expect(getGenreByName("nonexistentName")).rejects.toThrow(DatabaseError);
      expect(Genre.findAll).toHaveBeenCalledWith({
        where: {
          CharName: {
            [Op.like]: `%nonexistentName%`,
          },
        },
      });
    });
  });
});
