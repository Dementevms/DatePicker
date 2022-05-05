import React, { useEffect, useState } from "react";

import Items from "../items/Items";
import Navigator from "../navigator/Navigator";

import {
  getDateWithOffset,
  callSetSelecteRange,
  compareDates,
} from "components/date-picker/utils";

const _getCountDaysInMonth = (date: Date) => {
  const last = new Date(date.getFullYear(), date.getMonth(), 31).getDate();
  const diff = 31 - last;

  switch (diff) {
    case 0:
      return 31;
    case 1:
      return 30;
    default:
      return diff;
  }
};

const _getFirstDay = (date: Date) => {
  const day = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  return day === 0 ? 7 : day;
};

const getDays = (value: Date, page: number) => {
  const date = new Date(value.getFullYear(), value.getMonth() + page, 1);
  const firstDay = _getFirstDay(date);
  const datePrevMonth = new Date(date.getFullYear(), date.getMonth() - 1, 1);
  const countDaysPrevMonth = _getCountDaysInMonth(datePrevMonth);

  const numbers: number[] = [];

  for (let i = firstDay - 2; i >= 0; i--) {
    // numbers.push(countDaysPrevMonth - i);
    numbers.push(-10);
  }

  const countDaysCurMonth = _getCountDaysInMonth(date);

  for (let i = 1; i <= countDaysCurMonth; i++) {
    numbers.push(i);
  }

  const diff = 7 * 5 - numbers.length;

  if (diff > 0) {
    for (let i = 1; i <= diff; i++) {
      // numbers.push(i);
      numbers.push(-10);
    }
  } else {
    for (let i = 1; i <= 7 + diff; i++) {
      // numbers.push(i);
      numbers.push(-10);
    }
  }

  return numbers;
};

type Mode = "single" | "range";
type Range = {
  from?: Date;
  to?: Date;
};

export type Props = {
  mode?: Mode;
  value?: Date;
  minValue?: Date;
  maxValue?: Date;

  onClick?: (value: Date) => void;
};

const Days: React.FC<Props> = ({
  value,
  mode = "single",
  minValue,
  maxValue,
}) => {
  const [startDate, setStartDate] = useState<Date>();
  const [page, setPage] = useState<number>(0);
  const [selected, setSelected] = useState<Date>();
  const [selectedRange, setSelectedRange] = useState<Range>({
    from: undefined,
    to: undefined,
  });
  const [days, setDays] = useState<number[]>();

  useEffect(() => {
    const initDate = value ? value : new Date(Date.now());
    setSelected(initDate);
    setStartDate(initDate);
  }, [value]);

  useEffect(() => {
    if (startDate) setDays(getDays(startDate, page));
  }, [startDate, page]);

  if (!startDate) return null;

  const onChangeNavigation = (value: string) => {
    value === "prev" ? setPage(page - 1) : setPage(page + 1);
  };

  const getNavigatorValue = () => {
    const date = getDateWithOffset(startDate, page, "YM");
    return date.toLocaleDateString("ru-RU", { year: "numeric", month: "long" });
  };

  const onSingleSelect = (value: number) => {
    const date = getDateWithOffset(startDate, page, "YMD", value);
    setSelected(date);
  };

  const onRangeSelect = (value: number) => {
    if (!selectedRange) return;
    const date = getDateWithOffset(startDate, page, "YMD", value);
    callSetSelecteRange(date, selectedRange, setSelectedRange);
  };

  const onClickItem = (value: number) => {
    mode === "single" ? onSingleSelect(value) : onRangeSelect(value);
  };

  // Check included selected Day in current year month

  const checkISDICYM = (date?: Date) => {
    if (!date) return false;
    const date1 = getDateWithOffset(startDate, page, "YM");

    return compareDates([date1, date], "YM");
  };

  const getItemsSingleValue = () => {
    return checkISDICYM(selected!) ? selected!.getDate() : undefined;
  };

  const getItemsRangeValue = () => {
    const { from, to } = selectedRange;
    const checkISDICYMForm = checkISDICYM(selectedRange.from);
    const checkISDICYMTo = checkISDICYM(selectedRange.to);

    return {
      from:
        checkISDICYMForm === 0
          ? from?.getDate()
          : checkISDICYMForm > 0
          ? 1
          : undefined,
      to:
        checkISDICYMTo === 0
          ? to?.getDate()
          : checkISDICYMTo < 0
          ? 32
          : undefined,
    };
  };

  const getItemsValue = () => {
    return mode === "single" ? getItemsSingleValue() : getItemsRangeValue();
  };

  const getMinValue = () => {
    if (!minValue) return;
    const date = getDateWithOffset(startDate, page, "YM");
    const compare = compareDates([date, minValue], "YM");
    if (compare === 0) return minValue.getDate();
    if (compare < 0) return 32;
  };

  const getMaxValue = () => {
    if (!maxValue) return;
    const date = getDateWithOffset(startDate, page, "YM");
    const compare = compareDates([date, maxValue], "YM");
    if (compare === 0) return maxValue.getDate();
    if (compare > 0) return 0;
  };

  return (
    <div>
      <Navigator value={getNavigatorValue()} onClick={onChangeNavigation} />
      <Items
        variant="days"
        values={days}
        value={getItemsValue()}
        minValue={getMinValue()}
        maxValue={getMaxValue()}
        onClick={onClickItem}
      />
    </div>
  );
};

export default Days;
