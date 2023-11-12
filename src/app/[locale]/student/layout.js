"use client";
import Footer from "@/components/common/Footer";
import NavbarComponent from "@/components/common/student/Navbar";
import React from "react";
import { useGetUserQuery } from "@/store/features/user/userApiSlice";
import { useRouter } from "next/navigation";
import Loading from "../loading";

const StudentLayout = ({ children }) => {
  const router = useRouter();
  const { data: user, isLoading } = useGetUserQuery();

  // if (isLoading) {
  //   return <Loading />;
  // }

  console.log("user data layout", user)
  // console.log("user", user)
  // if (user === undefined && !isLoading) {

  //   router.push("/auth/login");

  // }
  return (
    <div>
      <NavbarComponent />
      {children}
    </div>
  );
};

export default StudentLayout;
