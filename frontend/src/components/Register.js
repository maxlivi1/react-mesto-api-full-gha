import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "../hooks/useForm";
import { routes } from "../utils/constants";

export default function Register(props) {
  const { onRegister, isSubmitDisable } = props;

  const { values, handleChangeValues } = useForm({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  function goToAuth() {
    navigate(routes.entrance, { replace: true });
  }

  function handleSubmit(event) {
    event.preventDefault();
    onRegister({ email: values.email, password: values.password });
  }

  return (
    <div className="login">
      <form
        name="sign-in-form"
        className="login__form"
        action="#"
        onSubmit={handleSubmit}
      >
        <h3 className="login__title">Регистрация</h3>
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
          Зарегистрироваться
        </button>
        <div className="login__info">
          <span>Уже зарегистрированы?</span>
          <button
            className="login__enter-button"
            type="button"
            onClick={goToAuth}
            disabled={isSubmitDisable}
          >
            Войти
          </button>
        </div>
      </form>
    </div>
  );
}
