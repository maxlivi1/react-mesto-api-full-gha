import React from "react";
import { useForm } from "../hooks/useForm";

export default function Login(props) {
  const { onLogin, isSubmitDisable } = props;
  const { values, handleChangeValues } = useForm({
    email: "",
    password: "",
  });

  function handleSubmit(event) {
    event.preventDefault();
    onLogin({ email: values.email, password: values.password });
  }

  return (
    <div className="login">
      <form
        name="sign-in-form"
        className="login__form"
        action="#"
        onSubmit={handleSubmit}
      >
        <h3 className="login__title">Вход</h3>
        <fieldset className="login__inputs-container">
          <input
            value={values.email}
            onChange={handleChangeValues}
            name="email"
            id="sign-in-email"
            className="login__input"
            type="email"
            placeholder="Email"
            autoComplete="off"
            required
          />
          <input
            value={values.password}
            onChange={handleChangeValues}
            name="password"
            id="sign-in-password"
            className="login__input"
            type="password"
            placeholder="Пароль"
            autoComplete="off"
            required
            minLength={5}
            maxLength={100}
          />
        </fieldset>
        <button
          className="login__submit"
          type="submit"
          disabled={isSubmitDisable}
        >
          Войти
        </button>
      </form>
    </div>
  );
}
