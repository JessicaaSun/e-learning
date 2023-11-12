import React from "react";
import Image from "next/image";

const FeedBackCard = ({ width, avatar, name, feedback }) => {
  return (
    <div
      style={{ filter: "drop-shadow(0px 8px 10px rgba(0, 0, 0, 0.06))" }}
      className={`${width} max-md:w-[90%] p-7 flex max-sm:justify-center max-sm:items-center max-sm:flex-col justify-between bg-white rounded-[25px]`}
    >
        <div className="w-[180px] max-sm:w-[125px]  max-sm:h-[125px] ">
            <Image alt="avatar" width={120} height={120} src={avatar} style={{width:"100%"}} className="rounded-full"/>
        </div>
        <div className="flex ms-6 max-sm:pt-4 max-sm:items-center max-sm:text-center max-sm:ms-0 flex-col">
            <h3>
                {name}
            </h3>
            <p className="pt-6 max-sm:pt-3">
                {feedback}
            </p>
        </div>
    </div>
  );
};

export default FeedBackCard;
