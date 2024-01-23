import React from "react";
import styles from "./InputElement.module.scss";
// Props for the input element
type Props = {
  property: string;
  value: string;

  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const InputElement = ({ property, value, handleChange }: Props) => {
  return (
    <input
      type={property === "password" ? "password" : "text"}
      value={value}
      name={property}
      className={styles.inputElement}
      placeholder={`Enter Your ${property}`}
      onChange={handleChange}
    />
  );
};

export default InputElement;
