import React from "react";

import ListItem from "./ListItem";

//@ts-ignore
window.debug = {};

type Props = {
  items: { id: number; title: string }[];
};

const List: React.FC<Props> = (props) => {
  //   console.log("Render List");


  const onClickDIV = () => {
    console.log("onClickDIV");
  };

  const result = (
    <>
      {props.items.map((item) => (
        <ListItem
          key={item.id}
          id={item.id}
          title={item.title}
          onClick={onClickDIV}
        />
        // <div key={item.id} onClick={onClickDIV}>
        //   {item.title}
        // </div>
      ))}
    </>
  );

  //   console.log(result);
  //   console.log(
  //     result.props.children[0].props.onClick ===
  //       result.props.children[1].props.onClick
  //   );

  return result;
};

export default List;
