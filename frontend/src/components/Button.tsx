import React from "react";
import "../css/button.css";

interface IProps {
  title: string;
  type: "button" | "submit" | "reset" | undefined;
}

const Button = (props: IProps) => {
  return <button type={props.type}>{props.title}</button>;
};

export default Button;
