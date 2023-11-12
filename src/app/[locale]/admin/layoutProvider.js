"use client";
import { AdminLayout } from "@/components/admin/Layout";
import { usePathname } from "next/navigation";

export const LayoutProvider = ({ children }) => {
  const pathname = usePathname();
  const shouldDisplaySidebar = pathname.includes("/auth");

  return (
    <>
      {shouldDisplaySidebar ? <>{children}</> :  <AdminLayout> {children} </AdminLayout>}
    </>
  );
};
