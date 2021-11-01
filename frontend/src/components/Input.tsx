import React from "react";
import "../css/input.css";
import error from "./outline_check_black_24dp.png";

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
      <label>
        {props.label}
        {/* <img src={error} alt="error" /> */}
      </label>
      <input
        type={props.type}
        placeholder={props.placeholder}
        onChange={props.onChange}
        required
      />
      {/* // </div> */}
    </React.Fragment>
  );
};

export default Input;
