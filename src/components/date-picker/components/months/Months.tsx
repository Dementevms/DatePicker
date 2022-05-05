import React, { useEffect, useState } from "react";

import Items from "../items/Items";
import Navigator from "../navigator/Navigator";

import {
  callSetSelecteRange,
  compareDates,
} from "components/date-picker/utils";

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

const Months: React.FC<Props> = ({
  value,
  mode = "single",
  minValue,
  maxValue,
}) => {
  const [startDate, setStartDate] = useState<Date>();
  const [offset, setOffset] = useState<number>(0);
  const [selected, setSelected] = useState<Date>();
  const [selectedRange, setSelectedRange] = useState<Range>({
    from: undefined,
    to: undefined,
  });

  useEffect(() => {
    const initDate = value ? value : new Date(Date.now());
    setSelected(initDate);
    setStartDate(initDate);
  }, [value]);

  if (!startDate) return null;

  const getDateWithOffset = (
    startDate: Date,
    offset: number,
    value: number
  ) => {
    return new Date(startDate.getFullYear() + offset, value);
  };

  const onChangeNavigation = (value: string) => {
    value === "prev" ? setOffset(offset - 1) : setOffset(offset + 1);
  };

  const onSingleSelect = (value: number) => {
    const date = getDateWithOffset(startDate, offset, value);
    setSelected(date);
  };

  const onRangeSelect = (value: number) => {
    if (!selectedRange) return;
    const date = getDateWithOffset(startDate, offset, value);
    callSetSelecteRange(date, selectedRange, setSelectedRange);
  };

  const onClickItem = (value: number) => {
    mode === "single" ? onSingleSelect(value) : onRangeSelect(value);
  };

  // Check included selected Month in current year

  const checkISMICY = (date?: Date) => {
    if (!date) return false;
    return startDate.getFullYear() === date.getFullYear();
  };

  const getSingleValue = () => {
    return checkISMICY(selected) ? selected!.getMonth() : undefined;
  };

  const getRangeValue = () => {
    const { from, to } = selectedRange;

    return {
      from: checkISMICY(from) ? from!.getMonth() : undefined,
      to: checkISMICY(to) ? to!.getMonth() : undefined,
    };
  };

  const getValue = () => {
    return mode === "single" ? getSingleValue() : getRangeValue();
  };

  const getMinValue = () => {
    if (!minValue) return;
    const date = getDateWithOffset(startDate, offset, 0);
    const compare = compareDates([date, minValue], "Y");
    if (compare === 0) return minValue.getMonth();
    if (compare < 0) return 12;
  };

  const getMaxValue = () => {
    if (!maxValue) return;
    const date = getDateWithOffset(startDate, offset, 0);
    const compare = compareDates([date, maxValue], "Y");
    if (compare === 0) return maxValue.getMonth();
    if (compare > 0) return -1;
  };

  const getNavigatorValue = () => {
    const date = getDateWithOffset(startDate, offset, 0);
    return date.toLocaleDateString("ru-RU", { year: "numeric" });
  };

  console.log(selected);

  return (
    <div>
      <Navigator value={getNavigatorValue()} onClick={onChangeNavigation} />
      <Items
        variant="months"
        values={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]}
        value={getValue()}
        minValue={getMinValue()}
        maxValue={getMaxValue()}
        onClick={onClickItem}
      />
    </div>
  );
};

export default Months;
