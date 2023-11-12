import NavbarComponent from "@/components/common/Navbar";
import React from "react";

const CodePlaygroundLayout = ({ children }) => {
  return (
    <div>
      <NavbarComponent />
      {/* <LayoutCourse>
        <div className="ps-[20.5rem] pt-[30px]"> */}
      {children}
      {/* </div>
      </LayoutCourse> */}
    </div>
  );
};

export default CodePlaygroundLayout;
