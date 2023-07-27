import { useState } from "react";

export function useForm(inputValues = {}) {
  const [values, setValues] = useState(inputValues);

  const handleChangeValues = (event) => {
    const { value, name } = event.target;
    setValues({ ...values, [name]: value });
  };
  return { values, handleChangeValues, setValues };
}
