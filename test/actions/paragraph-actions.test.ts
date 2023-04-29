// paragraphAction.test.ts
import { Op, literal } from "sequelize";
import { Paragraph, ParagraphPlain } from "../../src/models/Paragraph";
import { Work } from "../../src/models/Work";
import { getParagraphs, getParagraphById, searchParagraphs } from "../../src/actions/paragraph-actions";
import { NotFoundError, DatabaseError } from "../../src/util/errors";

jest.mock("../../src/models/Paragraph");
jest.mock("../../src/models/Work");

describe("Paragraph Action", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("getParagraphs", () => {
    it("should return all paragraphs", async () => {
      const mockParagraphs: ParagraphPlain[] = [
        {
          WorkID: "allswell",
          ParagraphID: 859862,
          ParagraphNum: 1,
          CharID: "xxx",
          PlainText: "Enter BERTRAM, the COUNTESS of Rousillon, HELENA,]\n[p]and LAFEU, all in black]\n",
          PhoneticText: " ENTR BRTRM 0 KNTS OF RSLN HLN ANT LF AL IN BLK ",
          StemText: " enter bertram the countess of rousillon helena and lafeu all in black ",
          ParagraphType: "b",
          Section: 1,
          Chapter: 1,
          CharCount: 79,
          WordCount: 12,
        },
        {
          WorkID: "richard2",
          ParagraphID: 885347,
          ParagraphNum: 1833,
          CharID: "xxx",
          PlainText: "[Enter KING RICHARD and his attendants below]\n",
          PhoneticText: " ENTR KNK RXRT ANT HS ATNTNTS BL ",
          StemText: " enter king richard and hi attend below ",
          ParagraphType: "b",
          Section: 3,
          Chapter: 3,
          CharCount: 46,
          WordCount: 7,
        },
        {
          WorkID: "tamingshrew",
          ParagraphID: 888164,
          ParagraphNum: 577,
          CharID: "hortensio",
          PlainText:
            "Alla nostra casa ben venuto,\n[p]Molto honorato signor mio Petruchio.\n[p]Rise, Grumio, rise; we will compound this quarrel.\n",
          PhoneticText: " AL NSTR KS BN FNT MLT HNRT SKNR M PTRX RS KRM RS W WL KMPNT 0S KRL ",
          StemText:
            " alla nostra casa ben venuto molto honorato signor mio petruchio rise grumio rise we will compound thi quarrel ",
          ParagraphType: "b",
          Section: 1,
          Chapter: 2,
          CharCount: 123,
          WordCount: 18,
        },
      ];

      (Paragraph.findAll as jest.Mock).mockResolvedValue(mockParagraphs);

      const paragraphs = await getParagraphs();
      expect(paragraphs).toContain(mockParagraphs);
      expect(Paragraph.findAll).toHaveBeenCalled();
    });

    it("should throw a DatabaseError if the query fails", async () => {
      (Paragraph.findAll as jest.Mock).mockRejectedValue(new Error("Database error"));

      await expect(getParagraphs()).rejects.toThrow(DatabaseError);
      expect(Paragraph.findAll).toHaveBeenCalled();
    });
  });

  describe("getParagraphById", () => {
    it("should return paragraph with the matching id", async () => {
      const mockParagraph: ParagraphPlain = {
        WorkID: "allswell",
        ParagraphID: 859870,
        ParagraphNum: 25,
        CharID: "Countess-aw",
        PlainText:
          "He was famous, sir, in his profession, and it was\n[p]his great right to be so: Gerard de Narbon.\n",
        PhoneticText: " H WS FMS SR IN HS PRFSN ANT IT WS HS KRT RFT T B S JRRT T NRBN ",
        StemText: " he wa famou sir in hi profess and it wa hi great right to be so gerard de narbon ",
        ParagraphType: "b",
        Section: 1,
        Chapter: 1,
        CharCount: 97,
        WordCount: 19,
      };

      (Paragraph.findByPk as jest.Mock).mockResolvedValue(mockParagraph);

      const paragraph = await getParagraphById(859870);
      expect(paragraph).toEqual(mockParagraph);
      expect(Paragraph.findByPk).toHaveBeenCalledWith(859870);
    });

    it("should throw a NotFoundError if the paragraph is not found", async () => {
      (Paragraph.findByPk as jest.Mock).mockResolvedValue(null);

      await expect(getParagraphById(1234)).rejects.toThrow(NotFoundError);
      expect(Paragraph.findByPk).toHaveBeenCalledWith(1234);
    });

    it("should throw a DatabaseError if the query fails", async () => {
      (Paragraph.findByPk as jest.Mock).mockRejectedValue(new Error("Database error"));

      await expect(getParagraphById(1234)).rejects.toThrow(DatabaseError);
      expect(Paragraph.findByPk).toHaveBeenCalledWith(1234);
    });
  });

  describe("searchParagraphs", () => {
    it("should return paragraphs matching the search term", async () => {
      const mockParagraphs: ParagraphPlain[] = [
        {
          WorkID: "macbeth",
          ParagraphID: 877983,
          ParagraphNum: 2324,
          CharID: "malcolm",
          PlainText: "Cousins, I hope the days are near at hand\n[p]That chambers will be safe.\n",
          PhoneticText: " KSNS I HP 0 TS AR NR AT HNT 0T XMRS WL B SF ",
          StemText: " cousin i hope the dai ar near at hand that chamber will be safe ",
          ParagraphType: "b",
          Section: 5,
          Chapter: 4,
          CharCount: 73,
          WordCount: 14,
          Work: {
            WorkID: "macbeth",
            Title: "Macbeth",
            LongTitle: "The Tragedy of Macbeth",
            ShortTitle: "Macbeth",
            Date: 1605,
            GenreType: "t",
            Notes: {
              type: "Buffer",
              data: [],
            },
            Source: "Moby",
            TotalWords: 17121,
            TotalParagraphs: 765,
          },
        },
        {
          WorkID: "macbeth",
          ParagraphID: 877837,
          ParagraphNum: 1829,
          CharID: "ladymacduff",
          PlainText: "I hope, in no place so unsanctified\n[p]Where such as thou mayst find him.\n",
          PhoneticText: " I HP IN N PLS S UNSNKTFT HR SX AS 0 MST FNT HM ",
          StemText: " i hope in no place so unsanctifi where such a thou mayst find him ",
          ParagraphType: "b",
          Section: 4,
          Chapter: 2,
          CharCount: 74,
          WordCount: 14,
          Work: {
            WorkID: "macbeth",
            Title: "Macbeth",
            LongTitle: "The Tragedy of Macbeth",
            ShortTitle: "Macbeth",
            Date: 1605,
            GenreType: "t",
            Notes: {
              type: "Buffer",
              data: [],
            },
            Source: "Moby",
            TotalWords: 17121,
            TotalParagraphs: 765,
          },
        },
        {
          WorkID: "macbeth",
          ParagraphID: 877990,
          ParagraphNum: 2337,
          CharID: "malcolm",
          PlainText:
            "'Tis his main hope:\n[p]For where there is advantage to be given,\n[p]Both more and less have given him the revolt,\n[p]And none serve with him but constrained things\n[p]Whose hearts are absent too.\n",
          PhoneticText:
            " TS HS MN HP FR HR 0R IS ATFNTJ T B JFN B0 MR ANT LS HF JFN HM 0 RFLT ANT NN SRF W0 HM BT KNSTRNT 0NKS HS HRTS AR ABSNT T ",
          StemText:
            " ti hi main hope for where there i advantag to be given both more and less have given him the revolt and none serv with him but constrain thing whose heart ar absent too ",
          ParagraphType: "b",
          Section: 5,
          Chapter: 4,
          CharCount: 196,
          WordCount: 34,
          Work: {
            WorkID: "macbeth",
            Title: "Macbeth",
            LongTitle: "The Tragedy of Macbeth",
            ShortTitle: "Macbeth",
            Date: 1605,
            GenreType: "t",
            Notes: {
              type: "Buffer",
              data: [],
            },
            Source: "Moby",
            TotalWords: 17121,
            TotalParagraphs: 765,
          },
        },
        {
          WorkID: "macbeth",
          ParagraphID: 878043,
          ParagraphNum: 2495,
          CharID: "macbeth",
          PlainText:
            "Accursed be that tongue that tells me so,\n[p]For it hath cow'd my better part of man!\n[p]And be these juggling fiends no more believed,\n[p]That palter with us in a double sense;\n[p]That keep the word of promise to our ear,\n[p]And break it to our hope. I'll not fight with thee.\n",
          PhoneticText:
            " AKKRST B 0T TNK 0T TLS M S FR IT H0 KT M BTR PRT OF MN ANT B 0S JKLNK FNTS N MR BLFT 0T PLTR W0 US IN A TBL SNS 0T KP 0 WRT OF PRMS T OR ER ANT BRK IT T OR HP IL NT FFT W0 0 ",
          StemText:
            " accurs be that tongu that tell me so for it hath cowd my better part of man and be these juggl fiend no more believ that palter with u in a doubl sens that keep the word of promis to our ear and break it to our hope ill not fight with thee ",
          ParagraphType: "b",
          Section: 5,
          Chapter: 8,
          CharCount: 278,
          WordCount: 53,
          Work: {
            WorkID: "macbeth",
            Title: "Macbeth",
            LongTitle: "The Tragedy of Macbeth",
            ShortTitle: "Macbeth",
            Date: 1605,
            GenreType: "t",
            Notes: {
              type: "Buffer",
              data: [],
            },
            Source: "Moby",
            TotalWords: 17121,
            TotalParagraphs: 765,
          },
        },
        {
          WorkID: "macbeth",
          ParagraphID: 877376,
          ParagraphNum: 224,
          CharID: "macbeth",
          PlainText:
            "[Aside] Glamis, and thane of Cawdor!\n[p]The greatest is behind.\n[p][To ROSS and ANGUS]\n[p]Thanks for your pains.\n[p][To BANQUO]\n[p]Do you not hope your children shall be kings,\n[p]When those that gave the thane of Cawdor to me\n[p]Promised no less to them?\n",
          PhoneticText:
            " AST KLMS ANT 0N OF KTR 0 KRTST IS BHNT T RS ANT ANKS 0NKS FR YR PNS T BNK T Y NT HP YR XLTRN XL B KNKS HN 0S 0T KF 0 0N OF KTR T M PRMST N LS T 0M ",
          StemText:
            " asid glami and thane of cawdor the greatest i behind to ross and angu thank for your pain to banquo do you not hope your children shall be king when those that gave the thane of cawdor to me promis no less to them ",
          ParagraphType: "b",
          Section: 1,
          Chapter: 3,
          CharCount: 256,
          WordCount: 44,
          Work: {
            WorkID: "macbeth",
            Title: "Macbeth",
            LongTitle: "The Tragedy of Macbeth",
            ShortTitle: "Macbeth",
            Date: 1605,
            GenreType: "t",
            Notes: {
              type: "Buffer",
              data: [],
            },
            Source: "Moby",
            TotalWords: 17121,
            TotalParagraphs: 765,
          },
        },
        {
          WorkID: "macbeth",
          ParagraphID: 877352,
          ParagraphNum: 152,
          CharID: "banquo",
          PlainText:
            "Good sir, why do you start; and seem to fear\n[p]Things that do sound so fair? I' the name of truth,\n[p]Are ye fantastical, or that indeed\n[p]Which outwardly ye show? My noble partner\n[p]You greet with present grace and great prediction\n[p]Of noble having and of royal hope,\n[p]That he seems rapt withal: to me you speak not.\n[p]If you can look into the seeds of time,\n[p]And say which grain will grow and which will not,\n[p]Speak then to me, who neither beg nor fear\n[p]Your favours nor your hate.\n",
          PhoneticText:
            " KT SR H T Y STRT ANT SM T FR 0NKS 0T T SNT S FR I 0 NM OF TR0 AR Y FNTSTKL OR 0T INTT HX OTWRTL Y X M NBL PRTNR Y KRT W0 PRSNT KRS ANT KRT PRTKXN OF NBL HFNK ANT OF RYL HP 0T H SMS RPT W0L T M Y SPK NT IF Y KN LK INT 0 STS OF TM ANT S HX KRN WL KR ANT HX WL NT SPK 0N T M H N0R BK NR FR YR FFRS NR YR HT ",
          StemText:
            " good sir why do you start and seem to fear thing that do sound so fair i the name of truth ar ye fantast or that inde which outwardli ye show my nobl partner you greet with present grace and great predict of nobl have and of royal hope that he seem rapt withal to me you speak not if you can look into the se of time and sai which grain will grow and which will not speak then to me who neither beg nor fear your favour nor your hate ",
          ParagraphType: "b",
          Section: 1,
          Chapter: 3,
          CharCount: 498,
          WordCount: 92,
          Work: {
            WorkID: "macbeth",
            Title: "Macbeth",
            LongTitle: "The Tragedy of Macbeth",
            ShortTitle: "Macbeth",
            Date: 1605,
            GenreType: "t",
            Notes: {
              type: "Buffer",
              data: [],
            },
            Source: "Moby",
            TotalWords: 17121,
            TotalParagraphs: 765,
          },
        },
        {
          WorkID: "macbeth",
          ParagraphID: 877431,
          ParagraphNum: 512,
          CharID: "ladymacbeth",
          PlainText:
            "Was the hope drunk\n[p]Wherein you dress'd yourself? hath it slept since?\n[p]And wakes it now, to look so green and pale\n[p]At what it did so freely? From this time\n[p]Such I account thy love. Art thou afeard\n[p]To be the same in thine own act and valour\n[p]As thou art in desire? Wouldst thou have that\n[p]Which thou esteem'st the ornament of life,\n[p]And live a coward in thine own esteem,\n[p]Letting 'I dare not' wait upon 'I would,'\n[p]Like the poor cat i' the adage?\n",
          PhoneticText:
            " WS 0 HP TRNK HRN Y TRST YRSLF H0 IT SLPT SNS ANT WKS IT N T LK S KRN ANT PL AT HT IT TT S FRL FRM 0S TM SX I AKKNT 0 LF ART 0 AFRT T B 0 SM IN 0N ON AKT ANT FLR AS 0 ART IN TSR WLTST 0 HF 0T HX 0 ESTMST 0 ORNMNT OF LF ANT LF A KWRT IN 0N ON ESTM LTNK I TR NT WT UPN I WLT LK 0 PR KT I 0 ATJ ",
          StemText:
            " wa the hope drunk wherein you dressd yourself hath it slept sinc and wake it now to look so green and pale at what it did so freeli from thi time such i account thy love art thou afeard to be the same in thine own act and valour a thou art in desir wouldst thou have that which thou esteemst the ornam of life and live a coward in thine own esteem let i dare not wait upon i would like the poor cat i the adag ",
          ParagraphType: "b",
          Section: 1,
          Chapter: 7,
          CharCount: 471,
          WordCount: 88,
          Work: {
            WorkID: "macbeth",
            Title: "Macbeth",
            LongTitle: "The Tragedy of Macbeth",
            ShortTitle: "Macbeth",
            Date: 1605,
            GenreType: "t",
            Notes: {
              type: "Buffer",
              data: [],
            },
            Source: "Moby",
            TotalWords: 17121,
            TotalParagraphs: 765,
          },
        },
        {
          WorkID: "macbeth",
          ParagraphID: 877862,
          ParagraphNum: 1960,
          CharID: "macduff",
          PlainText:
            "Fit to govern!\n[p]No, not to live. O nation miserable,\n[p]With an untitled tyrant bloody-scepter'd,\n[p]When shalt thou see thy wholesome days again,\n[p]Since that the truest issue of thy throne\n[p]By his own interdiction stands accursed,\n[p]And does blaspheme his breed? Thy royal father\n[p]Was a most sainted king: the queen that bore thee,\n[p]Oftener upon her knees than on her feet,\n[p]Died every day she lived. Fare thee well!\n[p]These evils thou repeat'st upon thyself\n[p]Have banish'd me from Scotland. O my breast,\n[p]Thy hope ends here!\n",
          PhoneticText:
            " FT T KFRN N NT T LF O NXN MSRBL W0 AN UNTTLT TRNT BLTSPTRT HN XLT 0 S 0 HLSM TS AKN SNS 0T 0 TRST IS OF 0 0RN B HS ON INTRTKXN STNTS AKKRST ANT TS BLSFM HS BRT 0 RYL F0R WS A MST SNTT KNK 0 KN 0T BR 0 OFTNR UPN HR NS 0N ON HR FT TT EFR T X LFT FR 0 WL 0S EFLS 0 RPTST UPN 0SLF HF BNXT M FRM SKTLNT O M BRST 0 HP ENTS HR ",
          StemText:
            " fit to govern no not to live o nation miser with an untitl tyrant bloodyscepterd when shalt thou see thy wholesom dai again sinc that the truest issu of thy throne by hi own interdict stand accurs and doe blasphem hi bre thy royal father wa a most saint king the queen that bore thee often upon her knee than on her feet di everi dai she live fare thee well these evil thou repeatst upon thyself have banishd me from scotland o my breast thy hope end here ",
          ParagraphType: "b",
          Section: 4,
          Chapter: 3,
          CharCount: 545,
          WordCount: 89,
          Work: {
            WorkID: "macbeth",
            Title: "Macbeth",
            LongTitle: "The Tragedy of Macbeth",
            ShortTitle: "Macbeth",
            Date: 1605,
            GenreType: "t",
            Notes: {
              type: "Buffer",
              data: [],
            },
            Source: "Moby",
            TotalWords: 17121,
            TotalParagraphs: 765,
          },
        },
        {
          WorkID: "macbeth",
          ParagraphID: 877581,
          ParagraphNum: 1002,
          CharID: "banquo",
          PlainText:
            "Thou hast it now: king, Cawdor, Glamis, all,\n[p]As the weird women promised, and, I fear,\n[p]Thou play'dst most foully for't: yet it was said\n[p]It should not stand in thy posterity,\n[p]But that myself should be the root and father\n[p]Of many kings. If there come truth from them--\n[p]As upon thee, Macbeth, their speeches shine--\n[p]Why, by the verities on thee made good,\n[p]May they not be my oracles as well,\n[p]And set me up in hope? But hush! no more.\n[p][Sennet sounded. Enter MACBETH, as king, LADY]\n[p]MACBETH, as queen, LENNOX, ROSS, Lords, Ladies, and Attendants]\n",
          PhoneticText:
            " 0 HST IT N KNK KTR KLMS AL AS 0 WRT WMN PRMST ANT I FR 0 PLTST MST FL FRT YT IT WS ST IT XLT NT STNT IN 0 PSTRT BT 0T MSLF XLT B 0 RT ANT F0R OF MN KNKS IF 0R KM TR0 FRM 0M AS UPN 0 MKB0 0R SPXS XN H B 0 FRTS ON 0 MT KT M 0 NT B M ORKLS AS WL ANT ST M UP IN HP BT HX N MR SNT SNTT ENTR MKB0 AS KNK LT MKB0 AS KN LNKS RS LRTS LTS ANT ATNTNTS ",
          StemText:
            " thou hast it now king cawdor glami all a the weird women promis and i fear thou playdst most foulli fort yet it wa said it should not stand in thy poster but that myself should be the root and father of mani king if there come truth from them a upon thee macbeth their speech shine why by the veriti on thee made good mai thei not be my oracl a well and set me up in hope but hush no more sennet sound enter macbeth a king ladi macbeth a queen lennox ross lord ladi and attend ",
          ParagraphType: "b",
          Section: 3,
          Chapter: 1,
          CharCount: 575,
          WordCount: 99,
          Work: {
            WorkID: "macbeth",
            Title: "Macbeth",
            LongTitle: "The Tragedy of Macbeth",
            ShortTitle: "Macbeth",
            Date: 1605,
            GenreType: "t",
            Notes: {
              type: "Buffer",
              data: [],
            },
            Source: "Moby",
            TotalWords: 17121,
            TotalParagraphs: 765,
          },
        },
      ];

      (Paragraph.findAll as jest.Mock).mockResolvedValue(mockParagraphs);

      const searchTerm = "hope";
      const workId = "macbeth";

      const paragraphs = await searchParagraphs(searchTerm, workId);
      expect(paragraphs).toContain(mockParagraphs);
      expect(Paragraph.findAll).toHaveBeenCalledWith({
        where: {
          [Op.and]: [literal(`MATCH(PlainText) AGAINST('${searchTerm}')`), { workId }],
        },
        include: [
          {
            model: Work,
            as: "work",
          },
        ],
      });
    });

    it("should throw a NotFoundError if no paragraphs match the search term", async () => {
      (Paragraph.findAll as jest.Mock).mockResolvedValue([]);

      const searchTerm = "nonexistent";
      await expect(searchParagraphs(searchTerm)).rejects.toThrow(NotFoundError);
      expect(Paragraph.findAll).toHaveBeenCalled();
    });

    it("should throw a DatabaseError if the query fails", async () => {
      (Paragraph.findAll as jest.Mock).mockRejectedValue(new Error("Database error"));

      await expect(getParagraphById(1234)).rejects.toThrow(DatabaseError);
      expect(Paragraph.findAll).toHaveBeenCalledWith({
        where: {
          ParagraphId: {
            [Op.eq]: 1234,
          },
        },
      });
    });
  });
});
