import Reactfrom, { useEffect, useState } from "react";
import { cn } from "../../helpers/helpers";
import CustomButton from "../general/CustomButton";
import { NavLink, useLocation } from "react-router-dom";
import React from "react";

function NavbarLink({ data, className }) {
  const { pathname } = useLocation();
  const [active, setActive] = useState(false);

  useEffect(() => {
    setActive(pathname === data.to);
  }, [pathname, data.to]);

  return (
    <NavLink to={data.to}>
      <button
        className={cn(
          `group font-light relative w-fit flex-shrink-0 cursor-pointer hover:text-primary-600 transition-all ${
            active && "text-primary-500"
          }  `,
          className
        )}
      >
        {data.button ? (
          <CustomButton variant={"primary"}>{data.name}</CustomButton>
        ) : (
          data.name
        )}
      </button>
    </NavLink>
  );
}

export default NavbarLink;
