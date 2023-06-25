import React from "react";

function TodoBtn({ children, handleFunction, customStyle,status }) {
  return (
    <button
    disabled={status}
      onClick={handleFunction}
      className={`${customStyle} flex-no-shrink p-2 ml-4 mr-2 border-2 rounded hover:text-white text-green border-green hover:bg-green-300`}
    >
      {children}
    </button>
  );
}

export default TodoBtn;
