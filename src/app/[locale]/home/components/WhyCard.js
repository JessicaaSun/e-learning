import React from "react";

const WhyCard = ({ title, icon, description, bg }) => {
  return (
    <div style={{filter: "drop-shadow(0px 8px 18px rgba(0, 0, 0, 0.05))"}} className="w-[310px] h-[336px] flex flex-col items-center hover:scale-105 transition-all cursor-pointer text-center justify-center bg-white p-8 rounded-[20px]" >
      <div
        className={`w-[113px] flex justify-center items-center h-[113px] rounded-full ${bg}`}
      >
        {icon}
      </div>
      <h3 className=" pt-5 font-semibold text-[20px] leading-[31px]">{title}</h3>
      <p className="pt-5 text-[#707579]">{description}</p>
    </div>
  );
};

export default WhyCard;
