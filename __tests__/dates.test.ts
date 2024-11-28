import {
  parseDMYIntoDate,
  durationInMonth,
  dateToString,
  durationString,
} from "@/lib/dates";
import { describe, it } from "vitest";

describe("Date util functions", () => {
  describe("Parsing string to a Date with parseDMYIntoDate", () => {
    it("should parse string to date object", ({ expect }) => {
      const parsedDate = parseDMYIntoDate("21-01-2024");
      expect(parsedDate).toBeInstanceOf(Date);
      expect(parsedDate).toStrictEqual(new Date("01-21-2024"));
    });
  });

  describe("durationInMonth function", () => {
    it("should return duration between dates in months", ({ expect }) => {
      const monthsDuration = durationInMonth(
        new Date("01-15-2024"),
        new Date("04-15-2024")
      );
      expect(monthsDuration).toBe(3);
    });

    it("should return absolute value", ({ expect }) => {
      const monthsDuration = durationInMonth(
        new Date("04-15-2024"),
        new Date("01-15-2024")
      );
      expect(monthsDuration).toBe(3);
    });

    it("should return correct even if range is over a year", ({ expect }) => {
      const monthsDuration = durationInMonth(
        new Date("04-15-2024"),
        new Date("01-15-2025")
      );
      expect(monthsDuration).toBe(12 - 3);
    });
  });

  describe("dateToString function", () => {
    it("should return stringified date based on provided format", ({
      expect,
    }) => {
      const dateString = dateToString("MMM YYYY")(new Date("04-15-2024"));
      expect(dateString).toBe("Apr 2024");
    });
  });

  describe("durationString function", () => {
    it("should return stringified duration in 'Ny Nm' format", ({ expect }) => {
      const durationStringRes = durationString(
        new Date("3-1-2019"),
        new Date("7-1-2022")
      );
      expect(durationStringRes).toBe("3y 4m");
    });

    it("should return only 'Ny' if it's round", ({ expect }) => {
      const durationStringRes = durationString(
        new Date("3-1-2019"),
        new Date("3-1-2022")
      );
      expect(durationStringRes).toBe("3y");
    });
  });
});
