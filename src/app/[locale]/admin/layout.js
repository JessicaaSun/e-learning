import React from "react";
import { LayoutProvider } from "./layoutProvider";

function AdminLayout({ children }) {
  return (
    <>
      <LayoutProvider>{children}</LayoutProvider>
    </>
  );
}

export default AdminLayout;
