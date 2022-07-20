import React from "react";

const NotSupportedInMobile = () => {
  return (
    <div className="w-full h-full bg-indigo-800 justify-center items-center text-gray-100">
      <h1>
        {
          "😵 Currently, this app is not supported in Mobile Devices, please switch to Desktop or Laptop"
        }
      </h1>
    </div>
  );
};

export default NotSupportedInMobile;
