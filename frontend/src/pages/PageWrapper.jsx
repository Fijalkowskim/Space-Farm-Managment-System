import React, { useEffect } from "react";
import { cn } from "../helpers/helpers";
import { useUserContext } from "../context/general/UserContext";
import { useNavigate } from "react-router-dom";

function PageWrapper({ children, className, secured }) {
  const { isLoggedIn } = useUserContext();
  const navigate = useNavigate();
  useEffect(() => {
    if (secured && !isLoggedIn) {
      navigate("/");
    }
  }, [secured, isLoggedIn]);
  return (
    <div
      className={cn(
        "min-h-screen flex items-start justify-center p-2 mt-16",
        className
      )}
    >
      {children}
    </div>
  );
}

export default PageWrapper;
