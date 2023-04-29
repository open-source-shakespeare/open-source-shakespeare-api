// characterAction.test.ts
import { getCharacters, getCharacterById, getCharactersByName } from "../../src/actions/character-actions";
import { CharacterPlain } from "../../src/models/Character";
import { NotFoundError, DatabaseError } from "../../src/util/errors";
import { models } from "../../src/database";
import { Op } from "sequelize";

const { Character } = models;

jest.mock("../../src/database", () => ({
  models: {
    Character: {
      findAll: jest.fn(),
      findByPk: jest.fn(),
    },
  },
}));

describe("Character Action", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("getCharacters", () => {
    it("should return a list of characters", async () => {
      const mockCharacters: CharacterPlain[] = [
        {
          CharID: "1citizen",
          CharName: "First Citizen",
          Abbrev: "First Citizen",
          Works: "romeojuliet",
          Description: "",
          SpeechCount: 3,
        },
        {
          CharID: "FirstMurderer-h62",
          CharName: "First Murderer",
          Abbrev: "First Murderer",
          Works: "henry6p2",
          Description: "",
          SpeechCount: 4,
        },
        {
          CharID: "Servant-tim",
          CharName: "Servant",
          Abbrev: "Servant",
          Works: "timonathens",
          Description: "",
          SpeechCount: 9,
        },
      ];

      (Character.findAll as jest.Mock).mockResolvedValue(mockCharacters);

      const characters = await getCharacters();
      expect(characters).toContain(mockCharacters);
      expect(Character.findAll).toHaveBeenCalledTimes(1);
    });

    it("should throw a DatabaseError if the query fails", async () => {
      (Character.findAll as jest.Mock).mockRejectedValue(new Error("Database error"));

      await expect(getCharacters()).rejects.toThrow(DatabaseError);
      expect(Character.findAll).toHaveBeenCalledTimes(1);
    });
  });

  describe("getCharacterById", () => {
    it("should return a character by its ID", async () => {
      const mockCharacter: CharacterPlain = {
        CharID: "1player-ham",
        CharName: "First Player",
        Abbrev: "1Play",
        Works: "hamlet",
        Description: "",
        SpeechCount: 8,
      };

      (Character.findByPk as jest.Mock).mockResolvedValue(mockCharacter);

      const character = await getCharacterById("1player-ham");
      expect(character).toEqual(mockCharacter);
      expect(Character.findByPk).toHaveBeenCalledWith("1player-ham");
    });

    it("should throw a NotFoundError if the character is not found", async () => {
      (Character.findByPk as jest.Mock).mockResolvedValue(null);

      await expect(getCharacterById("non-existent-id")).rejects.toThrow(NotFoundError);
      expect(Character.findByPk).toHaveBeenCalledWith("non-existent-id");
    });

    it("should throw a DatabaseError if the query fails", async () => {
      (Character.findByPk as jest.Mock).mockRejectedValue(new Error("Database error"));

      await expect(getCharacterById("some-id")).rejects.toThrow(DatabaseError);
      expect(Character.findByPk).toHaveBeenCalledWith("some-id");
    });
  });

  describe("getCharactersByName", () => {
    it("should return a list of characters by name", async () => {
      const mockCharacters: CharacterPlain[] = [
        {
          CharID: "Andromache",
          CharName: "Andromache",
          Abbrev: "ANDROMACHE",
          Works: "troilus",
          Description: "wife to Hector",
          SpeechCount: 6,
        },
        {
          CharID: "ladymacbeth",
          CharName: "Lady Macbeth",
          Abbrev: "LADY MACBETH",
          Works: "macbeth",
          Description: "",
          SpeechCount: 59,
        },
        {
          CharID: "ladymacduff",
          CharName: "Lady Macduff",
          Abbrev: "LADY MACDUFF",
          Works: "macbeth",
          Description: "",
          SpeechCount: 19,
        },
        {
          CharID: "Lysimachus",
          CharName: "Lysimachus",
          Abbrev: "LYSIMACHUS",
          Works: "pericles",
          Description: "governor of Mytilene",
          SpeechCount: 40,
        },
        {
          CharID: "macbeth",
          CharName: "Macbeth",
          Abbrev: "MACBETH",
          Works: "macbeth",
          Description: "General of the King's army",
          SpeechCount: 146,
        },
        {
          CharID: "macduff",
          CharName: "Macduff",
          Abbrev: "MACDUFF",
          Works: "macbeth",
          Description: "Nobleman of Scotland",
          SpeechCount: 59,
        },
        {
          CharID: "macmorris",
          CharName: "Macmorris",
          Abbrev: "MACMORRIS",
          Works: "henry5",
          Description: "",
          SpeechCount: 4,
        },
      ];

      (Character.findAll as jest.Mock).mockResolvedValue(mockCharacters);

      const characters = await getCharactersByName("mac");
      expect(characters).toEqual(mockCharacters);
      expect(Character.findAll).toHaveBeenCalledTimes(1);
      expect(Character.findAll).toHaveBeenCalledWith({
        where: {
          CharName: {
            [Op.like]: "%mac%",
          },
        },
      });
    });

    it("should throw a NotFoundError if no characters are found", async () => {
      (Character.findAll as jest.Mock).mockResolvedValue([]);

      await expect(getCharactersByName("non-existent-name")).rejects.toThrow(NotFoundError);
      expect(Character.findAll).toHaveBeenCalledWith({
        where: {
          CharName: {
            [Op.like]: `%non-existent-name%`,
          },
        },
      });
    });

    it("should throw a DatabaseError if the query fails", async () => {
      (Character.findAll as jest.Mock).mockRejectedValue(new Error("Database error"));

      await expect(getCharactersByName("John")).rejects.toThrow(DatabaseError);
      expect(Character.findAll).toHaveBeenCalledWith({
        where: {
          CharName: {
            [Op.like]: `%John%`,
          },
        },
      });
    });
  });
});
