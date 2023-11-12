"use client"
import React from "react";
import { Spinner } from "@material-tailwind/react";

const Loading = () => {
  return (
    <div className="flex justify-center gap-4 items-center h-screen">
      <div className="relative inline-flex">
        <div className="w-8 h-8 bg-gradient-primary rounded-full"></div>
        <div className="w-8 h-8 bg-gradient-primary rounded-full absolute top-0 left-0 animate-ping"></div>
        <div className="w-8 h-8 bg-gradient-primary rounded-full absolute top-0 left-0 animate-pulse"></div>
      </div>
      <div className="relative inline-flex">
        <div className="w-8 h-8 bg-gradient-secondary rounded-full"></div>
        <div className="w-8 h-8 bg-gradient-secondary rounded-full absolute top-0 left-0 delay-[1s] animate-ping"></div>
        <div className="w-8 h-8 bg-gradient-secondary rounded-full absolute top-0 left-0 animate-pulse"></div>
      </div>
      <div className="relative inline-flex">
        <div className="w-8 h-8 bg-gradient-accent rounded-full"></div>
        <div className="w-8 h-8 bg-gradient-accent rounded-full absolute top-0 left-0 delay-[2s] animate-ping"></div>
        <div className="w-8 h-8 bg-gradient-accent rounded-full absolute top-0 left-0 animate-pulse"></div>
      </div>
      <div className="relative inline-flex">
        <div className="w-8 h-8 bg-gradient-addition rounded-full"></div>
        <div className="w-8 h-8 bg-gradient-addition rounded-full absolute top-0 left-0 delay-[3s] animate-ping"></div>
        <div className="w-8 h-8 bg-gradient-addition rounded-full absolute top-0 left-0 animate-pulse"></div>
      </div>
    </div>
  );
};

export default Loading;
