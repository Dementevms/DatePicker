const inRange = (
  min: number = -Infinity,
  max: number = Infinity,
  value: number
) => {
  return min <= value && max >= value;
};

const getDateWithOffset = (
  startDate: Date,
  offset: number,
  variant: "Y" | "YM" | "YMD",
  day?: number
) => {
  switch (variant) {
    case "Y":
      return new Date(startDate.getFullYear() + offset);
    case "YM":
      return new Date(startDate.getFullYear(), startDate.getMonth() + offset);
    case "YMD":
      return new Date(
        startDate.getFullYear(),
        startDate.getMonth() + offset,
        day
      );
  }
};

const getNBYMFD = (date: Date) => {
  return date.getFullYear() + date.getMonth();
};

const _getNBYMDFD = (date: Date) => {
  return date.getFullYear() + date.getMonth() + date.getDate();
};

const _getParamsY = (dates: Date[]) => {
  return {
    n1: dates[0].getFullYear(),
    n2: dates[1].getFullYear(),
  };
};

const _getParamsYM = (dates: Date[]) => {
  return {
    n1: getNBYMFD(dates[0]),
    n2: getNBYMFD(dates[1]),
  };
};

const _getParamsYMD = (dates: Date[]) => {
  return {
    n1: _getNBYMDFD(dates[0]),
    n2: _getNBYMDFD(dates[1]),
  };
};

const _getParams = (dates: Date[], variant: "Y" | "YM" | "YMD") => {
  switch (variant) {
    case "Y":
      return _getParamsY(dates);
    case "YM":
      return _getParamsYM(dates);
    case "YMD":
      return _getParamsYMD(dates);
  }
};

const compareDates = (dates: Date[], variant: "Y" | "YM" | "YMD") => {
  const { n1, n2 } = _getParams(dates, variant);
  return n1 > n2 ? 1 : n1 < n2 ? -1 : 0;
};

const callSetSelecteRange = (
  date: Date,
  selected: { from?: Date; to?: Date },
  setSelected: CallableFunction
) => {
  const { from, to } = selected;

  // Exist range

  if (from && to) {
    const compareFrom = compareDates([date, from], "YMD");
    const compareTo = compareDates([date, to], "YMD");

    // OutFrom

    if (compareFrom < 0) {
      setSelected({ ...selected, from: date });
      return;
    }

    // OutTo

    if (compareTo > 0) {
      setSelected({ ...selected, to: date });
      return;
    }

    // OnRange

    if (compareFrom > 0 && compareTo < 0) {
      setSelected({ ...selected, to: date });
      return;
    }

    // OnTo

    if (compareTo === 0) {
      setSelected({ from: date, to: undefined });
      return;
    }
  }

  if (!from) {
    setSelected({ ...selected, from: date });
    return;
  }

  const compareFrom = compareDates([date, from], "YMD");

  if (compareFrom === 0) {
    setSelected({ from: undefined, to: undefined });
    return;
  }

  if (compareFrom < 0) {
    setSelected({ from: date, to: from });
    return;
  }

  setSelected({ ...selected, to: date });
};

export { inRange, compareDates, getDateWithOffset, callSetSelecteRange };
