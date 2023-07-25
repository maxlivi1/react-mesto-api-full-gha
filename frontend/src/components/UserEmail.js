import React from "react";

export default function UserEmail({ isMobile, userEmail }) {
  const style = `user-email ${isMobile ? "user-email_mobile" : ""}`;
  return <span className={style}>{userEmail}</span>;
}
