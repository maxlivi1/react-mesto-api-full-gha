import React from "react";

export default function EntranceButton({ onClick }) {
  return (
    <button className="action-button" type="button" onClick={onClick}>
      Войти
    </button>
  );
}
