import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { routes } from "../utils/constants";
import RegistrationButton from "./RegistrationButton";
import EntranceButton from "./EntranceButton";
import { useState } from "react";
import UserEmail from "./UserEmail";
import ExitButton from "./ExitButton";

export default function NavigationPanel({ userEmail, onSignOut }) {
  console.log("NavigationPanel");
  const [block, setBlock] = useState(null);
  const navigate = useNavigate();
  let location = useLocation();

  const goToRegistration = () => {
    navigate(routes.registration, { replace: true });
  };

  const goToAuth = () => {
    navigate(routes.entrance, { replace: true });
  };

  const getDesiredBlock = () => {
    if (location.pathname === routes.entrance) {
      setBlock(<RegistrationButton onClick={goToRegistration} />);
      console.log("getDesiredBlock", location.pathname);
    } else if (location.pathname === routes.registration) {
      setBlock(<EntranceButton onClick={goToAuth} />);
      console.log("getDesiredBlock", location.pathname);
    } else if (location.pathname === routes.main) {
      setBlock(
        <>
          <UserEmail isMobile={false} userEmail={userEmail} />
          <ExitButton isMobile={false} onSignOut={onSignOut} />
        </>
      );
    }
  };

  useEffect(() => {
    console.log("NavigationPanel / useEffect - изменение location");
    getDesiredBlock();
  }, [location]);

  return (
    <div className="navigation-panel navigation-panel_place_header">
      {block}
    </div>
  );
}
