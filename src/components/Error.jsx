import React from "react";

const Error = ({ message }) => {
  return (
    <div className="w-full">
      <div
        className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative m-auto"
        role="alert"
      >
        <strong className="font-bold">{message.status}</strong>
      </div>
    </div>
  );
};

export default Error;
