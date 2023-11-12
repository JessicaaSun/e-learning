"use client";
import React from "react";
import { useTranslations } from "next-intl";
import SideNav from "@/components/common/SideNav";
import Footer from "@/components/common/Footer";
import { useState } from "react";
import { Grid } from "antd";
import { usePathname } from "next/navigation";

const { useBreakpoint } = Grid;

const StudentCourseLayout = ({ children }) => {
  const t = useTranslations();
  const screens = useBreakpoint();
  const pathname = usePathname();
  const tabChildren = [
    {
      title: t("All Courses"),
      path: "/student/courses/all",
    },
    {
      title: t("In Progress"),
      path: "/student/courses/in-progress",
    },
    {
      title: t("Completed"),
      path: "/student/courses/completed",
    },
  ];
  const [isOpen, setIsOpen] = useState(screens.xs ? false : true);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const shouldDisplaySidebar =
    pathname == "/student/courses/all" ||
    pathname == "/student/courses/in-progress" ||
    pathname == "/student/courses/completed";

  return (
    <div>
      {shouldDisplaySidebar && (
        <SideNav
          isOpen={isOpen}
          handleToggle={handleToggle}
          items={tabChildren}
        />
      )}
      <div style={{ marginLeft: isOpen && !screens.xs && shouldDisplaySidebar ? "288px" : "" }}>
        {children}
        {shouldDisplaySidebar && <Footer />}
      </div>
    </div>
  );
};

export default StudentCourseLayout;
