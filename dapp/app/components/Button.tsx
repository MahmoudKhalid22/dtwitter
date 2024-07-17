import React from "react";

function Button({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      className="bg-blue-400 text-white rounded-xl py-2 px-6 block"
      onClick={onClick}
    >
      {label}
    </button>
  );
}

export default Button;
