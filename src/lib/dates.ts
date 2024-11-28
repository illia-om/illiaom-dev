export const parseIntoDate =
  (inputFormat: "DD-MM-YYYY" | "MM-DD-YYYY" = "DD-MM-YYYY") =>
  (input: string) => {
    const inputKeys = inputFormat.split("-") as Array<"DD" | "MM" | "YYYY">;
    const inputValues = input.split("-");

    if (inputValues.length !== 3) {
      throw new Error(`parseIntoDate ERROR: '${input}' is invalid date`);
    }

    const dateObject = inputKeys.reduce((object, key, index) => {
      return {
        ...object,
        [key]: Number(inputValues[index]),
      };
    }, {} as Record<"DD" | "MM" | "YYYY", number>);

    return new Date(dateObject.YYYY, dateObject.MM - 1, dateObject.DD);
  };

export const parseDMYIntoDate = parseIntoDate("DD-MM-YYYY");

export const dateToString =
  (outputFormat: "MMM YYYY" = "MMM YYYY") =>
  (input: Date) => {
    const monthShort = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const splitSymbol = " ";

    const outputKeys = outputFormat.split(splitSymbol) as Array<"MMM" | "YYYY">;

    const dateObject = {
      MMM: monthShort[input.getMonth()],
      YYYY: input.getFullYear(),
    };

    return outputKeys.map((key) => dateObject[key]).join(splitSymbol);
  };

export const dateToMYString = dateToString("MMM YYYY");

export const durationInMonth = (t1: Date, t2: Date) => {
  const yearsDiff = t1.getFullYear() - t2.getFullYear();
  const monthDiff = t1.getMonth() - t2.getMonth();

  const totalMonthDiff = Math.abs(yearsDiff * 12 + monthDiff);

  return totalMonthDiff;
};

export const durationString = (t1: Date, t2: Date) => {
  const monthsDuration = durationInMonth(t1, t2);

  const yearsPart =
    Math.floor(monthsDuration / 12) > 0
      ? `${Math.floor(monthsDuration / 12)}y`
      : "";
  const monthsPart = monthsDuration % 12 > 0 ? `${monthsDuration % 12}m` : "";

  return `${yearsPart} ${monthsPart}`.trim();
};
