"use client";
import AdminSidebar from "@/components/admin/Sidebar";

export const AdminLayout = ({ children }) => {
  return (
    <>
      <AdminSidebar>{children}</AdminSidebar>
    </>
  );
};
