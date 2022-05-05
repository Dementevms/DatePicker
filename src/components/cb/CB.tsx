import React, { useEffect, useState, MouseEvent } from "react";
import { useDispatch } from "react-redux";
// import { useAppSelector, useAppDispatch } from "store";

import { fetchNotifications } from "store/Notifications";

type Props = {
  value?: number;
  className?: string;
};

const CB: React.FC<Props> = (props) => {
  // const posts = useAppSelector((state) => state.notifications.entities);
  // console.log(posts);
  const dispatch = useDispatch();

  const [counter, setCounter] = useState<number>(0);

  const onIncrement = (event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    setCounter(counter + 1);
  };

  const onDecrement = (event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    setCounter(counter - 1);
  };

  const clickDocument = () => {
    setCounter(0);
  };

  const getPosts = () => {
    dispatch(fetchNotifications());
  };

  useEffect(() => {
    if (props.value) setCounter(props.value);
    document.addEventListener("click", clickDocument);
    return () => {
      document.removeEventListener("click", clickDocument);
    };
  }, [props.value]);

  return (
    <div className="callback">
      <div className="counter">
        <div className="increment" onClick={onIncrement}>
          +
        </div>
        <div className="result">{counter}</div>
        <div className="decrement" onClick={onDecrement}>
          -
        </div>
      </div>
      <button onClick={getPosts}>Get Posts</button>
    </div>
  );
};

export default CB;
