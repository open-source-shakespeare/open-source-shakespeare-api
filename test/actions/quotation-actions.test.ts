import { models } from "../../src/database";
import { QuotationPlain } from "../../src/models/Quotation";
import { getQuotations } from "../../src/actions/quotation-actions";
import { DatabaseError } from "../../src/util/errors";

const { Quotation } = models;

jest.mock("../../src/database", () => ({
  models: {
    Quotation: {
      findAll: jest.fn(),
    },
  },
}));

describe("Quotation Action", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("getQuotations", () => {
    it("should return a list of quotations", async () => {
      const mockQuotations: QuotationPlain[] = [
        {
          QuotationID: 34084923,
          QuotationText: "I would fain die a dry death.",
          Location: "<i>The Tempest</i>, Act I Scene 1",
        },
        {
          QuotationID: 34085170,
          QuotationText: "There are a sort of men whose visages<br>Do cream and mantle like a standing pond.",
          Location: "<i>The Merchant of Venice</i>, Act I Scene 1",
        },
        {
          QuotationID: 34085741,
          QuotationText:
            "Good night, good night! parting is such sweet sorrow,<br>That I shall say good night till it be morrow.",
          Location: "<i>Romeo and Juliet</i>, Act II Scene 2",
        },
      ];

      (Quotation.findAll as jest.Mock).mockResolvedValue(mockQuotations);

      const quotations = await getQuotations();
      expect(quotations).toContain(mockQuotations);
      expect(Quotation.findAll).toHaveBeenCalledTimes(1);
    });

    it("should throw a DatabaseError if the query fails", async () => {
      (Quotation.findAll as jest.Mock).mockRejectedValue(new Error("Database error"));

      await expect(getQuotations()).rejects.toThrow(DatabaseError);
      expect(Quotation.findAll).toHaveBeenCalledTimes(1);
    });
  });
});
