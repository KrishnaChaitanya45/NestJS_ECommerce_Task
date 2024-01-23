import { useContext, useState } from "react";
import { useForm } from "../useForm";
import InputElement from "../InputElement/InputElement";
import styles from "./CustomForm.module.scss";
import { RouterContext } from "../../routes/Routes";
type CustomFormProps = {
  submitHandler: (
    e: React.FormEvent<HTMLFormElement>,
    details: { [key: string]: string }
  ) => void;
  initialValues: { [key: string]: string };
  isLogin: boolean;
};

export const CustomForm = ({
  submitHandler,
  isLogin,
  initialValues,
}: CustomFormProps) => {
  const { handleChange, values } = useForm(initialValues);
  const { pushState } = useContext(RouterContext);
  return (
    <form
      onSubmit={(e) => {
        submitHandler(e, values);
      }}
    >
      {Object.keys(values || {}).map((key, index) => (
        <div className={styles.formElement}>
          <label>{key && key[0].toUpperCase() + key.slice(1)}</label>
          <InputElement
            value={values[key]}
            property={key}
            key={index}
            handleChange={handleChange}
          />
        </div>
      ))}
      <div className={styles.formElement}>
        <button type="submit">{isLogin ? "Login 🔥" : "Register 🚀"}</button>
      </div>

      <div className={styles.formElement}>
        <p
          onClick={() => {
            if (isLogin) pushState("/signup");
            else pushState("/signin");
          }}
        >
          {isLogin ? "Don't have an account?  " : "Already have an account?"}
          <span>{isLogin ? "Sign Up" : "Login"}</span>
        </p>
      </div>
    </form>
  );
};
