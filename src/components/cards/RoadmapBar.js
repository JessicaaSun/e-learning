import React from "react";
import { useTranslations } from "next-intl";

const RoadMapBar = () => {
    const t = useTranslations()
  return (
    <div className="lg:mx-20 sm:mx-10 max-sm:mx-4 flex flex-col">
      <h2>{t("How will I learn this course?")}</h2>
      <div className="text-white mt-12 w-full lg:text-[22px] sm:text-[18px] sm:font-medium max-sm:text[15px] max:sm:font-normal lg:font-semibold overflow-hidden h-[60px]">
        <div className="ps-7  h-[60px] flex items-center bg-[#5F79FB] rounded-[35px]">
          {t("Read tutorial")}
        </div>
        <div className="ps-7 relative left-[25%] w-[75%] bottom-[60px]  h-[60px] flex items-center bg-[#FA659B] rounded-[35px]">
          {t("Practice example")}
        </div>
        <div className="ps-7 relative left-[50%] w-[50%] bottom-[120px]  h-[60px] flex items-center bg-[#5FEDA1] rounded-[35px]">
          {t("Take Quiz")}
        </div>
        <div className="ps-7 relative left-[75%] w-[25%] bottom-[180px]  h-[60px] flex items-center bg-[#FEE077] rounded-[35px]">
          {t("Take Exercise")}
        </div>
      </div>
    </div>
  );
};

export default RoadMapBar;
