import React from "react";
import ContentSidebar from "./components/ExampleSidebar";
function ExampleLayout({ children }) {
  return (
    <>
      <ContentSidebar>{children}</ContentSidebar>
    </>
  );
}

export default ExampleLayout;
