import { callSetSelecteRange } from "components/date-picker/utils";
import React, { FC, useEffect, useState } from "react";

import Items from "../items/Items";
import Navigator from "../navigator/Navigator";

import $ from "./styles.module.scss";
type Mode = "single" | "range";

type Props = {
  mode?: Mode;
  value?: Date;
  maxValue?: Date;
  minValue?: Date;

  onChange?: (value: Date) => void;
};

type Range = {
  from?: Date;
  to?: Date;
};

const COUNT_YEARS = 12;

const getYears = (date: Date, page: number) => {
  const years: number[] = [];
  const offset = COUNT_YEARS / 2 - 1 + 12 * page;
  const start = date.getFullYear() - offset;
  for (let i = start; i < start + COUNT_YEARS; i++) {
    years.push(i);
  }

  return years;
};

const Years: FC<Props> = ({ mode = "single", value, maxValue, minValue }) => {
  const [page, setPage] = useState<number>(0);
  const [selected, setSelected] = useState<Date>();
  const [selectedRange, setSelectedRange] = useState<Range>({
    from: undefined,
    to: undefined,
  });
  const [years, setYears] = useState<number[]>();

  useEffect(() => {
    if (value) {
      setYears(getYears(value, page));
      setSelected(value);
    } else {
      setYears(getYears(new Date(Date.now()), page));
    }
  }, [value, page]);

  const onChangeNavigation = (value: string) => {
    value === "prev" ? setPage(page + 1) : setPage(page - 1);
  };

  const getNavigatorValue = () => {
    if (!years) return undefined;
    return `${years[0]} - ${years[years.length - 1]}`;
  };

  const onSingleSelect = (value: number) => {
    setSelected(new Date(value.toString()));
  };

  const onRangeSelect = (value: number) => {
    if (!selectedRange) return;
    const date = new Date(value.toString());
    callSetSelecteRange(date, selectedRange, setSelectedRange);
  };

  const onClickItem = (value: number) => {
    mode === "single" ? onSingleSelect(value) : onRangeSelect(value);
  };

  const getItemsSingleValue = () => {
    return selected?.getFullYear();
  };

  const getItemsRangeValue = () => {
    return {
      from: selectedRange.from?.getFullYear(),
      to: selectedRange.to?.getFullYear(),
    };
  };

  const getItemsValue = () => {
    return mode === "single" ? getItemsSingleValue() : getItemsRangeValue();
  };

  return (
    <div className={$.wrapper}>
      <Navigator value={getNavigatorValue()} onClick={onChangeNavigation} />
      <Items
        variant="years"
        value={getItemsValue()}
        values={years}
        minValue={minValue?.getFullYear()}
        maxValue={maxValue?.getFullYear()}
        onClick={onClickItem}
      />
    </div>
  );
};

export default Years;
