import React from "react";
import UserEmail from "./UserEmail";
import ExitButton from "./ExitButton";

export default function MobilNavigationPanel({ isOpen, userEmail, onSignOut }) {

  const style = `navigation-panel navigation-panel_mobile ${
    isOpen ? "navigation-panel_visible" : ""
  }`;
  return (
    <div className={style}>
      <UserEmail isMobile={true} userEmail={userEmail} />
      <ExitButton isMobile={true} onSignOut={onSignOut} />
    </div>
  );
}
