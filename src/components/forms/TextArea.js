"use client";
import React, { useState } from "react";

const TextAreaComponent = ({
  isRequired,
  placeholder,
  showSendIcon,
  height,
  resize,
  fontSize,
}) => {
  const [text, setText] = useState("");

  const handleChange = (event) => {
    setText(event.target.value);
  };

  const handleSend = () => {
    if (text.length > 0) {
      // Perform your send action here
      // console.log("Sending message:", text);
      setText("");
    }
  };

  return (
    <div className="w-full relative md:w-full">
      <div className="absolute z-20 top-[10px] right-[10px]">
        {text.length > 0 && showSendIcon && (
          <div className="cursor-pointer" onClick={handleSend}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="#3c5cff"
              className="w-5 h-5"
            >
              <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
            </svg>
          </div>
        )}
      </div>
      <textarea
        className={`bg-gray-100 text-[${fontSize}px] rounded-lg border-none border-gray-300 leading-normal ${resize} w-full h-${height} py-2 px-3 placeholder-gray-700 focus:outline-none focus:bg-gray-50`}
        name="body"
        placeholder={placeholder}
        required={isRequired}
        value={text}
        onChange={handleChange}
      ></textarea>
    </div>
  );
};

export default TextAreaComponent;
