import React from "react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const history = useNavigate();
  const handleOnClick = () => {
    history("/animations");
  };
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="flex flex-col gap-10 ">
        <p>خوش آمدید برای ورود کلیک کنید</p>
        <button
          onClick={handleOnClick}
          className="mx-auto bg-orange-400 py-2 px-4 w-40 text-center text-white rounded-lg shadow-lg"
        >
          ورود
        </button>
      </div>
    </div>
  );
};

export default HomePage;
