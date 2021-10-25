import React from "react";
import "../css/button.css";

interface IProps {
  title: string;
  type: "button" | "submit" | "reset" | undefined;
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
}

const Button = (props: IProps) => {
  return (
    <button type={props.type} onClick={props.onClick}>
      {props.title}
    </button>
  );
};

export default Button;
