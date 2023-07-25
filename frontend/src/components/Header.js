import React from "react";
import { useLocation } from "react-router-dom";
import { routes } from "../utils/constants";
import CloseMenuButton from "./CloseMenuButton";
import MenuButton from "./MenuButton";
import NavigationPanel from "./NavigationPanel";

function Header({
  onShow,
  onHide,
  isOpenUserInfo,
  userEmail,
  onSignOut,
  loggedIn,
}) {
  const location = useLocation();
  const isAuth = location.pathname === routes.main && loggedIn;

  return (
    <header className={!isOpenUserInfo ? "header" : "header header_mobile"}>
      <div href="#" className="logo"></div>
      <NavigationPanel userEmail={userEmail} onSignOut={onSignOut} />
      {isAuth &&
        (isOpenUserInfo ? (
          <CloseMenuButton onClick={onHide} />
        ) : (
          <MenuButton onClick={onShow} />
        ))}
    </header>
  );
}

export default Header;
