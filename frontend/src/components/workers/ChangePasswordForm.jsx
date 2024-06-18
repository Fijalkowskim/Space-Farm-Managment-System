import React, { useState } from "react";
import FormInput from "../loginPanel/FormInput";
import { FaEye } from "react-icons/fa";
import CustomButton from "../general/CustomButton";
import { usePersonContext } from "../../context/PersonContext";
import { usePopupContext } from "../../context/general/PopupContext";
function ChangePasswordForm({ onSuccess }) {
  const [password, setPassword] = useState("");
  const [newpassword, setNewpassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const { changePassword } = usePersonContext();
  const { addMessage } = usePopupContext();
  const onSubmit = async () => {
    if (await changePassword(password, newpassword)) {
      addMessage("Password chaged successfully");
      onSuccess();
    }
  };
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
      className="p-4 bg-background-900 flex flex-col items-center justify-center gap-2"
    >
      <div className="relative w-full">
        <FormInput
          id="password"
          value={password}
          setValue={setPassword}
          required
          type={showPassword ? "text" : "password"}
        >
          Old password
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
      <div className="relative w-full">
        <FormInput
          id="password"
          value={newpassword}
          setValue={setNewpassword}
          required
          type={showNewPassword ? "text" : "password"}
        >
          New password
        </FormInput>
        <button
          className="absolute bottom-0 h-10 right-3 z-10 text-background-950"
          type="button"
          onClick={() => {
            setShowNewPassword((prev) => !prev);
          }}
        >
          <FaEye />
        </button>
      </div>
      <CustomButton>Change</CustomButton>
    </form>
  );
}

export default ChangePasswordForm;
