import { useState } from "react";

export const useForm = (initialState: {
  [key: string]: string;
}): {
  values: { [key: string]: string };
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
} => {
  const [values, setValues] = useState(initialState);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    console.log(e.target.value);
    console.log(e.target.name);
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  }

  return {
    values,
    handleChange,
  };
};
