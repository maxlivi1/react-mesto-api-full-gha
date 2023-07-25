import React from "react";

export default function ExitButton({ isMobile, onSignOut }) {
  const style = `action-button ${
    isMobile ? "action-button_mobile" : "action-button_type_exit"
  }`;
  return (
    <button className={style} type="button" onClick={onSignOut}>
      Выход
    </button>
  );
}
