import React, { useContext } from "react";
import styles from "./SignUp.module.scss";
import { RouterContext } from "../../../routes/Routes";
import { AuthContext } from "../../../context/AuthContext";
import { CustomForm } from "../../../utils/CustomForm/CustomForm";
import { submitHandler } from "../../../utils/SubmitHandler";
const SIGN_UP_VALUES = {
  name: "",
  email: "",
  password: "",
};
const SignUp = () => {
  const { pushState } = useContext(RouterContext);
  const { setUser } = useContext(AuthContext);
  const errorRef = React.useRef<HTMLDivElement>(null);
  function signUpHandler(
    e: React.FormEvent<HTMLFormElement>,
    values: { [key: string]: string }
  ) {
    e.preventDefault();
    submitHandler(values, errorRef, setUser, pushState, false);
  }
  return (
    <section className={styles.container}>
      <main className={styles.main}>
        <h2>Sign Up</h2>
        <div ref={errorRef} className={styles.errorDiv}></div>
        <CustomForm
          initialValues={SIGN_UP_VALUES}
          isLogin={false}
          submitHandler={signUpHandler}
        />
      </main>
    </section>
  );
};

export default SignUp;
