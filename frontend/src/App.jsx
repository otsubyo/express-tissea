import React from "react";
import { Outlet } from "react-router-dom";

const App = () => {
  return (
    <div>
      {/* Header commun ici si besoin */}
      <Outlet />
      {/* Footer commun ici si besoin */}
    </div>
  );
};

export default App;
