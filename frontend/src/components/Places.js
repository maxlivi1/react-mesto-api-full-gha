import React from "react";

function Places({ children }) {
  return (
    <section className="places" aria-label="Места">
      {children}
    </section>
  );
}

export default Places;
