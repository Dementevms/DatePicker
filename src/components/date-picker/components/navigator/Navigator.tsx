import React, { FC } from "react";

import $ from "./styles.module.scss";

type NavigatorAction = "prev" | "next";

type Props = {
  value?: string;
  onClick?: (value: NavigatorAction) => void;
};

const Navigator: FC<Props> = ({ value, onClick }) => {
  const onPrev = () => {
    if (onClick) onClick("prev");
  };

  const onNext = () => {
    if (onClick) onClick("next");
  };

  return value ? (
    <div className={$.wrapper}>
      <div className={$.prev} onClick={onPrev}>
        {"<"}
      </div>
      <div className={$.value}>{value}</div>
      <div className={$.next} onClick={onNext}>
        {">"}
      </div>
    </div>
  ) : null;
};

export default Navigator;
