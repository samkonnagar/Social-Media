import React from "react";

function ErrorPop({ message, type}) {
  const errors = {
    info: "text-blue-800 bg-blue-50 dark:bg-gray-800 dark:text-blue-400",
    danger: "text-red-800 bg-red-50 dark:bg-gray-800 dark:text-red-400",
    success: "text-green-800 bg-green-50 dark:bg-gray-800 dark:text-green-400",
    warning:
      "text-yellow-800 bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300",
  };

  const classes = `p-4 mb-4 text-sm rounded-lg fixed right-2 top-2 ${
    errors[type ?? "danger"]
  }`;
  return (
    <div className={classes} role="alert">
      <span className="font-medium">{type?.toUpperCase()}!</span>{" "}
      {message ?? "Something Wrong"}
    </div>
  );
}

export default ErrorPop;
