import React, { useEffect } from "react";
import { cn } from "../helpers/helpers";
import { usePersonContext } from "../context/PersonContext";
import { useNavigate } from "react-router-dom";
import LoadingBar from "../components/general/LoadingBar";

function PageWrapper({ children, className, secured }) {
  const { isLoggedIn, isPending } = usePersonContext();
  const navigate = useNavigate();
  useEffect(() => {
    if (secured && !isPending && !isLoggedIn) {
      navigate("/");
    }
  }, [secured, isLoggedIn, isPending]);
  return secured && isPending ? (
    <LoadingBar />
  ) : (
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
