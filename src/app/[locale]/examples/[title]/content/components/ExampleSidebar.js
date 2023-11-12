"use client";
import React from "react";
import { useTranslations } from "next-intl";
import SideNav from "@/components/common/SideNav";
import { exampleData } from "@/data/mockExample";
import { useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { Grid } from "antd";

const { useBreakpoint } = Grid;

const ContentSidebar = ({ children }) => {
  const screens = useBreakpoint();
  const t = useTranslations();
  const [isOpen, setIsOpen] = useState(screens.xs ? false : true);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const tabChildren = exampleData[0].lesson;
  return (
    <section className="h-full pt-7">
      <SideNav isOpen={isOpen} handleToggle={handleToggle} items={tabChildren}/>
        <div
          className="pb-20 px-10"
          style={{ marginLeft: isOpen && !screens.xs ? "288px" : "" }}
        >
          {children}
        </div>
     
    </section>
  );
};

export default ContentSidebar;
