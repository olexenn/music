import React from "react";
import "../css/input.css";

interface IProps {
  type?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  label: string;
  placeholder: string;
}

const Input = (props: IProps) => {
  return (
    <React.Fragment>
      {/* // <div> */}
      <label>{props.label}</label>
      <input
        type={props.type}
        placeholder={props.placeholder}
        onChange={props.onChange}
      />
      {/* // </div> */}
    </React.Fragment>
  );
};

export default Input;
