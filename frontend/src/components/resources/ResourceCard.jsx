import React from "react";
import { NavLink } from "react-router-dom";

function ResourceCard({ name, navigateTo }) {
  return (
    <NavLink
      className="bg-background-950/80 p-8 w-full max-w-80 aspect-square text-center flex items-center justify-center  text-xl hover:text-primary-600 transition-colors"
      to={navigateTo}
    >
      {name}
    </NavLink>
  );
}

export default ResourceCard;
