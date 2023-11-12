"use client";
import React from "react";
import { useTranslations } from "next-intl";
import { DynamicTab } from "@/components/common/DynamicTab";
import SideNav from "@/components/common/SideNav";
import Footer from "@/components/common/Footer";
import { exampleData } from "@/data/mockExample";

const ExampleContentLayout = ({ children }) => {
  const t = useTranslations();
  const tabChildren = exampleData[0].lesson;
  return (
    <section className=" pt-16">
      <SideNav items={tabChildren} />
      {children}
      <div className="ps-[288px]">
      </div>
    </section>
  );
};

export default ExampleContentLayout;
