"use client";
import React from "react";
import { useTranslations } from "next-intl";
import SideNav from "@/components/common/SideNav";
import Footer from "@/components/common/Footer";
import { useState } from "react";
import { Grid } from "antd";

const { useBreakpoint } = Grid;

const SettingLayout = ({ children }) => {
  const t = useTranslations();
  const screens = useBreakpoint();
  const tabChildren = [
    {
      title: t("Account"),
      path: "/student/setting/account",
    },
    {
      title: t("Delete"),
      path: "/student/setting/delete",
    },
  ];
  const [isOpen, setIsOpen] = useState(screens.xs ? false : true);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };
  return (
    <section className=" pt-20">
      <SideNav
        isOpen={isOpen}
        handleToggle={handleToggle}
        items={tabChildren}
      />
      <div style={{ marginLeft: isOpen && !screens.xs ? "288px" : "" }}>
        {children}
        <Footer />
      </div>
    </section>
  );
};

export default SettingLayout;
