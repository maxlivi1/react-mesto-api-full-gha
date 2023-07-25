import React from "react";

export default function RegistrationButton({ onClick }) {
  return (
    <button className="action-button" type="button" onClick={onClick}>
      Регистрация
    </button>
  );
}
