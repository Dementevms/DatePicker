import React, { FC } from "react";

import { inRange } from "components/date-picker/utils";

import $ from "./styles.module.scss";

type RangeNumber = {
  from?: number;
  to?: number;
};

type Variant = "years" | "months" | "days";

type Props = {
  value?: number | RangeNumber;
  values?: number[];
  variant?: Variant;
  minValue?: number;
  maxValue?: number;
  prefix?: number;

  onClick?: (value: number) => void;
};

const Items: FC<Props> = ({
  value,
  values,
  variant,
  minValue,
  maxValue,
  prefix = 0,
  onClick,
}) => {
  const buildClassName = (item: number) => {
    if (!value) return "";
    if (typeof value === "number") {
      return item === value ? $.selected : "";
    } else {
      return item === value.from
        ? $.selected
        : item >= value.from! && item <= value.to!
        ? $.ranged
        : "";
    }
  };

  const setDisableStyle = (item: number) => {
    if (item < 0) return;
    return !inRange(minValue, maxValue, item) ? $.disabled : undefined;
  };

  return values ? (
    <div className={variant ? $[variant] : $.items}>
      {values.map((item, index) => {
        const check = inRange(minValue, maxValue, item);
        return (
          <div
            key={index + prefix}
            className={`${$.item} ${buildClassName(item)} ${setDisableStyle(
              item
            )}`}
            onClick={() => {
              if (onClick && check && item > 0) onClick(item);
            }}
          >
            {item >= 0 && item}
          </div>
        );
      })}
    </div>
  ) : null;
};

export default Items;
