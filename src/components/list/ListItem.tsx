import React from "react";

import { cloneDeep } from "lodash";

type Props = {
  id: number;
  title: string;
  onClick?: (value: string) => void;
};

const ListItem: React.FC<Props> = (props) => {
  //   console.log("Render ListItem", props.title);
  const onClick = () => props.onClick!(props.title);

  console.log(typeof props.onClick);

  //@ts-ignore
  window.debug.items[props.id] = props.onClick;

  return <div onClick={onClick}>{props.title}</div>;
};

export default ListItem;
