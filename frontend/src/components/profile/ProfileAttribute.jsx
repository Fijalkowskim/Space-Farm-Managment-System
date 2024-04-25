import React from "react";

function ProfileAttribute({ label, value }) {
  return (
    <div className="flex flex-col items-start justify-center">
      <h2 className="text-primary-600/80 text-sm">{label}</h2>
      <p className="text-xl">{value}</p>
    </div>
  );
}

export default ProfileAttribute;
