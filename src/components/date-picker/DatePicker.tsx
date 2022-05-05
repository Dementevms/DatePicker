import React, { useEffect, useState } from "react";

import Years from "./components/years/Years";
import Months from "./components/months/Months";
import Days from "./components/days/Days";

import $ from "./styles.module.scss";

const DatePicker: React.FC = () => {
  const date = new Date("04.10.2022");
  const minValue = new Date("03.05.2010");
  const maxValue = new Date("05.15.2050");

  return (
    <>
      <div className={$.wrapper}>
        <Years
          mode="range"
          value={date}
          minValue={minValue}
          maxValue={maxValue}
        />
      </div>
      <div className={$.wrapper}>
        <Months
          mode="range"
          value={date}
          minValue={minValue}
          maxValue={maxValue}
        />
      </div>
      <div className={$.wrapper}>
        <Days
          mode="range"
          value={date}
          minValue={minValue}
          maxValue={maxValue}
        />
      </div>
    </>
  );
};

export default DatePicker;
