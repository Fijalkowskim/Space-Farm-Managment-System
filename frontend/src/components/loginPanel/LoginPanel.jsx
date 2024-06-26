import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import FormInput from "./FormInput";
import { usePersonContext } from "../../context/PersonContext";
import LoadingBar from "../general/LoadingBar";
import { usePopupContext } from "../../context/general/PopupContext";
function LoginPanel() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const { logIn } = usePersonContext();
  const { addMessage } = usePopupContext();
  const onSumbit = async () => {
    setIsPending(true);
    const success = await logIn(username, password);
    if (!success) {
      addMessage("Wrong username/password", "error", 3000);
    }
    setIsPending(false);
  };

  return (
    <form
      className="flex flex-col gap-4 justify-center items-center py-12 md:py-6 w-full max-w-[20rem] bg-background-800/50 p-10 rounded-lg shadow-md"
      onSubmit={(e) => {
        e.preventDefault();
        onSumbit();
      }}
    >
      <div className="relative w-full">
        <FormInput
          id="username"
          value={username}
          setValue={setUsername}
          required
          type="text"
        >
          Username
        </FormInput>
      </div>
      <div className="relative w-full">
        <FormInput
          id="password"
          value={password}
          setValue={setPassword}
          required
          type={showPassword ? "text" : "password"}
        >
          Password
        </FormInput>
        <button
          className="absolute bottom-0 h-10 right-3 z-10 text-background-950"
          type="button"
          onClick={() => {
            setShowPassword((prev) => !prev);
          }}
        >
          <FaEye />
        </button>
      </div>
      <div className="w-full">
        <button
          className="text-sm font-medium mt-2 h-10 w-full bg-primary-700 hover:bg-primary-800 text-background-50 p-2 rounded-md transition-colors"
          type="submit"
        >
          {isPending ? <LoadingBar /> : "Login"}
        </button>
      </div>
    </form>
  );
}

export default LoginPanel;
